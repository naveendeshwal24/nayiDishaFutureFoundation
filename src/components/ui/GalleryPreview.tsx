import { SectionHeading } from './SectionHeading'

interface GalleryImage {
  id: string
  title: string
  category: string
  url: string
}

const sampleImages: GalleryImage[] = [
  { id: '1', title: 'Learning Spaces', category: 'Education', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrnyd-ScTiABKinfcI1cb6wryTa7KXvh0Fs053DYJMg&s=800' },
  { id: '2', title: 'Healthy Nutrition', category: 'Health', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJV7-7UrtOo12CFmzPYRnjSA8NQ1TduY7S-u_rfQXzmg&s=800' },
  { id: '3', title: 'Sustainable Farming', category: 'Environment', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXPt8XP_jx0rdeV4HcPtOH_Pe6nuNQmfL_WnU6cTQZw&s=800' },
  { id: '4', title: 'Educational Programs', category: 'Education', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrnyd-ScTiABKinfcI1cb6wryTa7KXvh0Fs053DYJMg&s=800' },
  { id: '5', title: 'Community Outreach', category: 'Health', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJV7-7UrtOo12CFmzPYRnjSA8NQ1TduY7S-u_rfQXzmg&s=800' },
  { id: '6', title: 'Green Energy', category: 'Environment', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXPt8XP_jx0rdeV4HcPtOH_Pe6nuNQmfL_WnU6cTQZw&s=800' },
  { id: '7', title: 'Knowledge Centers', category: 'Education', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrnyd-ScTiABKinfcI1cb6wryTa7KXvh0Fs053DYJMg&s=800' },
  { id: '8', title: 'Wellness Programs', category: 'Health', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJV7-7UrtOo12CFmzPYRnjSA8NQ1TduY7S-u_rfQXzmg&s=800' },
  { id: '9', title: 'Environmental Work', category: 'Environment', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXPt8XP_jx0rdeV4HcPtOH_Pe6nuNQmfL_WnU6cTQZw&s=800' },
  { id: '10', title: 'Health Initiatives', category: 'Health', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJV7-7UrtOo12CFmzPYRnjSA8NQ1TduY7S-u_rfQXzmg&s=800' },
  { id: '11', title: 'Youth Education Activity', category: 'Education', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrnyd-ScTiABKinfcI1cb6wryTa7KXvh0Fs053DYJMg&s=800' },
  { id: '12', title: 'Sustainable Development', category: 'Environment', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXPt8XP_jx0rdeV4HcPtOH_Pe6nuNQmfL_WnU6cTQZw&s=800' },
]

interface GalleryPreviewProps {
  showAll?: boolean
}

export function GalleryPreview({ showAll }: GalleryPreviewProps) {
  const images = showAll ? sampleImages : sampleImages.slice(0, 3)

  return (
    <section className="space-y-6 sm:space-y-8">
      {!showAll && <SectionHeading title="Gallery" description="Featured images from our programs and initiatives." />}
      <div className={`grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 ${showAll ? 'md:grid-cols-3 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
        {images.map((image) => (
          <article key={image.id} className="group relative overflow-hidden rounded-2xl bg-slate-900">
            <img src={image.url} alt={image.title} className="h-40 sm:h-48 md:h-56 lg:h-64 w-full object-cover transition group-hover:scale-110" />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4 opacity-0 transition group-hover:opacity-100">
              <p className="text-xs sm:text-sm font-medium text-white truncate">{image.title}</p>
              <p className="text-xs text-slate-300">{image.category}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
