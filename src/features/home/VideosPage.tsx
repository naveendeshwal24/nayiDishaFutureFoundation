import { SectionHeading } from '../../components/ui/SectionHeading'
import { VideoPreview } from '../../components/ui/VideoPreview'

export function VideosPage() {
  return (
    <section className="space-y-8 pb-8">
      <SectionHeading title="Videos" description="Watch videos from our programs, impact stories, and events." />
      <VideoPreview showAll />
    </section>
  )
}
