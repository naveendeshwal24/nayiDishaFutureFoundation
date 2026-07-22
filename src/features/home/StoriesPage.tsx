import { SectionHeading } from '../../components/ui/SectionHeading'

const stories = [
  { title: 'From School Dropout to Scholar', excerpt: 'A young learner found confidence through community coaching and now mentors others.' },
  { title: 'Clean Water for a Village', excerpt: 'A rural village joined hands to install a solar-powered water point.' },
]

export function StoriesPage() {
  return (
    <section className="space-y-8 pb-8">
      <SectionHeading title="Success Stories" description="Read impact stories from the communities we serve." />
      <div className="grid gap-6 md:grid-cols-2">
        {stories.map((story) => (
          <article key={story.title} className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-xl font-semibold text-slate-900">{story.title}</h3>
            <p className="mt-4 text-slate-600">{story.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
