import { useQuery } from '@tanstack/react-query'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { getMediaItems } from '../../services/supabase/storage'
import { formatDate } from '../../utils/date'
import { useSeo } from '../../hooks/useSeo'

export function EventsPage() {
  useSeo('Events | Nayi Disha Future Foundation', 'Upcoming and recent events hosted by Nayi Disha Future Foundation that brought communities together.')

  const { data: items = [], isLoading, isError } = useQuery({
    queryKey: ['media', 'events'],
    queryFn: () => getMediaItems(),
  })

  const events = items.filter((item) => item.category?.name === 'Events')

  return (
    <section className="space-y-8 pb-8">
      <SectionHeading title="Events" description="Upcoming and recent events that brought people together." />

      {isLoading && <p className="text-sm text-slate-500">Loading events...</p>}
      {isError && <p className="text-sm text-red-600">Failed to load events.</p>}
      {!isLoading && !isError && events.length === 0 && (
        <p className="text-sm text-slate-500">No events have been added yet.</p>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {events.map((event) => (
          <article key={event.id} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm uppercase tracking-[0.24em] text-sky-500">Event</p>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">{event.title}</h3>
            <p className="mt-2 text-sm text-slate-500">{formatDate(event.uploaded_at)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
