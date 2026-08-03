import { Outlet } from 'react-router-dom'
import { SiteFooter } from '../../components/ui/SiteFooter'
import { SiteHeader } from '../../components/ui/SiteHeader'

export function AppLayout() {
  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-900">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-6 sm:py-8 md:py-12 lg:py-16">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
