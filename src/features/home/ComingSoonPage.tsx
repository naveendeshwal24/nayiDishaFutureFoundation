import { Link } from 'react-router-dom'
import { AppRoutes } from '../../app/constants/routes'

export function ComingSoonPage() {
  return (
    <section className="grid min-h-[60vh] place-items-center px-4 py-16 pb-8 text-center">
      <div className="rounded-3xl bg-white p-10 shadow-lg ring-1 ring-slate-200 sm:p-14">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">Coming Soon</p>
        <h1 className="mt-4 text-3xl sm:text-4xl font-semibold text-slate-900">This page is on its way</h1>
        <p className="mt-4 text-slate-600">
          We're working on this section of Nayi Disha Future Foundation's website. Please check back soon.
        </p>
        <Link
          to={AppRoutes.home}
          className="mt-8 inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Go back home
        </Link>
      </div>
    </section>
  )
}
