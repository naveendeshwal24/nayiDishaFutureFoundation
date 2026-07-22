import { SectionHeading } from './SectionHeading'
import { TestimonialCarousel } from './TestimonialCarousel'

const testimonials = [
  {
    id: '1',
    name: 'Indian PM',
    role: 'Prime Minister',
    text: 'The programs have transformed how we provide support to underprivileged communities. It was wonderful to see the structural approach to community impact.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Narendra_Modi_official_portrait.jpg/440px-Narendra_Modi_official_portrait.jpg',
  },
  {
    id: '2',
    name: 'Indian President',
    role: 'President of India',
    text: 'Finally, a platform that connects storytelling with real impact. The transparency and accountability measures in social work are commendable.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Droupadi_Murmu_official_portrait_2024.jpg/440px-Droupadi_Murmu_official_portrait_2024.jpg',
  },
  {
    id: '3',
    name: 'Educator Leader',
    role: 'Education Coordinator',
    text: 'Working with such initiatives has shown me the power of organized community action. Every effort creates measurable change in childrens lives.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrnyd-ScTiABKinfcI1cb6wryTa7KXvh0Fs053DYJMg&s=800',
  },
  {
    id: '4',
    name: 'Community Member',
    role: 'Social Worker',
    text: 'The data-driven approach and community-centered design set new standards for NGO operations. Truly inspiring work for underprivileged societies.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJV7-7UrtOo12CFmzPYRnjSA8NQ1TduY7S-u_rfQXzmg&s=800',
  },
]

export function TestimonialSection() {
  return (
    <section className="space-y-8">
      <SectionHeading title="Voices from Our Community" description="Hear from the people our work impacts every day." />
      <TestimonialCarousel testimonials={testimonials} autoScrollInterval={6000} />
    </section>
  )
}
