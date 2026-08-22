import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { ProjectCard } from '../../components/ui/ProjectCard'
import { getMediaItems, getStorageUrl, deleteFile, deleteMediaItem } from '../../services/supabase/storage'
import { useIsAdmin } from '../../hooks/useIsAdmin'
import { useToast } from '../../components/ui/Toast'
import { useSeo } from '../../hooks/useSeo'

export function ProjectsPage() {
  useSeo('Events | Nayi Disha Future Foundation', 'Browse current and completed community events run by Nayi Disha Future Foundation.')

  const isAdmin = useIsAdmin()
  const queryClient = useQueryClient()
  const { error: showError } = useToast()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const { data: items = [], isLoading, isError } = useQuery({
    queryKey: ['media', 'projects'],
    queryFn: () => getMediaItems(),
  })

  const projects = items.filter((item) => item.category?.name === 'Projects')

  const handleDelete = async (id: string, filePath: string, title: string, type: 'image' | 'video') => {
    if (!confirm(`Remove "${title}"?`)) return

    setDeletingId(id)
    try {
      await deleteFile(type === 'image' ? 'images' : 'videos', filePath)
      await deleteMediaItem(id)
      await queryClient.invalidateQueries({ queryKey: ['media'] })
    } catch (err) {
      showError(`Failed to remove: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section className="space-y-8 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl w-full">
        <SectionHeading title="Events" description="Browse our current and completed community events." />

        {isLoading && <p className="mt-8 text-sm text-slate-500">Loading events...</p>}
        {isError && <p className="mt-8 text-sm text-red-600">Failed to load events.</p>}
        {!isLoading && !isError && projects.length === 0 && (
          <p className="mt-8 text-sm text-slate-500">No events have been added yet.</p>
        )}

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description || ''}
              image={project.type === 'image' ? getStorageUrl('images', project.file_path) : undefined}
              date={project.uploaded_at}
              onDelete={isAdmin ? () => handleDelete(project.id, project.file_path, project.title, project.type) : undefined}
              deleting={deletingId === project.id}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
