import { SectionHeading } from '../../components/ui/SectionHeading'

const events = [
  { title: 'Community Wellness Camp', date: 'June 2026' },
  { title: 'Education Awareness Drive', date: 'May 2026' },
  { title: 'Eco Action Festival', date: 'April 2026' },
]

export function EventsPage() {
  return (
    <section className="space-y-8 pb-8">
      <SectionHeading title="Events" description="Upcoming and recent events that brought people together." />
      <div className="grid gap-6 md:grid-cols-3">
        {events.map((event) => (
          <article key={event.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm uppercase tracking-[0.24em] text-sky-500">Event</p>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">{event.title}</h3>
            <p className="mt-2 text-sm text-slate-500">{event.date}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
