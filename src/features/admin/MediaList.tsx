import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { MediaItem } from '../../types/models'
import { getStorageUrl, getMediaItems, deleteFile, deleteMediaItem } from '../../services/supabase/storage'
import { useToast } from '../../components/ui/Toast'

interface MediaListProps {
  type: 'image' | 'video'
  /** Only show items whose category name matches (e.g. "Projects") */
  categoryFilter?: string
  /** Hide items whose category name matches (e.g. exclude "Projects" from the Gallery tab) */
  excludeCategory?: string
  label?: string
}

export function MediaList({ type, categoryFilter, excludeCategory, label }: MediaListProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [deleting, setDeleting] = useState(false)
  const { error: showError } = useToast()
  const queryClient = useQueryClient()

  // Fetch media items from database
  const { data: allItems = [], isLoading, error } = useQuery({
    queryKey: ['media', type],
    queryFn: () => getMediaItems({ type }),
  })

  const items = allItems.filter((item) => {
    if (categoryFilter) return item.category?.name === categoryFilter
    if (excludeCategory) return item.category?.name !== excludeCategory
    return true
  })

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const handleDelete = async (id: string) => {
    const item = items.find((i) => i.id === id)
    if (!item) return

    if (!confirm(`Delete "${item.title}"?`)) return

    setDeleting(true)
    try {
      const bucket = item.type === 'image' ? 'images' : 'videos'
      await deleteFile(bucket, item.file_path)
      await deleteMediaItem(id)
      await queryClient.invalidateQueries({ queryKey: ['media'] })
      setSelectedIds((prev) => prev.filter((i) => i !== id))
    } catch (err) {
      showError(`Failed to delete: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setDeleting(false)
    }
  }

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return

    if (!confirm(`Delete ${selectedIds.length} items?`)) return

    setDeleting(true)
    try {
      for (const id of selectedIds) {
        const item = items.find((i) => i.id === id)
        if (item) {
          const bucket = item.type === 'image' ? 'images' : 'videos'
          await deleteFile(bucket, item.file_path)
          await deleteMediaItem(id)
        }
      }
      await queryClient.invalidateQueries({ queryKey: ['media'] })
      setSelectedIds([])
    } catch (err) {
      showError(`Bulk delete failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setDeleting(false)
    }
  }

  const getImageUrl = (item: MediaItem) => {
    if (item.file_path.startsWith('http')) return item.file_path
    const bucket = item.type === 'image' ? 'images' : 'videos'
    return getStorageUrl(bucket, item.file_path)
  }

  if (isLoading) {
    return (
      <div className="rounded-lg bg-slate-50 p-4 text-center">
        <p className="text-xs text-slate-500">Loading media...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-3 ring-1 ring-red-200">
        <p className="text-xs text-red-700">Failed to load media: {error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">{label || (type === 'image' ? 'Gallery Images' : 'Videos')}</h3>
        {selectedIds.length > 0 && (
          <button
            onClick={handleBulkDelete}
            disabled={deleting}
            className="rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            Delete {selectedIds.length}
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-slate-300 py-6 text-center">
          <p className="text-xs text-slate-500">No {type}s uploaded yet.</p>
        </div>
      ) : (
        <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="group relative isolate overflow-visible rounded-lg bg-slate-100 ring-1 ring-slate-200">
              <input
                type="checkbox"
                checked={selectedIds.includes(item.id)}
                onChange={() => toggleSelect(item.id)}
                className="absolute left-2 top-2 z-10 h-3 w-3"
              />

              <div className="overflow-hidden rounded-lg">
                {type === 'image' ? (
                  <img src={getImageUrl(item)} alt={item.title} className="h-24 w-full object-cover transition group-hover:scale-105" />
                ) : (
                  <div className="relative h-24 w-full bg-slate-900">
                    <video src={getImageUrl(item)} className="h-full w-full object-cover opacity-60" muted preload="metadata" />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <span className="text-xl text-white">▶</span>
                    </div>
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/80 via-transparent to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                  <div></div>
                  <div>
                    <p className="text-xs font-medium text-white">{item.title}</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                disabled={deleting}
                aria-label={`Delete ${item.title}`}
                className="absolute -right-2 -top-2 z-30 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-600 text-xs font-bold text-white shadow-md transition hover:bg-red-700 disabled:opacity-50"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
