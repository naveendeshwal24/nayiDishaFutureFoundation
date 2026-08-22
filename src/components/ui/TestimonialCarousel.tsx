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
    <div className="relative w-full bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-4 sm:p-8 md:p-12">
      <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={currentTestimonial.image}
            alt={currentTestimonial.name}
            className="w-24 sm:w-40 md:w-48 h-24 sm:h-40 md:h-48 rounded-full object-cover border-4 border-white flex-shrink-0"
          />
        </div>

        {/* Content */}
        <div className="flex-1 w-full text-white">
          <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-3 md:mb-6 italic text-center md:text-left">
            &quot;{currentTestimonial.text}&quot;
          </p>
          <div className="mb-3 md:mb-6 text-center md:text-left">
            <p className="text-base sm:text-lg md:text-xl font-bold text-emerald-400">{currentTestimonial.name}</p>
            <p className="text-xs sm:text-sm md:text-base text-blue-100">{currentTestimonial.role}</p>
          </div>

          {/* Controls: prev arrow, indicators, next arrow - single row, never overlaps */}
          <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3">
            <button
              onClick={goToPrevious}
              className="flex-shrink-0 bg-white/20 hover:bg-white/40 text-white p-1 sm:p-1.5 rounded-full transition"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <div className="flex gap-1 sm:gap-1.5">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition ${
                    index === currentIndex ? 'bg-emerald-400 w-5 sm:w-6' : 'bg-white/50 w-1.5'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="flex-shrink-0 bg-white/20 hover:bg-white/40 text-white p-1 sm:p-1.5 rounded-full transition"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
