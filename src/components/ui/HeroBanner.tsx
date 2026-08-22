import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useDonateModal } from '../../app/contexts/DonateContext'

interface HeroBannerItem {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  buttonText: string
  buttonLink: string
}

interface HeroBannerProps {
  items: HeroBannerItem[]
  autoScrollInterval?: number
}

export function HeroBanner({ items, autoScrollInterval = 5000 }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const { openDonateModal } = useDonateModal()

  useEffect(() => {
    if (!isAutoScrolling || items.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }, autoScrollInterval)

    return () => clearInterval(interval)
  }, [isAutoScrolling, items.length, autoScrollInterval])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }

  if (items.length === 0) return null

  const currentItem = items[currentIndex]

  return (
    <div
      className="relative w-full h-auto md:h-96 rounded-3xl overflow-hidden"
      onMouseEnter={() => setIsAutoScrolling(false)}
      onMouseLeave={() => setIsAutoScrolling(true)}
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Left side - Image */}
        <div className="relative w-full md:w-1/2 h-48 md:h-full bg-blue-900 overflow-hidden rounded-t-3xl md:rounded-t-none md:rounded-l-3xl">
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/600x400/1e3a8a/ffffff?text=Image'
            }}
          />

          {/* Navigation Arrows - Inside Image Area at Bottom */}
          <button
            onClick={goToPrevious}
            className="absolute bottom-2 left-2 md:bottom-4 md:left-4 bg-white/40 hover:bg-white/60 text-white p-1.5 md:p-2 rounded-full transition z-20 backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          <button
            onClick={goToNext}
            className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-white/40 hover:bg-white/60 text-white p-1.5 md:p-2 rounded-full transition z-20 backdrop-blur-sm"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Indicators - Inside Image Area at Bottom Center */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 md:gap-2 z-20">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 md:h-2 rounded-full transition backdrop-blur-sm ${
                  index === currentIndex ? 'bg-white w-6 md:w-8' : 'bg-white/50 w-1.5 md:w-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right side - Content */}
        <div className="w-full md:w-1/2 bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col justify-center px-4 sm:px-6 md:px-8 py-6 md:py-0 rounded-b-3xl md:rounded-b-none md:rounded-r-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-blue-900 mb-1 break-words">
            {currentItem.title}
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-yellow-500 mb-4 md:mb-6 break-words">
            {currentItem.subtitle}
          </h3>
          <p className="text-blue-800 mb-4 md:mb-6 text-xs sm:text-sm md:text-sm leading-relaxed">
            {currentItem.description}
          </p>
          <button
            onClick={openDonateModal}
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-4 md:px-6 py-2 rounded-full w-fit transition cursor-pointer text-sm md:text-base"
          >
            {currentItem.buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}
