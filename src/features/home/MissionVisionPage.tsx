import { SectionHeading } from '../../components/ui/SectionHeading'

export function MissionVisionPage() {
  return (
    <section className="space-y-10 pb-8">
      <SectionHeading title="Mission & Vision" description="Discover our long-term goals and the values that guide every initiative." />
      <div className="grid gap-8 lg:grid-cols-2">
        <article className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Mission</h2>
          <p className="mt-4 text-slate-600">
            To empower communities through education, health facilities, economic opportunities and digital collaboration that create measurable progress.
          </p>
        </article>
        <article className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Vision</h2>
          <p className="mt-4 text-slate-600">
            A world where underserved regions thrive with lasting infrastructure, community leadership, and access to essential knowledge and resources.
          </p>
        </article>
      </div>
    </section>
  )
}
