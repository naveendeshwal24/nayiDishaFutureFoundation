import { AppRoutes } from '../../app/constants/routes'
import { useDonateModal } from '../../app/contexts/DonateContext'

export function SiteFooter() {
  const { openDonateModal } = useDonateModal()
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

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:gap-10 md:gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* About Section */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2">Nayi Disha</h3>
              <p className="text-xs text-emerald-600 font-semibold">CHARITABLE TRUST</p>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
              The Nayi Disha Future Foundation is a non-profit organization that strives to eliminate classroom hunger through implementing comprehensive programs.
            </p>
            <div className="flex gap-3 mb-6">
              <a
                href="#"
                className="flex h-8 sm:h-9 w-8 sm:w-9 items-center justify-center rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition flex-shrink-0"
              >
                <svg className="h-4 sm:h-5 w-4 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.015-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-8 sm:h-9 w-8 sm:w-9 items-center justify-center rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition flex-shrink-0"
              >
                <svg className="h-4 sm:h-5 w-4 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-8 sm:h-9 w-8 sm:w-9 items-center justify-center rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition flex-shrink-0"
              >
                <svg className="h-4 sm:h-5 w-4 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5c-.563-.074-2.313-.229-4.425-.229-4.404 0-7.432 2.678-7.432 7.607v1.852z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-8 sm:h-9 w-8 sm:w-9 items-center justify-center rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition flex-shrink-0"
              >
                <svg className="h-4 sm:h-5 w-4 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

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
                <a href="#" className="hover:text-emerald-600 transition">
                  Inspiration - The story of Hope
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-600 transition">
                  Governance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-600 transition">
                  Board of Trustees
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-600 transition">
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
                  Our Projects
                </a>
              </li>
              <li>
                <a href={AppRoutes.programs} className="hover:text-emerald-600 transition">
                  Education Programs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-600 transition">
                  Health Initiatives
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-600 transition">
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
                <a href="#" className="hover:text-emerald-600 transition">
                  Sponsor a Program
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-600 transition">
                  Volunteer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-600 transition">
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
                <a href="#" className="hover:text-emerald-600 transition">
                  Financials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-600 transition">
                  How your money is spent
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-600 transition">
                  Audit Reports
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-600 transition">
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
            © {new Date().getFullYear()} Nayi Disha Future Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
