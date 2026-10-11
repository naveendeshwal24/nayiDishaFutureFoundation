import { SectionHeading } from '../../components/ui/SectionHeading'
import { FeatureCard } from '../../components/ui/FeatureCard'
import { SampleStats } from '../../components/ui/SampleStats'
import { ProgramCard } from '../../components/ui/ProgramCard'
import { ProjectCard } from '../../components/ui/ProjectCard'
import { HeroBanner } from '../../components/ui/HeroBanner'
import { VideoPreview } from '../../components/ui/VideoPreview'
import { TestimonialSection } from '../../components/ui/TestimonialSection'
import { AppRoutes } from '../../app/constants/routes'
import { useSeo } from '../../hooks/useSeo'
import childHealthImage from '../../assets/images/child-health.jpg'
import projectPlantImage from '../../assets/images/project_plant.webp'
import projectDoctorImage from '../../assets/images/project_doctor.webp'
import projectEduImage from '../../assets/images/project_edu.webp'
import galleryImage1 from '../../assets/images/galler_1.webp'
import galleryImage2 from '../../assets/images/gallery_2.webp'
import galleryImage3 from '../../assets/images/galler_3.webp'

const heroBannerItems = [
  {
    id: '1',
    title: 'HEALTH',
    subtitle: 'STARTS WITH CARE',
    description: 'Every individual deserves access to quality healthcare and essential health awareness. Through medical camps, hygiene education, nutrition programs, and community outreach, we empower families to lead healthier, happier lives.',
    image: childHealthImage,
    buttonText: 'Support Health', 
    buttonLink: '#donate', 
  },
  {
    id: '2',
    title: 'EDUCATION',
    subtitle: 'CHANGES LIVES',
    description: 'Education opens doors to opportunity and a brighter future. We provide learning resources, school support, digital education, and mentorship to help every child achieve their full potential.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrnyd-ScTiABKinfcI1cb6wryTa7KXvh0Fs053DYJMg&s=800',
    buttonText: 'Support Education',
    buttonLink: '#donate',
  },
  {
    id: '3',
    title: 'ENVIRONMENT',
    subtitle: 'NEEDS OUR ACTION',
    description: 'A greener planet begins with responsible action. From tree plantation drives and clean-up campaigns to sustainable farming and environmental awareness, we work together to create a cleaner and healthier world.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXPt8XP_jx0rdeV4HcPtOH_Pe6nuNQmfL_WnU6cTQZw&s=800',
    buttonText: 'Join the Mission',
    buttonLink: '#donate',
  },
]

// Carousel images array - not currently used but kept for future carousel implementation
/*
const carouselImages = [
  {
    id: '1',
    title: 'Children Learning in Classroom',
    category: 'Education',
    image: 'https://images.pexels.com/photos/5238656/pexels-photo-5238656.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: '2',
    title: 'Teacher Engaging with Students',
    category: 'Education',
    image: 'https://images.pexels.com/photos/3808047/pexels-photo-3808047.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: '3',
    title: 'Healthcare & Medical Support',
    category: 'Health',
    image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: '4',
    title: 'Healthy Nutrition & Food',
    category: 'Health',
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: '5',
    title: 'Sustainable Farming',
    category: 'Environment',
    image: 'https://images.pexels.com/photos/3584857/pexels-photo-3584857.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: '6',
    title: 'Environmental Conservation',
    category: 'Environment',
    image: 'https://images.pexels.com/photos/3714897/pexels-photo-3714897.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: '7',
    title: 'Community Learning Center',
    category: 'Education',
    image: 'https://images.pexels.com/photos/3452882/pexels-photo-3452882.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: '8',
    title: 'Child Health & Wellness',
    category: 'Health',
    image: 'https://images.pexels.com/photos/8383790/pexels-photo-8383790.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: '9',
    title: 'Green Energy & Sustainability',
    category: 'Environment',
    image: 'https://images.pexels.com/photos/3714897/pexels-photo-3714897.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: '10',
    title: 'Community Health Program',
    category: 'Health',
    image: 'https://images.pexels.com/photos/5213624/pexels-photo-5213624.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
]
*/

const programSamples = [
  {
    title: 'Education Access',
    description: 'We run daily after-school study circles and distribute free textbooks, notebooks, and stationery kits to children from slum and government-school backgrounds, so no child has to skip class for lack of supplies.',
    image: projectEduImage,
  },
  {
    title: 'Health Awareness',
    description: 'Our doctors and nurses visit government schools every month to check the height, weight, eyesight, and general health of students, treating minor ailments on the spot and referring serious cases to partner clinics.',
    image: projectDoctorImage,
  },
  {
    title: 'Women Empowerment',
    description: 'We support mothers and young women with monthly financial assistance and ration kits, alongside tailoring and craft training, so they can earn a stable income while caring for their families.',
    image: galleryImage2,
  },
]

const projectSamples = [
  {
    title: 'Child Safety & Shelter Program',
    description: 'We identify children living on the street or in unsafe slum conditions and connect them with shelter homes, legal protection, and counseling, while working with local police and child welfare committees to keep families together whenever it is safe to do so.',
    image: galleryImage1,
  },
  {
    title: 'Clean Water Initiative',
    description: 'We install solar-powered bore wells and water filters in slum colonies and government schools, giving children and families access to safe drinking water instead of walking miles or relying on contaminated sources.',
    image: galleryImage3,
  },
  {
    title: 'Sustainable Farming',
    description: 'We train smallholder farmers in climate-resilient techniques like drip irrigation, organic composting, and crop rotation, helping them increase yields while protecting soil health for future seasons.',
    image: projectPlantImage,
  },
]

