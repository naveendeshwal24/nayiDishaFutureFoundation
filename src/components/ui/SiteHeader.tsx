import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppRoutes } from '../../app/constants/routes'
import { Logo } from './Logo'
import { useDonateModal } from '../../app/contexts/DonateContext'

const links = [
  { label: 'Home', path: AppRoutes.home },
  { label: 'About Us', path: AppRoutes.about },
  { label: 'Programs', path: AppRoutes.programs },
  { label: 'Projects', path: AppRoutes.projects },
  { label: 'Gallery', path: AppRoutes.gallery },
  { label: 'Contact Us', path: AppRoutes.contact },
]

const socialLinks = [
  { icon: 'facebook', label: 'Facebook', url: '#' },
  { icon: 'instagram', label: 'Instagram', url: '#' },
  { icon: 'youtube', label: 'YouTube', url: '#' },
  { icon: 'linkedin', label: 'LinkedIn', url: '#' },
  { icon: 'twitter', label: 'Twitter', url: '#' },
]

const countries = [
  'India',
  'U.K',
  'U.S.A',
  'Canada',
  'Singapore',
  'Andhra Pradesh',
  'Assam',
  'Chhattisgarh',
  'Gujarat',
  'Karnataka',
  'Odisha',
  'Rajasthan',
  'Tamilnadu',
  'Telangana',
  'Uttar Pradesh',
]

function getSocialIcon(icon: string) {
  const icons: Record<string, React.ReactNode> = {
    facebook: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5c-.563-.074-2.313-.229-4.425-.229-4.404 0-7.432 2.678-7.432 7.607v1.852z" />
      </svg>
    ),
    instagram: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.015-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    youtube: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    linkedin: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    twitter: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75-2.45 2.25-7.25 2.25-7.25S22.5 7 23 3z" />
      </svg>
    ),
  }
  return icons[icon]
}

export function SiteHeader() {
  const [selectedCountry, setSelectedCountry] = useState('India')
  const [isCountryOpen, setIsCountryOpen] = useState(false)
  const { openDonateModal } = useDonateModal()
  const navigate = useNavigate()

  return (
    <header className="border-b border-gray-200 bg-white">
      {/* Top Bar with Contact Info and Country Selector */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 sm:px-6 lg:px-8 text-xs text-gray-600">
        <div className="mx-auto max-w-7xl flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span>📍 Tender Notice</span>
            <span>✉️ info@example.org</span>
            <span>📞 +91-XXX-XXX-XXXX</span>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsCountryOpen(!isCountryOpen)}
              className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-gray-700 text-sm"
            >
              {selectedCountry}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
            {isCountryOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded shadow-lg max-h-64 overflow-y-auto z-50">
                {countries.map((country) => (
                  <button
                    key={country}
                    onClick={() => {
                      setSelectedCountry(country)
                      setIsCountryOpen(false)
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-blue-50 text-sm ${
                      selectedCountry === country ? 'bg-blue-100 text-blue-900 font-semibold' : 'text-gray-700'
                    }`}
                  >
                    {country}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <NavLink to={AppRoutes.home} className="flex items-center gap-2">
          <Logo />
          <span className="text-xs font-semibold text-gray-700 uppercase tracking-widest">NAYI DISHA<br />FUTURE FOUNDATION</span>
        </NavLink>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? 'text-slate-900 border-b-2 border-orange-500' : 'text-slate-700 hover:text-slate-900'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Social Icons and Donate Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.icon}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700"
                aria-label={social.label}
              >
                {getSocialIcon(social.icon)}
              </a>
            ))}
          </div>
          <button
            onClick={() => navigate('/admin/login')}
            className="rounded-lg bg-slate-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 cursor-pointer"
          >
            Admin
          </button>
          <button
            onClick={openDonateModal}
            className="rounded-lg bg-orange-400 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-500 cursor-pointer"
          >
            Donate now
          </button>
        </div>
      </div>
    </header>
  )
}
