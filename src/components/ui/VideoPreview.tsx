import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { SectionHeading } from './SectionHeading'
import { getMediaItems, getStorageUrl, deleteFile, deleteMediaItem } from '../../services/supabase/storage'
import { useIsAdmin } from '../../hooks/useIsAdmin'
import { useToast } from './Toast'
import type { MediaItem } from '../../types/models'

interface VideoPreviewProps {
  showAll?: boolean
}

export function VideoPreview({ showAll }: VideoPreviewProps) {
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null)
  const isAdmin = useIsAdmin()
  const queryClient = useQueryClient()
  const { error: showError } = useToast()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const { data: items = [], isLoading, isError } = useQuery({
    queryKey: ['media', 'video'],
    queryFn: () => getMediaItems({ type: 'video' }),
  })

  const videos = showAll ? items : items.slice(0, 3)

  const handleDelete = async (e: React.MouseEvent, video: MediaItem) => {
    e.stopPropagation()
    if (!confirm(`Remove "${video.title}"?`)) return

    setDeletingId(video.id)
    try {
      await deleteFile('videos', video.file_path)
      await deleteMediaItem(video.id)
      await queryClient.invalidateQueries({ queryKey: ['media'] })
    } catch (err) {
      showError(`Failed to remove: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section className="space-y-6 sm:space-y-8">
      {!showAll && <SectionHeading title="Videos" description="Watch our latest programs, events, and impact stories." />}

      {isLoading && <p className="text-sm text-slate-500">Loading videos...</p>}
      {isError && <p className="text-sm text-red-600">Failed to load videos.</p>}
      {!isLoading && !isError && videos.length === 0 && (
        <p className="text-sm text-slate-500">No videos have been uploaded yet.</p>
      )}

      <div className={`grid gap-4 grid-cols-1 sm:grid-cols-2 ${showAll ? 'md:grid-cols-3' : 'md:grid-cols-3'}`}>
        {videos.map((video) => (
          <button key={video.id} onClick={() => setSelectedVideo(video)} className="group relative overflow-hidden rounded-2xl bg-slate-900 cursor-pointer text-left h-48 sm:h-56 md:h-64">
            <video src={getStorageUrl('videos', video.file_path)} className="h-full w-full object-cover transition group-hover:scale-110" muted preload="metadata" />
            <div className="absolute inset-0 flex items-center justify-center transition group-hover:bg-black/50">
              <div className="flex h-12 sm:h-14 md:h-16 w-12 sm:w-14 md:w-16 items-center justify-center rounded-full bg-white/90 text-slate-900 opacity-0 transition group-hover:opacity-100">
                ▶
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-white truncate">{video.title}</p>
                <p className="text-xs text-slate-300">{video.category?.name}</p>
              </div>
            </div>
            {isAdmin && (
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => handleDelete(e, video)}
                aria-label={`Remove ${video.title}`}
                className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-red-600 text-xs font-bold text-white shadow-md transition hover:bg-red-700"
                style={{ opacity: deletingId === video.id ? 0.5 : 1, pointerEvents: deletingId === video.id ? 'none' : 'auto' }}
              >
                ✕
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-4xl">
            <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
              <video
                src={getStorageUrl('videos', selectedVideo.file_path)}
                controls
                autoPlay
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 truncate">{selectedVideo.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600">{selectedVideo.category?.name}</p>
              </div>
              <button onClick={() => setSelectedVideo(null)} className="rounded-lg bg-slate-200 px-3 sm:px-4 py-1.5 sm:py-2 font-medium text-slate-900 hover:bg-slate-300 text-sm whitespace-nowrap">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
