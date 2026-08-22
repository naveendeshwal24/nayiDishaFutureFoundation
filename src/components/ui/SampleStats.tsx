import { motion } from 'framer-motion'

export function SampleStats() {
  const stats = [
    { label: 'Communities Served', value: '45+' },
    { label: 'Active Programs', value: '12' },
    { label: 'Lives Impacted', value: '8500+' },
    { label: 'Events Hosted', value: '230+' },
  ]

  return (
    <section className="rounded-3xl bg-gradient-to-r from-purple-600 to-purple-800 px-4 sm:px-6 md:px-8 py-8 md:py-12 text-white">
      <div className="grid gap-6 sm:gap-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="text-center"
          >
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-teal-300">{stat.value}</p>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-purple-100 leading-tight">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
