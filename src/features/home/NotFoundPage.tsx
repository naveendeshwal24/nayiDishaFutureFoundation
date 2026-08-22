import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppRoutes } from '../../app/constants/routes'

function ButterflyImage({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M32 20c-4-10-16-16-22-10-5 5-3 18 8 22-11 2-15 14-9 20 6 6 18 2 23-10z"
        fill="#f97316"
      />
      <path
        d="M32 20c4-10 16-16 22-10 5 5 3 18-8 22 11 2 15 14 9 20-6 6-18 2-23-10z"
        fill="#ea580c"
      />
      <rect x="30" y="16" width="4" height="30" rx="2" fill="#1e293b" />
      <circle cx="31" cy="14" r="3" fill="#1e293b" />
      <circle cx="35" cy="14" r="3" fill="#1e293b" />
    </svg>
  )
}

export function NotFoundPage() {
  const [flightKey, setFlightKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setFlightKey((key) => key + 1), 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative grid min-h-[60vh] place-items-center overflow-hidden px-4 py-16 pb-8 text-center">
      <ButterflyImage key={flightKey} className="butterfly-flight pointer-events-none select-none h-12 w-12 sm:h-16 sm:w-16" />
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 sm:p-14">
        <p className="text-lg sm:text-xl font-semibold uppercase tracking-[0.3em] text-sky-500">404</p>
        <h1 className="mt-4 text-5xl sm:text-6xl md:text-7xl font-semibold text-slate-900">Page not found</h1>
        <p className="mt-4 text-lg sm:text-xl text-slate-600">The page you requested does not exist or has been moved.</p>
        <Link
          to={AppRoutes.home}
          className="mt-8 inline-flex rounded-full bg-slate-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-700"
        >
          Go back home
        </Link>
      </div>
    </section>
  )
}
