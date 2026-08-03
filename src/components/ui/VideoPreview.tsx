import { useState } from 'react'
import { SectionHeading } from './SectionHeading'

interface VideoItem {
  id: string
  title: string
  category: string
  thumbnail: string
  duration: string
  youtubeUrl: string
}

const sampleVideos: VideoItem[] = [
  { id: '1', title: 'Impact Story: Education Access', category: 'Stories', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrnyd-ScTiABKinfcI1cb6wryTa7KXvh0Fs053DYJMg&s=800', duration: '3:45', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: '2', title: 'Feeding Program Overview', category: 'Programs', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJV7-7UrtOo12CFmzPYRnjSA8NQ1TduY7S-u_rfQXzmg&s=800', duration: '5:12', youtubeUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0' },
  { id: '3', title: 'Community Event Highlights', category: 'Events', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXPt8XP_jx0rdeV4HcPtOH_Pe6nuNQmfL_WnU6cTQZw&s=800', duration: '2:30', youtubeUrl: 'https://www.youtube.com/watch?v=OPf0YbXqDm0' },
]

interface VideoPreviewProps {
  showAll?: boolean
}

const getYouTubeEmbedUrl = (url: string) => {
  const videoId = url.split('v=')[1]?.split('&')[0]
  return videoId ? `https://www.youtube.com/embed/${videoId}` : ''
}

export function VideoPreview({ showAll }: VideoPreviewProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)
  const videos = showAll ? sampleVideos : sampleVideos.slice(0, 3)

  return (
    <section className="space-y-6 sm:space-y-8">
      {!showAll && <SectionHeading title="Videos" description="Watch our latest programs, events, and impact stories." />}
      <div className={`grid gap-4 grid-cols-1 sm:grid-cols-2 ${showAll ? 'md:grid-cols-3' : 'md:grid-cols-3'}`}>
        {videos.map((video) => (
          <button key={video.id} onClick={() => setSelectedVideo(video)} className="group relative overflow-hidden rounded-2xl bg-slate-900 cursor-pointer text-left h-48 sm:h-56 md:h-64">
            <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover transition group-hover:scale-110" />
            <div className="absolute inset-0 flex items-center justify-center transition group-hover:bg-black/50">
              <div className="flex h-12 sm:h-14 md:h-16 w-12 sm:w-14 md:w-16 items-center justify-center rounded-full bg-white/90 text-slate-900 opacity-0 transition group-hover:opacity-100">
                ▶
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-white truncate">{video.title}</p>
                <p className="text-xs text-slate-300">{video.category}</p>
              </div>
              <p className="text-xs font-medium text-white whitespace-nowrap ml-2">{video.duration}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-4xl">
            <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={getYouTubeEmbedUrl(selectedVideo.youtubeUrl)}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 truncate">{selectedVideo.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600">{selectedVideo.category}</p>
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
