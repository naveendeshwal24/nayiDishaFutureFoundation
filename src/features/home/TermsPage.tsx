import { SectionHeading } from '../../components/ui/SectionHeading'

export function TermsPage() {
  return (
    <section className="space-y-8 pb-8">
      <SectionHeading title="Terms & Conditions" description="Terms for using the NGO website and its admin services." />
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-slate-600">
          This site is provided for NGO storytelling and administration. Admin access is for authorized staff only, and all uploads follow our data and file validation policies.
        </p>
      </div>
    </section>
  )
}
