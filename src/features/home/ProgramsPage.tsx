import { SectionHeading } from '../../components/ui/SectionHeading'
import { ProgramCard } from '../../components/ui/ProgramCard'
import { useSeo } from '../../hooks/useSeo'

const programs = [
  { title: 'Education Programs', description: 'Learning centers, reading clubs, digital lessons, and scholarships.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrnyd-ScTiABKinfcI1cb6wryTa7KXvh0Fs053DYJMg&s=800' },
  { title: 'Health Initiatives', description: 'Nutrition camps, immunization awareness, and wellness outreach.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJV7-7UrtOo12CFmzPYRnjSA8NQ1TduY7S-u_rfQXzmg&s=800' },
  { title: 'Women Empowerment', description: 'Vocational training, leadership workshops, and entrepreneurship support.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrnyd-ScTiABKinfcI1cb6wryTa7KXvh0Fs053DYJMg&s=800' },
  { title: 'Sustainability', description: 'Environment awareness, water management, and climate resilience training.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXPt8XP_jx0rdeV4HcPtOH_Pe6nuNQmfL_WnU6cTQZw&s=800' },
]

export function ProgramsPage() {
  useSeo('Our Programs | Nayi Disha Future Foundation', 'Explore the education, health, women empowerment, and sustainability programs run by Nayi Disha Future Foundation.')

  return (
    <section className="space-y-8 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl w-full">
        <SectionHeading title="Our Programs" description="Explore the program areas we support with scalable community impact." />
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-8">
          {programs.map((program) => (
            <ProgramCard key={program.title} title={program.title} description={program.description} image={program.image} />
          ))}
        </div>
      </div>
    </section>
  )
}
