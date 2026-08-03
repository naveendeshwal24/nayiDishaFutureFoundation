import { SectionHeading } from '../../components/ui/SectionHeading'
import { ProjectCard } from '../../components/ui/ProjectCard'

const projects = [
  { title: 'Community Libraries', description: 'Creating book hubs and literacy programs for children and adults.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrnyd-ScTiABKinfcI1cb6wryTa7KXvh0Fs053DYJMg&s=800' },
  { title: 'Water & Sanitation', description: 'Building hygiene facilities and clean-water access points.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXPt8XP_jx0rdeV4HcPtOH_Pe6nuNQmfL_WnU6cTQZw&s=800' },
  { title: 'Sustainable Agriculture', description: 'Supporting small farmers with eco-friendly practices.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXPt8XP_jx0rdeV4HcPtOH_Pe6nuNQmfL_WnU6cTQZw&s=800' },
]

export function ProjectsPage() {
  return (
    <section className="space-y-8 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl w-full">
        <SectionHeading title="Projects" description="Browse our current and completed community projects." />
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} title={project.title} description={project.description} image={project.image} />
          ))}
        </div>
      </div>
    </section>
  )
}
