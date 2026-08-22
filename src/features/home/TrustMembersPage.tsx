import { Cpu, Crown, ShieldCheck, Users } from 'lucide-react'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { useSeo } from '../../hooks/useSeo'
import presidentImage from '../../assets/images/president.jpeg'
import subPresidentImage from '../../assets/images/sub-president.jpeg'
import naveenImage from '../../assets/images/Naveen_IT.jpeg'
import premImage from '../../assets/images/Prem.jpeg'
import mahenderImage from '../../assets/images/Mahender.jpeg'
import omprakashImage from '../../assets/images/Omprakash.jpeg'
import vijayImage from '../../assets/images/Vijay.jpeg'
import arjunImage from '../../assets/images/arjun.jpeg'
import sanjayImage from '../../assets/images/sanjay.jpeg'

interface Member {
  name: string
  designation: string
  description?: string
  image?: string
}

const president: Member = {
  name: 'President, Name',
  designation: 'President',
  description: 'Leads the trust\u2019s overall vision, strategy, and community initiatives.',
  image: presidentImage,
}

const subPresident: Member = {
  name: 'Sub-President, Name',
  designation: 'Sub-President',
  description: 'Supports the President and oversees day-to-day program execution.',
  image: subPresidentImage,
}

const itMember: Member = {
  name: 'Naveen Deshwal',
  designation: 'IT Member',
  description: 'Manages the trust\u2019s website, digital records, and technology infrastructure.',
  image: naveenImage,
}

const trustMembers: Member[] = [
  { name: 'Prem', designation: 'Trust Member', description: 'Supports community outreach and on-ground event coordination.', image: premImage },
  { name: 'Mahender', designation: 'Trust Member', description: 'Assists with program planning and volunteer management.', image: mahenderImage },
  { name: 'Omprakash', designation: 'Trust Member', description: 'Oversees resource management and logistics for trust activities.', image: omprakashImage },
  { name: 'Vijay', designation: 'Trust Member', description: 'Manages field operations and community engagement.', image: vijayImage },
  { name: 'Arjun', designation: 'Trust Member', description: 'Supports administrative work and record keeping for the trust.', image: arjunImage },
  { name: 'Sanjay', designation: 'Trust Member', description: 'Supports community outreach and on-ground event coordination.', image: sanjayImage },
  { name: 'Trust Member, Name', designation: 'Trust Member', description: 'Supports community outreach and on-ground event coordination.' },
  { name: 'Trust Member, Name', designation: 'Trust Member', description: 'Supports community outreach and on-ground event coordination.' },
]

const avatarPalette = [
  'bg-orange-100 text-orange-600',
  'bg-sky-100 text-sky-600',
  'bg-emerald-100 text-emerald-600',
  'bg-purple-100 text-purple-600',
  'bg-rose-100 text-rose-600',
  'bg-amber-100 text-amber-600',
]

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

function getAvatarColor(name: string) {
  const index = name.charCodeAt(0) % avatarPalette.length
  return avatarPalette[index]
}

function Connector({ className = '' }: { className?: string }) {
  return <div className={`w-px bg-slate-400 ${className}`} />
}

function MemberAvatar({ name, image, sizeClass }: { name: string; image?: string; sizeClass: string }) {
  if (image) {
    return <img src={image} alt={name} className={`${sizeClass} rounded-full object-cover ring-4 ring-white shadow`} />
  }
  return (
    <div
      className={`${sizeClass} rounded-full ring-4 ring-white shadow flex items-center justify-center font-semibold ${getAvatarColor(name)}`}
    >
      {getInitials(name)}
    </div>
  )
}

