import { SectionHeading } from '../../components/ui/SectionHeading'
import { VideoPreview } from '../../components/ui/VideoPreview'
import { useSeo } from '../../hooks/useSeo'

export function VideosPage() {
  useSeo('Videos | Nai Disha Future Foundation', 'Watch videos from Nai Disha Future Foundation programs, impact stories, and events.')

  return (
    <section className="space-y-8 pb-8">
      <SectionHeading title="Videos" description="Watch videos from our programs, impact stories, and events." />
      <VideoPreview showAll />
    </section>
  )
}
