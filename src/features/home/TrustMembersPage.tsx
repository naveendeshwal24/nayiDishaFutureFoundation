import { Cpu, Crown, ShieldCheck, Users } from 'lucide-react'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { useSeo } from '../../hooks/useSeo'
import presidentImage from '../../assets/images/president.jpeg'
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
  name: 'Narendra Pal Singh',
  designation: 'President',
  description: 'Leads the trust\u2019s overall vision, strategy, and community initiatives.',
  image: presidentImage,
}

const vicePresident: Member = {
  name: 'Sanjay Kumar',
  designation: 'Vice President',
  description: 'Supports the President and oversees day-to-day program execution.',
  image: sanjayImage,
}

const itMember: Member = {
  name: 'Naveen Deshwal',
  designation: 'IT Member',
  description: 'Manages the trust\u2019s website, digital records, and technology infrastructure.',
  image: naveenImage,
}

const upperTrustMembers: Member[] = [
  { name: 'Mahender Kumar', designation: 'Trust Member', description: 'Holds all finance responsibilities, managing the trust\u2019s accounts and funds.', image: mahenderImage },
  { name: 'Preet Kumar Panchal', designation: 'Trust Member', description: 'Supports community outreach and on-ground event coordination.' },
  { name: 'Prem Kumar', designation: 'Trust Member', description: 'Supports community outreach and on-ground event coordination.', image: premImage },
  { name: 'Rahul Panchal', designation: 'Trust Member', description: 'Supports community outreach and on-ground event coordination.' },
  { name: 'Vijay Shankar Sharma', designation: 'Trust Member', description: 'Manages field operations and community engagement.', image: vijayImage },
  { name: 'Dilip Panchal', designation: 'Trust Member', description: 'Supports community outreach and on-ground event coordination.' },
]

const lowerTrustMembers: Member[] = [
  { name: 'Devender kumar', designation: 'Trust Member', description: 'Supports community outreach and on-ground event coordination.' },
  { name: 'Arjun', designation: 'Trust Member', description: 'Supports administrative work and record keeping for the trust.', image: arjunImage },
  { name: 'Vikram Singh', designation: 'Trust Member', description: 'Supports community outreach and on-ground event coordination.' },
  { name: 'Yogesh', designation: 'Trust Member', description: 'Supports community outreach and on-ground event coordination.' },
  { name: 'Omprakash', designation: 'Trust Member', description: 'Oversees resource management and logistics for trust activities.', image: omprakashImage },
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
    'Trust Members | Nai Disha Future Foundation',
    'Meet the President, Vice President, and Trust Members leading Nai Disha Future Foundation.'
  )

  return (
    <section className="space-y-10 pb-12">
      <SectionHeading
        title="Trust Members"
        description="Meet the people behind Nai Disha Future Foundation and the organizational structure that guides our mission."
      />

      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center lg:gap-12">
        {/* Leadership: President, Vice President, IT Member - kept separate from the team hierarchy */}
        <div className="flex flex-col items-center gap-6 lg:w-72 lg:shrink-0">
          <LeaderCard
            member={president}
            icon={<Crown className="h-3.5 w-3.5 text-orange-500" />}
            gradient="from-orange-50 to-orange-100"
            ring="ring-orange-300"
            size="lg"
          />

          <LeaderCard
            member={vicePresident}
            icon={<ShieldCheck className="h-3.5 w-3.5 text-sky-500" />}
            gradient="from-sky-50 to-sky-100"
            ring="ring-sky-300"
            size="md"
          />

          <LeaderCard
            member={itMember}
            icon={<Cpu className="h-3.5 w-3.5 text-indigo-500" />}
            gradient="from-indigo-50 to-indigo-100"
            ring="ring-indigo-300"
            size="md"
          />
        </div>

        {/* Team members, positioned beside leadership rather than beneath it */}
        <div className="flex w-full max-w-4xl flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            <Users className="h-3.5 w-3.5" />
            Trust Members
          </div>

          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
            {upperTrustMembers.map((member, index) => (
              <MemberCard key={`${member.name}-${index}`} member={member} />
            ))}
          </div>

          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
            {lowerTrustMembers.map((member, index) => (
              <MemberCard key={`${member.name}-${index}`} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
