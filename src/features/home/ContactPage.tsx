import { SectionHeading } from '../../components/ui/SectionHeading'
import { useSeo } from '../../hooks/useSeo'

// Placeholder link - replace with the real Google Form once available
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf-dummy-form-id/viewform'
const MAP_EMBED_URL = 'https://www.google.com/maps?q=Kosi+Kalan,+Mathura,+281403&output=embed'

export function ContactPage() {
  useSeo('Contact Us | Nayi Disha Future Foundation', 'Contact Nayi Disha Future Foundation for partnership, volunteering, media requests, or to visit us in Kosi Kalan, Mathura.')

  return (
    <section className="space-y-8 pb-8">
      <SectionHeading title="Contact" description="Get in touch with our team for partnership, volunteering, and media support." />
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-slate-600 break-words">
          For program inquiries, media requests or volunteering, please contact us at{' '}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=nayidishafuturefoundation@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-900 underline break-words"
          >
            nayidishafuturefoundation@gmail.com
          </a>
          .
        </p>
      </div>

      {/* Dummy Google Form CTA */}
      <div className="rounded-3xl bg-blue-50 p-6 sm:p-8 shadow-sm ring-1 ring-blue-100 text-center">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">Have a question or want to get involved?</h3>
        <p className="text-sm text-slate-600 mb-4">Fill out our contact form and our team will get back to you.</p>
        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 text-sm transition"
        >
          Get in Touch via Google Form
        </a>
      </div>

      {/* Location Map */}
      <div className="rounded-3xl overflow-hidden shadow-sm ring-1 ring-slate-200">
        <iframe
          title="Nayi Disha Future Foundation location - Kosi Kalan, Mathura"
          src={MAP_EMBED_URL}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-64 sm:h-80 md:h-96 border-0"
        />
      </div>
    </section>
  )
}
