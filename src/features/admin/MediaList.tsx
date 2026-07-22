import { useState } from 'react'
import type { MediaItem } from '../../types/models'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { getStorageUrl } from '../../services/supabase/storage'

interface MediaListProps {
  type: 'image' | 'video'
}

const sampleMedia: MediaItem[] = [
  {
    id: '1',
    title: 'School Children Learning',
    category_id: '1',
    type: 'image',
    file_path: 'education/school-children.jpg',
    mime_type: 'image/jpeg',
    uploaded_at: '2026-07-10',
    updated_at: '2026-07-10',
    uploaded_by: 'admin@example.com',
  },
  {
    id: '2',
    title: 'Children Meal Program',
    category_id: '2',
    type: 'image',
    file_path: 'health/meal-program.jpg',
    mime_type: 'image/jpeg',
    uploaded_at: '2026-07-08',
    updated_at: '2026-07-08',
    uploaded_by: 'admin@example.com',
  },
  {
    id: '3',
    title: 'Community Initiative',
    category_id: '3',
    type: 'video',
    file_path: 'projects/initiative.mp4',
    mime_type: 'video/mp4',
    duration: 300,
    thumbnail_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXPt8XP_jx0rdeV4HcPtOH_Pe6nuNQmfL_WnU6cTQZw&s=800',
    uploaded_at: '2026-07-05',
    updated_at: '2026-07-05',
    uploaded_by: 'admin@example.com',
  },
]

export function MediaList({ type }: MediaListProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const items = sampleMedia.filter((item) => item.type === type)

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const handleDelete = (id: string) => {
    alert(`Delete functionality: Would delete item ${id}`)
    setSelectedIds((prev) => prev.filter((i) => i !== id))
  }

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) {
      alert('Select items to delete')
      return
    }
    alert(`Delete ${selectedIds.length} items?`)
    setSelectedIds([])
  }

  const getImageUrl = (item: MediaItem) => {
    if (item.file_path.startsWith('http')) {
      return item.file_path
    }
    const bucket = item.type === 'image' ? 'images' : 'videos'
    return getStorageUrl(bucket, item.file_path)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeading title={type === 'image' ? 'Gallery Images' : 'Videos'} />
        {selectedIds.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Delete {selectedIds.length}
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-300 py-12 text-center">
          <p className="text-sm text-slate-500">No {type}s uploaded yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200">
              <input
                type="checkbox"
                checked={selectedIds.includes(item.id)}
                onChange={() => toggleSelect(item.id)}
                className="absolute left-3 top-3 z-10 h-4 w-4"
              />

              {type === 'image' ? (
                <img src={getImageUrl(item)} alt={item.title} className="h-40 w-full object-cover transition group-hover:scale-105" />
              ) : (
                <div className="relative h-40 w-full bg-slate-900">
                  <img src={item.thumbnail_url || getImageUrl(item)} alt={item.title} className="h-full w-full object-cover opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl text-white">▶</span>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/80 via-transparent to-transparent p-3 opacity-0 transition group-hover:opacity-100">
                <div></div>
                <div>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="text-xs text-slate-300">{item.description || 'No description'}</p>
                </div>
              </div>

              <div className="absolute right-2 top-2 opacity-0 transition group-hover:opacity-100">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="rounded-full bg-red-600 p-2 text-white transition hover:bg-red-700"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
