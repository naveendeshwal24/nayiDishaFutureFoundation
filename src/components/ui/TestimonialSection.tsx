import { SectionHeading } from './SectionHeading'
import { TestimonialCarousel } from './TestimonialCarousel'
import presidentImage from '../../assets/images/president.jpeg'
import sanjayImage from '../../assets/images/sanjay.jpeg'

const testimonials = [
  {
    id: '1',
    name: 'Narendra Kumar',
    role: 'President, Nai Disha Future Foundation',
    text: 'When we started Nai Disha Future Foundation, our goal was simple: no child in a slum settlement should be denied an education because of where they were born. Today we run learning centers, health camps, and meal programs across dozens of communities, and every year we see more of our students finish school and take on jobs that once felt out of reach for their families.',
    image: presidentImage,
  },
  {
    id: '2',
    name: 'Sanjay Kumar',
    role: 'Vice President, Nai Disha Future Foundation',
    text: 'My role keeps me on the ground, in the slums and government schools where our volunteers work every day. I have watched children arrive hungry and unable to read simple words, and later seen the same children come first in their class, well-fed, healthy, and confident about their future. That transformation is why this work matters.',
    image: sanjayImage,
  },
]

export function TestimonialSection() {
  return (
    <section className="space-y-8">
      <SectionHeading title="Head Members Voice" />
      <TestimonialCarousel testimonials={testimonials} autoScrollInterval={6000} />
    </section>
  )
}
