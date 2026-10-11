import { SectionHeading } from '../../components/ui/SectionHeading'
import { useSeo } from '../../hooks/useSeo'

export function AboutPage() {
  useSeo('About Us | Nai Disha Future Foundation', 'Learn how Nai Disha Future Foundation creates sustainable change through education, health, and community empowerment programs.')

  return (
    <section className="space-y-12 pb-8">
      <SectionHeading title="About Us" description="Learn how Nai Disha Future Foundation creates sustainable change." />
      
      {/* Mission and Values */}
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-slate-600">
            Nai Disha Future Foundation is an NGO platform built for long-term community impact. We design programs in education, health, women's empowerment, and environment while building trustworthy digital systems for storytelling and operations.
          </p>
          <p className="mt-4 text-slate-600">
            Our work is guided by accountability, transparency, and a data-informed approach that ensures every project supports people, protects resources, and inspires participation.
          </p>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-blue-900 to-blue-950 p-8 text-white shadow-sm">
          <h2 className="text-xl font-semibold text-emerald-400">Core Values</h2>
          <ul className="mt-6 space-y-4 text-blue-100">
            <li className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
              Community-centered design
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
              Evidence-based impact
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
              Inclusive growth
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
              Digital accountability
            </li>
          </ul>
        </div>
      </div>

      {/* Leadership Section - Replaced with Impact Areas */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-50 to-blue-50 p-8 shadow-sm ring-1 ring-slate-200">
        <h2 className="mb-2 text-2xl font-bold text-slate-900">Our Impact Areas</h2>
        <p className="mb-8 text-slate-600">Focused initiatives driving measurable change across communities</p>
        <div className="grid gap-8 md:grid-cols-3">
          {/* Education Impact */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 h-48 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 to-emerald-600 shadow-lg">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrnyd-ScTiABKinfcI1cb6wryTa7KXvh0Fs053DYJMg&s=800" 
                alt="Education Impact" 
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Education & Learning</h3>
            <p className="mt-1 text-sm font-semibold text-emerald-600">Knowledge for All</p>
            <p className="mt-3 max-w-xs text-sm text-slate-600">
              Building learning centers, providing scholarships, and digital literacy programs to unlock potential in every child.
            </p>
          </div>

          {/* Health Impact */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 h-48 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 to-emerald-600 shadow-lg">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJV7-7UrtOo12CFmzPYRnjSA8NQ1TduY7S-u_rfQXzmg&s=800" 
                alt="Health Impact" 
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Health & Wellness</h3>
            <p className="mt-1 text-sm font-semibold text-emerald-600">Care for Community</p>
            <p className="mt-3 max-w-xs text-sm text-slate-600">
              Delivering healthcare services, nutrition programs, and wellness awareness to ensure healthy communities.
            </p>
          </div>

          {/* Environment Impact */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 h-48 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 to-emerald-600 shadow-lg">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXPt8XP_jx0rdeV4HcPtOH_Pe6nuNQmfL_WnU6cTQZw&s=800" 
                alt="Environment Impact" 
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Environment & Sustainability</h3>
            <p className="mt-1 text-sm font-semibold text-emerald-600">Green Future</p>
            <p className="mt-3 max-w-xs text-sm text-slate-600">
              Promoting sustainable farming, clean water access, and environmental conservation for generations to come.
            </p>
          </div>
        </div>
      </div>

      {/* Focus Areas with Images */}
      <div>
        <h2 className="mb-2 text-2xl font-bold text-slate-900">Our Core Programs</h2>
        <p className="mb-8 text-slate-600">We work across three interconnected pillars to create sustainable community impact</p>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Education */}
          <div className="rounded-3xl overflow-hidden bg-white shadow-sm ring-1 ring-slate-200 hover:shadow-lg transition">
            <div className="h-40 w-full overflow-hidden bg-slate-200">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrnyd-ScTiABKinfcI1cb6wryTa7KXvh0Fs053DYJMg&s=800"
                alt="Education"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg text-slate-900 mb-2">Education</h3>
              <p className="text-sm text-slate-600">Providing quality education, digital literacy, and scholarship programs to empower the next generation.</p>
            </div>
          </div>

          {/* Health */}
          <div className="rounded-3xl overflow-hidden bg-white shadow-sm ring-1 ring-slate-200 hover:shadow-lg transition">
            <div className="h-40 w-full overflow-hidden bg-slate-200">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJV7-7UrtOo12CFmzPYRnjSA8NQ1TduY7S-u_rfQXzmg&s=800"
                alt="Health"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg text-slate-900 mb-2">Health & Nutrition</h3>
              <p className="text-sm text-slate-600">Supporting healthcare initiatives, nutrition programs, and wellness awareness across communities.</p>
            </div>
          </div>

          {/* Environment */}
          <div className="rounded-3xl overflow-hidden bg-white shadow-sm ring-1 ring-slate-200 hover:shadow-lg transition">
            <div className="h-40 w-full overflow-hidden bg-slate-200">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXPt8XP_jx0rdeV4HcPtOH_Pe6nuNQmfL_WnU6cTQZw&s=800"
                alt="Environment"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg text-slate-900 mb-2">Environment</h3>
              <p className="text-sm text-slate-600">Promoting sustainable farming, clean water access, and environmental conservation initiatives.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
