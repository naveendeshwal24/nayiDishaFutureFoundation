import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface FeatureCardProps {
  title: string
  description: string
  image?: string
  images?: string[]
  video?: string
  badge?: string
  purpose?: string
  to?: string
}

export function FeatureCard({ title, description, image, images, video, badge, purpose, to }: FeatureCardProps) {
  const slides = images && images.length > 0 ? images : undefined
  const [activeSlide, setActiveSlide] = useState(0)

  // cycle through the provided images every second when a gallery is supplied
  useEffect(() => {
    if (!slides || slides.length < 2) return
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 1000)
    return () => clearInterval(timer)
  }, [slides])

  const content = (
    <article className="rounded-3xl bg-white shadow-sm transition hover:shadow-md ring-1 ring-slate-200 overflow-hidden h-full flex flex-col">
      {(video || image || slides) && (
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-slate-200">
          {slides ? (
            slides.map((src, index) => (
              <img
                key={src + index}
                src={src}
                alt={`${title} ${index + 1}`}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
                  index === activeSlide ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))
          ) : video ? (
            // poster keeps the fallback image visible if the video source fails to load
            <video
              src={video}
              poster={image}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          ) : (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          )}
          {badge && (
            <span className="absolute bottom-2 right-2 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-white">
              {badge}
            </span>
          )}
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
        {purpose && (
          <div className="mt-4 border-t border-slate-100 pt-4">
            <p className="text-sm text-slate-600">{purpose}</p>
          </div>
        )}
        {to && (
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-purple-700">
            Explore {title} <span aria-hidden="true">→</span>
          </span>
        )}
      </div>
    </article>
  )

  if (to) {
    return (
      <Link to={to} className="block">
        {content}
      </Link>
    )
  }

  return content
}
