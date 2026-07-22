import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role: string
  text: string
  image: string
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  autoScrollInterval?: number
}

export function TestimonialCarousel({
  testimonials,
  autoScrollInterval = 6000,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoScrolling] = useState(true)

  useEffect(() => {
    if (!isAutoScrolling || testimonials.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, autoScrollInterval)

    return () => clearInterval(interval)
  }, [isAutoScrolling, testimonials.length, autoScrollInterval])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  if (testimonials.length === 0) return null

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="relative w-full bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={currentTestimonial.image}
            alt={currentTestimonial.name}
            className="w-48 h-48 rounded-full object-cover border-4 border-white"
          />
        </div>

        {/* Content */}
        <div className="flex-1 text-white">
          <p className="text-lg leading-relaxed mb-6 italic">
            &quot;{currentTestimonial.text}&quot;
          </p>
          <div className="mb-6">
            <p className="text-xl font-bold text-emerald-400">{currentTestimonial.name}</p>
            <p className="text-blue-100">{currentTestimonial.role}</p>
          </div>

          {/* Indicators */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition ${
                  index === currentIndex ? 'bg-emerald-400 w-8' : 'bg-white/50 w-2'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}