const featureCardsData = [
  {
    title: 'Events',
    description: 'Completed events delivering lasting change for communities.',
    images: [projectPlantImage, projectDoctorImage, projectEduImage],
    purpose: 'In slum settlements, we have set up free after-school tuition centers, distributed school bags, books, and uniforms to over 500 children, and placed dropout students back into government schools through counseling with parents. Our education volunteers run weekend reading circles so children who work part-time can still keep pace with their studies.',
    to: AppRoutes.projects,
  },
  // Videos card temporarily disabled
  // {
  //   title: 'Videos',
  //   description: 'Watch students studying at government schools we support.',
  //   image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=1200',
  //   video: 'https://videos.pexels.com/video-files/5676115/5676115-hd_1280_720_25fps.mp4',
  //   purpose: 'Our health teams run monthly medical camps in slum colonies, offering free check-ups, vaccinations, and deworming for children, along with hygiene and sanitation drives that have reached over 40 settlements. Mothers are trained on basic first-aid and nutrition so common illnesses are caught and treated early instead of turning into bigger health risks.',
  //   to: AppRoutes.videos,
  // },
  {
    title: 'Gallery',
    description: 'A collage of moments with students from underserved communities.',
    images: [galleryImage1, galleryImage2, galleryImage3],
    purpose: 'We run a daily midday meal program for slum children who would otherwise go to school hungry, serving nutritious meals to over 300 students each day along with monthly ration kits for their families. Our kitchens are staffed by mothers from the same community, turning food support into a source of steady income for them as well.',
    to: AppRoutes.gallery,
  },
]

export function HomePage() {
  useSeo(
    'Nai Disha Future Foundation - NGO for Education, Health & Community Empowerment',
    'Nai Disha Future Foundation is an NGO committed to education, health, empowerment, and environmental conservation. Join us in creating positive change for communities in need.'
  )

  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20 px-4 sm:px-6 lg:px-8 pb-8">
      <div className="mx-auto max-w-7xl w-full">
        {/* Hero Banner */}
        <HeroBanner items={heroBannerItems} autoScrollInterval={3000} />

        <div className="grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-[0.9fr_0.7fr] mt-12 md:mt-16 lg:mt-20">
          <section className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-purple-100">
            <SectionHeading title="Mission" description="Our mission is to enable communities to thrive with education, health, and sustainable livelihoods." />
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              Nai Disha Future Foundation partners with government schools, primary health centers, and village councils to close the gaps that keep
              families trapped in poverty. We support local leaders, build trusted programs, and share impact stories while preserving
              dignity and sustainability at every step.
            </p>
            <ul className="mt-4 space-y-2 text-sm sm:text-base text-slate-600">
              <li className="flex gap-2"><span className="text-purple-600">•</span><span><span className="font-medium text-slate-800">Education:</span> After-school learning labs, scholarships, and teacher mentoring for first-generation learners.</span></li>
              <li className="flex gap-2"><span className="text-purple-600">•</span><span><span className="font-medium text-slate-800">Health:</span> Nutrition camps, maternal care awareness, and preventive health screenings in underserved villages.</span></li>
              <li className="flex gap-2"><span className="text-purple-600">•</span><span><span className="font-medium text-slate-800">Livelihoods:</span> Vocational training and micro-enterprise support so families can build lasting income.</span></li>
            </ul>
          </section>
          <section className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-purple-100">
            <SectionHeading title="Vision" description="A future where every child and family can access opportunity, care, and a sustainable path ahead." />
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              We design scalable initiatives that grow with communities and adapt to evolving challenges in education, health, and empowerment.
              Over the next five years, we aim to expand our reach from rural districts to under-resourced urban neighborhoods, building a
              replicable model that local governments and partner NGOs can adopt in their own regions.
            </p>
            <ul className="mt-4 space-y-2 text-sm sm:text-base text-slate-600">
              <li className="flex gap-2"><span className="text-purple-600">•</span><span>Every child completes school with the literacy, confidence, and resources needed to pursue higher education or skilled work.</span></li>
              <li className="flex gap-2"><span className="text-purple-600">•</span><span>Families have access to affordable healthcare and clean water within their own villages, without long travel or delay.</span></li>
              <li className="flex gap-2"><span className="text-purple-600">•</span><span>Community members lead the programs themselves, ensuring change is owned locally and sustained for generations.</span></li>
            </ul>
          </section>
        </div>

        <section className="grid gap-6 grid-cols-1 md:grid-cols-2 mt-12 md:mt-16 lg:mt-20">
          {featureCardsData.map((card) => (
            <FeatureCard
              key={card.title}
              title={card.title}
              description={card.description}
              images={card.images}
              purpose={card.purpose}
              to={card.to}
            />
          ))}
        </section>

        <div className="mt-12 md:mt-16 lg:mt-20">
          <SampleStats />
        </div>

        <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-12 md:mt-16 lg:mt-20">
          {programSamples.map((program) => (
            <ProgramCard key={program.title} title={program.title} description={program.description} image={program.image} />
          ))}
        </section>

        <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-12 md:mt-16 lg:mt-20">
          {projectSamples.map((project) => (
            <ProjectCard key={project.title} title={project.title} description={project.description} image={project.image} />
          ))}
        </section>

        <div className="mt-12 md:mt-16 lg:mt-20">
          <VideoPreview />
        </div>

        <div className="mt-12 md:mt-16 lg:mt-20">
          <TestimonialSection />
        </div>
      </div>
    </div>
  )
}
