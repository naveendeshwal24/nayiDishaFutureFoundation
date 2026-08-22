import { SectionHeading } from '../../components/ui/SectionHeading'
import { GalleryPreview } from '../../components/ui/GalleryPreview'
import { useSeo } from '../../hooks/useSeo'

export function GalleryPage() {
  useSeo('Gallery | Nayi Disha Future Foundation', 'Browse photos from Nayi Disha Future Foundation programs, events, and community stories.')

  return (
    <section className="space-y-8 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl w-full">
        <SectionHeading title="Gallery" description="Browse our image collection from programs, events, and community stories." />
        <div className="mt-8">
          <GalleryPreview showAll />
        </div>
      </div>
    </section>
  )
}
