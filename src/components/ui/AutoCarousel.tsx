import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselItem {
  id: string
  title: string
  image: string
  category: string
}

interface AutoCarouselProps {
  items: CarouselItem[]
  autoScrollInterval?: number // milliseconds
}

export function AutoCarousel({ items, autoScrollInterval = 5000 }: AutoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling || items.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }, autoScrollInterval)

    return () => clearInterval(interval)
  }, [isAutoScrolling, items.length, autoScrollInterval])

  // Pause auto-scroll on hover
  const handleMouseEnter = () => setIsAutoScrolling(false)
  const handleMouseLeave = () => setIsAutoScrolling(true)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (items.length === 0) {
    return (
      <div className="h-96 w-full rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
        <p className="text-slate-500 text-lg">No images available</p>
      </div>
    )
  }

  const currentItem = items[currentIndex]

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl bg-slate-900"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Carousel */}
      <div className="relative h-80 w-full overflow-hidden bg-slate-950">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-contain"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        ))}

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <p className="mb-2 inline-block rounded-full bg-purple-500/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur">
            {currentItem.category}
          </p>
          <h3 className="text-2xl font-bold drop-shadow-lg sm:text-3xl">
            {currentItem.title}
          </h3>
        </div>

        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 transition hover:bg-white/40 backdrop-blur"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 transition hover:bg-white/40 backdrop-blur"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex items-center justify-center gap-2 bg-slate-900 px-4 py-4">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-teal-500'
                : 'w-2.5 bg-slate-600 hover:bg-slate-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
