import { SectionHeading } from '../../components/ui/SectionHeading'

export function ContactPage() {
  return (
    <section className="space-y-8 pb-8">
      <SectionHeading title="Contact" description="Get in touch with our team for partnership, volunteering, and media support." />
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-slate-600">
          For program inquiries, media requests or volunteering, please contact us at{' '}
          <a href="mailto:hello@naydishafoundation.org" className="font-medium text-slate-900 underline">
            hello@naydishafoundation.org
          </a>
          .
        </p>
      </div>
    </section>
  )
}
