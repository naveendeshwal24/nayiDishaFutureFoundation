import { SectionHeading } from '../../components/ui/SectionHeading'
import { useSeo } from '../../hooks/useSeo'

export function MissionVisionPage() {
  useSeo('Mission & Vision | Nayi Disha Future Foundation', 'Discover the long-term mission and vision guiding every Nayi Disha Future Foundation initiative.')

  return (
    <section className="space-y-10 pb-8">
      <SectionHeading title="Mission & Vision" description="Discover our long-term goals and the values that guide every initiative." />
      <div className="grid gap-8 lg:grid-cols-2">
        <article className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Mission</h2>
          <p className="mt-4 text-slate-600">
            Nayi Disha Future Foundation exists to empower underserved communities through education, healthcare, and sustainable livelihoods. We
            partner with government schools, primary health centers, and village councils to design programs that address root causes of
            poverty rather than offer short-term relief.
          </p>
          <p className="mt-4 text-slate-600">
            Every initiative is built with local leaders at the center, so the people closest to the problem shape the solution. We measure
            success not just in reach, but in whether families gain lasting skills, income, and access to opportunity.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2"><span className="text-purple-600">•</span><span>Run after-school learning labs and scholarship programs for first-generation students.</span></li>
            <li className="flex gap-2"><span className="text-purple-600">•</span><span>Deliver nutrition camps, maternal health awareness, and preventive screenings in rural villages.</span></li>
            <li className="flex gap-2"><span className="text-purple-600">•</span><span>Provide vocational training and micro-enterprise support so families build lasting income.</span></li>
          </ul>
        </article>
        <article className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Vision</h2>
          <p className="mt-4 text-slate-600">
            We envision a future where every child, regardless of where they are born, has access to quality education, healthcare, and a
            sustainable path toward opportunity. A future where underserved regions thrive with lasting infrastructure, community leadership,
            and access to essential knowledge and resources.
          </p>
          <p className="mt-4 text-slate-600">
            Over the next five years, we aim to scale our model from rural districts to under-resourced urban neighborhoods, building a
            replicable framework that local governments and partner NGOs can adopt in their own regions.
          </p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex gap-2"><span className="text-purple-600">•</span><span>Every child completes school with the literacy, confidence, and resources to pursue higher education or skilled work.</span></li>
            <li className="flex gap-2"><span className="text-purple-600">•</span><span>Families access affordable healthcare and clean water within their own villages, without long travel or delay.</span></li>
            <li className="flex gap-2"><span className="text-purple-600">•</span><span>Communities lead the programs themselves, ensuring change is owned locally and sustained for generations.</span></li>
          </ul>
        </article>
      </div>
    </section>
  )
}
