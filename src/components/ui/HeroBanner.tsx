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
      className="relative w-full h-96 rounded-3xl overflow-hidden"
      onMouseEnter={() => setIsAutoScrolling(false)}
      onMouseLeave={() => setIsAutoScrolling(true)}
    >
      <div className="flex h-full">
        {/* Left side - Image */}
        <div className="relative w-1/2 bg-blue-900 overflow-hidden rounded-l-3xl">
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
            className="absolute bottom-4 left-4 bg-white/40 hover:bg-white/60 text-white p-2 rounded-full transition z-20 backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goToNext}
            className="absolute bottom-4 right-4 bg-white/40 hover:bg-white/60 text-white p-2 rounded-full transition z-20 backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicators - Inside Image Area at Bottom Center */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition backdrop-blur-sm ${
                  index === currentIndex ? 'bg-white w-8' : 'bg-white/50 w-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right side - Content */}
        <div className="w-1/2 bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col justify-center px-8 rounded-r-3xl">
          <h2 className="text-5xl font-bold text-blue-900 mb-1">
            {currentItem.title}
          </h2>
          <h3 className="text-4xl font-bold text-yellow-500 mb-6">
            {currentItem.subtitle}
          </h3>
          <p className="text-blue-800 mb-6 text-sm leading-relaxed">
            {currentItem.description}
          </p>
          <button
            onClick={openDonateModal}
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-6 py-2 rounded-full w-fit transition cursor-pointer"
          >
            {currentItem.buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}
