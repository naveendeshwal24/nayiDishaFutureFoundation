import { SectionHeading } from '../../components/ui/SectionHeading'
import { useSeo } from '../../hooks/useSeo'

export function PrivacyPage() {
  useSeo('Privacy Policy | Nai Disha Future Foundation', 'Read the Nai Disha Future Foundation privacy policy on how we handle information and media data.')

  return (
    <section className="space-y-8 pb-8">
      <SectionHeading title="Privacy Policy" description="Understand how we handle information and media data." />
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-slate-600">
          We do not store user-generated content in our database; only metadata and references to secure Supabase storage locations are kept. All admin access is protected and handled through secure authentication.
        </p>
      </div>
    </section>
  )
}
