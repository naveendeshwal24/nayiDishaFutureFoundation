interface SectionHeadingProps {
  title: string
  description?: string
}

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="space-y-2 sm:space-y-3">
      <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">{title}</h2>
      {description && <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{description}</p>}
    </div>
  )
}
