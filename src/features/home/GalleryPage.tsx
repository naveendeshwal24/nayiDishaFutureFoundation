import { SectionHeading } from '../../components/ui/SectionHeading'
import { GalleryPreview } from '../../components/ui/GalleryPreview'

export function GalleryPage() {
  return (
    <section className="space-y-8 pb-8">
      <SectionHeading title="Gallery" description="Browse our image collection from programs, events, and community stories." />
      <GalleryPreview showAll />
    </section>
  )
}
