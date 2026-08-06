import { useQuery } from '@tanstack/react-query'
import { SectionHeading } from './SectionHeading'
import { getMediaItems, getStorageUrl } from '../../services/supabase/storage'

interface GalleryPreviewProps {
  showAll?: boolean
}

export function GalleryPreview({ showAll }: GalleryPreviewProps) {
  const { data: items = [], isLoading, isError } = useQuery({
    queryKey: ['media', 'image'],
    queryFn: () => getMediaItems({ type: 'image' }),
  })

  const images = showAll ? items : items.slice(0, 3)

  return (
    <section className="space-y-6 sm:space-y-8">
      {!showAll && <SectionHeading title="Gallery" description="Featured images from our programs and initiatives." />}

      {isLoading && <p className="text-sm text-slate-500">Loading gallery...</p>}
      {isError && <p className="text-sm text-red-600">Failed to load gallery images.</p>}
      {!isLoading && !isError && images.length === 0 && (
        <p className="text-sm text-slate-500">No images have been uploaded yet.</p>
      )}

      <div className={`grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 ${showAll ? 'md:grid-cols-3 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
        {images.map((image) => (
          <article key={image.id} className="group relative overflow-hidden rounded-2xl bg-slate-900">
            <img
              src={getStorageUrl('images', image.file_path)}
              alt={image.title}
              className="h-40 sm:h-48 md:h-56 lg:h-64 w-full object-cover transition group-hover:scale-110"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4 opacity-0 transition group-hover:opacity-100">
              <p className="text-xs sm:text-sm font-medium text-white truncate">{image.title}</p>
              <p className="text-xs text-slate-300">{image.category?.name}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