function LeaderCard({ member, icon, gradient, ring, size }: {
  member: Member
  icon: React.ReactNode
  gradient: string
  ring: string
  size: 'lg' | 'md'
}) {
  return (
    <article
      className={`flex flex-col items-center text-center rounded-3xl bg-gradient-to-br ${gradient} ring-2 ${ring} shadow-sm transition hover:shadow-lg px-6 py-6 sm:px-8 sm:py-8 ${
        size === 'lg' ? 'w-64 sm:w-72' : 'w-56 sm:w-64'
      }`}
    >
      <MemberAvatar name={member.name} image={member.image} sizeClass={size === 'lg' ? 'h-28 w-28 sm:h-32 sm:w-32' : 'h-24 w-24 sm:h-28 sm:w-28'} />
      <div className="mt-4 flex items-center gap-1.5">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{member.designation}</span>
      </div>
      <h3 className={`mt-1 font-semibold text-slate-900 ${size === 'lg' ? 'text-xl' : 'text-lg'}`}>{member.name}</h3>
      {member.description && <p className="mt-2 text-sm text-slate-600 leading-relaxed">{member.description}</p>}
    </article>
  )
}

function MemberCard({ member, highlighted }: { member: Member; highlighted?: boolean }) {
  return (
    <article
      className={`relative flex flex-col items-center text-center rounded-2xl bg-white shadow-sm transition hover:shadow-md hover:-translate-y-0.5 ring-2 px-5 py-6 w-full sm:w-56 ${
        highlighted ? 'ring-sky-400' : 'ring-slate-300'
      }`}
    >
      {highlighted && (
        <span className="absolute -top-3 right-4 flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-white shadow">
          <Cpu className="h-3.5 w-3.5" />
        </span>
      )}
      <MemberAvatar name={member.name} image={member.image} sizeClass="h-20 w-20" />
      <div className="mt-3 flex items-center gap-1.5">
        {highlighted && <Cpu className="h-3.5 w-3.5 text-sky-500" />}
        <span className={`text-xs font-semibold uppercase tracking-[0.18em] ${highlighted ? 'text-sky-600' : 'text-slate-500'}`}>
          {member.designation}
        </span>
      </div>
      <h3 className="mt-1 text-base font-semibold text-slate-900">{member.name}</h3>
      {member.description && <p className="mt-2 text-xs text-slate-500 leading-relaxed">{member.description}</p>}
    </article>
  )
}

export function TrustMembersPage() {
  useSeo(
    'Trust Members | Nayi Disha Future Foundation',
    'Meet the President, Sub-President, and Trust Members leading Nayi Disha Future Foundation.'
  )

  const membersRow = [itMember, ...trustMembers]

  return (
    <section className="space-y-10 pb-12">
      <SectionHeading
        title="Trust Members"
        description="Meet the people behind Nayi Disha Future Foundation and the organizational structure that guides our mission."
      />

      <div className="flex flex-col items-center">
        {/* President */}
        <LeaderCard
          member={president}
          icon={<Crown className="h-3.5 w-3.5 text-orange-500" />}
          gradient="from-orange-50 to-orange-100"
          ring="ring-orange-300"
          size="lg"
        />

        <Connector className="h-8 sm:h-10" />

        {/* Sub-President */}
        <LeaderCard
          member={subPresident}
          icon={<ShieldCheck className="h-3.5 w-3.5 text-sky-500" />}
          gradient="from-sky-50 to-sky-100"
          ring="ring-sky-300"
          size="md"
        />

        <Connector className="h-8 sm:h-10" />

        {/* Branch header for IT Member + Trust Members */}
        <div className="hidden md:flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          <Users className="h-3.5 w-3.5" />
          IT Member &amp; Trust Members
        </div>
        <Connector className="hidden md:block h-6" />

        {/* Horizontal connector bar (desktop only) */}
        <div className="hidden md:block relative w-full max-w-4xl">
          <div className="absolute left-[10%] right-[10%] top-0 h-px bg-slate-400" />
        </div>

        {/* Members grid with stem connectors */}
        <div className="grid w-full max-w-4xl grid-cols-1 gap-6 pt-0 sm:grid-cols-2 md:grid-cols-3 md:gap-8 md:pt-0">
          {membersRow.map((member, index) => (
            <div key={`${member.name}-${index}`} className="flex flex-col items-center">
              <Connector className={`h-6 ${index === 0 ? 'hidden md:block' : 'block sm:hidden md:block'}`} />
              <MemberCard member={member} highlighted={index === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
