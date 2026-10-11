import { useState } from 'react'
import { AppRoutes } from '../../app/constants/routes'
import { useDonateModal } from '../../app/contexts/DonateContext'
import { useToast } from './Toast'

const footerSocialLinks = [
  { icon: 'facebook', label: 'Facebook', url: '#' },
  { icon: 'youtube', label: 'YouTube', url: '#' },
  { icon: 'instagram', label: 'Instagram', url: '#' },
]

function getFooterSocialIcon(icon: string) {
  const icons: Record<string, React.ReactNode> = {
    facebook: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M
         9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5c-.563-.074-2.313-.229-4.425-.229-4.404 0-7.432 2.678-7.432 7.607v1.852z" />
      </svg>
    ),
    youtube: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    instagram: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.015-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  }
  return icons[icon]
}

export function SiteFooter() {
  const { openDonateModal } = useDonateModal()
  const { success } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    success('Thanks for subscribing! We will keep you updated.')
    setName('')
    setEmail('')
  }

  return (
    <footer className="bg-white text-gray-800 mt-auto">
      {/* Top CTA Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-base sm:text-lg font-light text-center sm:text-left">The Best Way to Make a Difference in the Lives of Others</h2>
          <button
            onClick={openDonateModal}
            className="bg-emerald-400 hover:bg-emerald-500 text-white font-bold px-6 py-2 rounded-full transition whitespace-nowrap cursor-pointer text-sm flex-shrink-0"
          >
            DONATE NOW
          </button>
        </div>
      </div>

      {/* Contact & Newsletter Section */}
      <div className="bg-white text-gray-800 border-b border-gray-200 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-blue-900">Nai Disha Future Foundation</h3>
              <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl">
                Azizpur, Kosi Kalan Road, Mathura - 281403, Uttar Pradesh, India
              </p>
              <p className="mt-4 text-sm sm:text-base text-gray-600">
                Contact Us: Tel: +91-9990512880 , +91-9639268944 | E-mail: naidishafuturefoundation@gmail.com
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              {footerSocialLinks.map((social) => (
                <a
                  key={social.icon}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white transition hover:bg-emerald-600 focus:outline-none"
                  aria-label={social.label}
                >
                  {getFooterSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-4">Subscribe to Our Newsletter</h4>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4 sm:gap-6">
              <div className="flex-1">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  required
                  className="w-full bg-transparent border-b border-gray-300 text-gray-800 placeholder-gray-500 py-2 text-sm sm:text-base focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  required
                  className="w-full bg-transparent border-b border-gray-300 text-gray-800 placeholder-gray-500 py-2 text-sm sm:text-base focus:outline-none focus:border-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="bg-emerald-400 hover:bg-emerald-500 text-white font-bold px-8 py-3 rounded-full transition whitespace-nowrap cursor-pointer text-sm"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid gap-8 sm:gap-10 md:gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {/* About Us Column */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-4 sm:mb-6 uppercase">About Us</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
              <li>
                <a href={AppRoutes.about} className="hover:text-emerald-600 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href={AppRoutes.about} className="hover:text-emerald-600 transition">
                  Our Vision and Mission
                </a>
              </li>
              <li>
                <a href={AppRoutes.comingSoon} className="hover:text-emerald-600 transition">
                  Inspiration - The story of Hope
                </a>
              </li>
              <li>
                <a href={AppRoutes.comingSoon} className="hover:text-emerald-600 transition">
                  Governance
                </a>
              </li>
              <li>
                <a href={AppRoutes.comingSoon} className="hover:text-emerald-600 transition">
                  Board of Trustees
                </a>
              </li>
              <li>
                <a href={AppRoutes.comingSoon} className="hover:text-emerald-600 transition">
                  Advisory Board
                </a>
              </li>
            </ul>
          </div>

          {/* Our Work Column */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-4 sm:mb-6 uppercase">Our Work</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
              <li>
                <a href={AppRoutes.projects} className="hover:text-emerald-600 transition">
                  Our Events
                </a>
              </li>
              <li>
                <a href={AppRoutes.programs} className="hover:text-emerald-600 transition">
                  Education Programs
                </a>
              </li>
              <li>
                <a href={AppRoutes.comingSoon} className="hover:text-emerald-600 transition">
                  Health Initiatives
                </a>
              </li>
              <li>
                <a href={AppRoutes.comingSoon} className="hover:text-emerald-600 transition">
                  Women Empowerment
                </a>
              </li>
              <li>
                <a href={AppRoutes.stories} className="hover:text-emerald-600 transition">
                  Impact Stories
                </a>
              </li>
              <li>
                <a href={AppRoutes.events} className="hover:text-emerald-600 transition">
                  Events & Updates
                </a>
              </li>
            </ul>
          </div>

          {/* Get Involved Column */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-4 sm:mb-6 uppercase">Get Involved</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
              <li>
                <button onClick={openDonateModal} className="hover:text-emerald-600 transition cursor-pointer text-left">
                  Donate Now
                </button>
              </li>
              <li>
                <a href={AppRoutes.comingSoon} className="hover:text-emerald-600 transition">
                  Sponsor a Program
                </a>
              </li>
              <li>
                <a href={AppRoutes.comingSoon} className="hover:text-emerald-600 transition">
                  Volunteer
                </a>
              </li>
              <li>
                <a href={AppRoutes.comingSoon} className="hover:text-emerald-600 transition">
                  Corporate Partnership
                </a>
              </li>
              <li>
                <a href={AppRoutes.contact} className="hover:text-emerald-600 transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Transparency Column */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-4 sm:mb-6 uppercase">Transparency</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
              <li>
                <a href={AppRoutes.comingSoon} className="hover:text-emerald-600 transition">
                  Financials
                </a>
              </li>
              <li>
                <a href={AppRoutes.comingSoon} className="hover:text-emerald-600 transition">
                  How your money is spent
                </a>
              </li>
              <li>
                <a href={AppRoutes.comingSoon} className="hover:text-emerald-600 transition">
                  Audit Reports
                </a>
              </li>
              <li>
                <a href={AppRoutes.comingSoon} className="hover:text-emerald-600 transition">
                  Financial Reports
                </a>
              </li>
              <li>
                <a href={AppRoutes.privacy} className="hover:text-emerald-600 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href={AppRoutes.terms} className="hover:text-emerald-600 transition">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-4 sm:py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-xs sm:text-sm text-gray-600">
            © {new Date().getFullYear()} Nai Disha Future Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
