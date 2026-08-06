import { useQuery } from '@tanstack/react-query'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { ProjectCard } from '../../components/ui/ProjectCard'
import { getMediaItems, getStorageUrl } from '../../services/supabase/storage'

export function ProjectsPage() {
  const { data: items = [], isLoading, isError } = useQuery({
    queryKey: ['media', 'projects'],
    queryFn: () => getMediaItems(),
  })

  const projects = items.filter((item) => item.category?.name === 'Projects')

  return (
    <section className="space-y-8 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl w-full">
        <SectionHeading title="Projects" description="Browse our current and completed community projects." />

        {isLoading && <p className="mt-8 text-sm text-slate-500">Loading projects...</p>}
        {isError && <p className="mt-8 text-sm text-red-600">Failed to load projects.</p>}
        {!isLoading && !isError && projects.length === 0 && (
          <p className="mt-8 text-sm text-slate-500">No projects have been added yet.</p>
        )}

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description || ''}
              image={project.type === 'image' ? getStorageUrl('images', project.file_path) : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
