import { useQuery } from '@tanstack/react-query'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { getMediaItems } from '../../services/supabase/storage'

export function StoriesPage() {
  const { data: items = [], isLoading, isError } = useQuery({
    queryKey: ['media', 'stories'],
    queryFn: () => getMediaItems(),
  })

  const stories = items.filter((item) => item.category?.name === 'Stories')

  return (
    <section className="space-y-8 pb-8">
      <SectionHeading title="Success Stories" description="Read impact stories from the communities we serve." />

      {isLoading && <p className="text-sm text-slate-500">Loading stories...</p>}
      {isError && <p className="text-sm text-red-600">Failed to load stories.</p>}
      {!isLoading && !isError && stories.length === 0 && (
        <p className="text-sm text-slate-500">No stories have been added yet.</p>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {stories.map((story) => (
          <article key={story.id} className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-xl font-semibold text-slate-900">{story.title}</h3>
            <p className="mt-4 text-slate-600">{story.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
