import { SectionHeading } from '../../components/ui/SectionHeading'
import { GalleryPreview } from '../../components/ui/GalleryPreview'
import { useSeo } from '../../hooks/useSeo'

export function GalleryPage() {
  useSeo('Gallery | Nai Disha Future Foundation', 'Browse images and videos from Nai Disha Future Foundation events, programs, and community stories.')

  return (
    <section className="space-y-8 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl w-full">
        <SectionHeading title="Gallery" description="On this page, you will find images and videos from our events, programs, and community stories." />
        <div className="mt-8">
          <GalleryPreview showAll />
        </div>
      </div>
    </section>
  )
}
