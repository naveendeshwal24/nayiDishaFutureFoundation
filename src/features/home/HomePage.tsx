import { SectionHeading } from '../../components/ui/SectionHeading'
import { FeatureCard } from '../../components/ui/FeatureCard'
import { SampleStats } from '../../components/ui/SampleStats'
import { ProgramCard } from '../../components/ui/ProgramCard'
import { ProjectCard } from '../../components/ui/ProjectCard'
import { HeroBanner } from '../../components/ui/HeroBanner'
import { VideoPreview } from '../../components/ui/VideoPreview'
import { TestimonialSection } from '../../components/ui/TestimonialSection'

const heroBannerItems = [
  {
    id: '1',
    title: 'HEALTH',
    subtitle: 'STARTS WITH CARE',
    description: 'Every individual deserves access to quality healthcare and essential health awareness. Through medical camps, hygiene education, nutrition programs, and community outreach, we empower families to lead healthier, happier lives.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJV7-7UrtOo12CFmzPYRnjSA8NQ1TduY7S-u_rfQXzmg&s=800',
    buttonText: 'Support Health',
    buttonLink: '#donate',
  },
  {
    id: '2',
    title: 'EDUCATION',
    subtitle: 'CHANGES LIVES',
    description: 'Education opens doors to opportunity and a brighter future. We provide learning resources, school support, digital education, and mentorship to help every child achieve their full potential.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrnyd-ScTiABKinfcI1cb6wryTa7KXvh0Fs053DYJMg&s=800',
    buttonText: 'Support Education',
    buttonLink: '#donate',
  },
  {
    id: '3',
    title: 'ENVIRONMENT',
    subtitle: 'NEEDS OUR ACTION',
    description: 'A greener planet begins with responsible action. From tree plantation drives and clean-up campaigns to sustainable farming and environmental awareness, we work together to create a cleaner and healthier world.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXPt8XP_jx0rdeV4HcPtOH_Pe6nuNQmfL_WnU6cTQZw&s=800',
    buttonText: 'Join the Mission',
    buttonLink: '#donate',
  },
]

// Carousel images array - not currently used but kept for future carousel implementation
/*
const carouselImages = [
  {
    id: '1',
    title: 'Children Learning in Classroom',
    category: 'Education',
    image: 'https://images.pexels.com/photos/5238656/pexels-photo-5238656.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: '2',
    title: 'Teacher Engaging with Students',
    category: 'Education',
    image: 'https://images.pexels.com/photos/3808047/pexels-photo-3808047.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: '3',
    title: 'Healthcare & Medical Support',
    category: 'Health',
    image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: '4',
    title: 'Healthy Nutrition & Food',
    category: 'Health',
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: '5',
    title: 'Sustainable Farming',
    category: 'Environment',
    image: 'https://images.pexels.com/photos/3584857/pexels-photo-3584857.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: '6',
    title: 'Environmental Conservation',
    category: 'Environment',
    image: 'https://images.pexels.com/photos/3714897/pexels-photo-3714897.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: '7',
    title: 'Community Learning Center',
    category: 'Education',
    image: 'https://images.pexels.com/photos/3452882/pexels-photo-3452882.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: '8',
    title: 'Child Health & Wellness',
    category: 'Health',
    image: 'https://images.pexels.com/photos/8383790/pexels-photo-8383790.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: '9',
    title: 'Green Energy & Sustainability',
    category: 'Environment',
    image: 'https://images.pexels.com/photos/3714897/pexels-photo-3714897.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: '10',
    title: 'Community Health Program',
    category: 'Health',
    image: 'https://images.pexels.com/photos/5213624/pexels-photo-5213624.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
]
*/

const programSamples = [
  { title: 'Education Access', description: 'Community learning centers and scholarships.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrnyd-ScTiABKinfcI1cb6wryTa7KXvh0Fs053DYJMg&s=800' },
  { title: 'Health Awareness', description: 'Nutrition workshops and preventive care outreach.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJV7-7UrtOo12CFmzPYRnjSA8NQ1TduY7S-u_rfQXzmg&s=800' },
  { title: 'Women Empowerment', description: 'Skill training and micro-enterprise support.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXPt8XP_jx0rdeV4HcPtOH_Pe6nuNQmfL_WnU6cTQZw&s=800' },
]

const projectSamples = [
  { title: 'After-school Labs', description: 'Safe learning spaces for rural youth.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrnyd-ScTiABKinfcI1cb6wryTa7KXvh0Fs053DYJMg&s=800' },
  { title: 'Clean Water Initiative', description: 'Solar bore wells and hygiene campaigns.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXPt8XP_jx0rdeV4HcPtOH_Pe6nuNQmfL_WnU6cTQZw&s=800' },
  { title: 'Sustainable Farming', description: 'Climate-resilient agriculture coaching.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXPt8XP_jx0rdeV4HcPtOH_Pe6nuNQmfL_WnU6cTQZw&s=800' },
]

const featureCardsData = [
  { title: 'Programs', description: 'Explore programs that define our work and outcomes.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrnyd-ScTiABKinfcI1cb6wryTa7KXvh0Fs053DYJMg&s=800' },
  { title: 'Projects', description: 'Explore projects that define our work and outcomes.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXPt8XP_jx0rdeV4HcPtOH_Pe6nuNQmfL_WnU6cTQZw&s=800' },
  { title: 'Impact', description: 'Explore impact that define our work and outcomes.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJV7-7UrtOo12CFmzPYRnjSA8NQ1TduY7S-u_rfQXzmg&s=800' },
  { title: 'Gallery', description: 'Explore gallery that define our work and outcomes.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXPt8XP_jx0rdeV4HcPtOH_Pe6nuNQmfL_WnU6cTQZw&s=800' },
  { title: 'Videos', description: 'Explore videos that define our work and outcomes.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrnyd-ScTiABKinfcI1cb6wryTa7KXvh0Fs053DYJMg&s=800' },
  { title: 'Events', description: 'Explore events that define our work and outcomes.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXPt8XP_jx0rdeV4HcPtOH_Pe6nuNQmfL_WnU6cTQZw&s=800' },
]

export function HomePage() {
  return (
    <div className="space-y-20 pb-8">
      {/* Hero Banner */}
      <HeroBanner items={heroBannerItems} autoScrollInterval={5000} />

      <div className="grid gap-8 lg:grid-cols-[0.9fr_0.7fr]">
        <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-purple-100">
          <SectionHeading title="Mission" description="Our mission is to enable communities to thrive with education, health, and sustainable livelihoods." />
          <p className="mt-4 text-slate-600">
            Nayi Disha supports local leaders, builds trusted programs, and shares impact stories while preserving dignity and sustainability.
          </p>
        </section>
        <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-purple-100">
          <SectionHeading title="Vision" description="A future where every child and family can access opportunity, care, and a sustainable path ahead." />
          <p className="mt-4 text-slate-600">
            We design scalable initiatives that grow with communities and adapt to evolving challenges in education, health, and empowerment.
          </p>
        </section>
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        {featureCardsData.map((card) => (
          <FeatureCard key={card.title} title={card.title} description={card.description} image={card.image} />
        ))}
      </section>

      <SampleStats />

      <section className="grid gap-6 lg:grid-cols-3">
        {programSamples.map((program) => (
          <ProgramCard key={program.title} title={program.title} description={program.description} image={program.image} />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {projectSamples.map((project) => (
          <ProjectCard key={project.title} title={project.title} description={project.description} image={project.image} />
        ))}
      </section>

      <VideoPreview />

      <TestimonialSection />
    </div>
  )
}
