interface SectionHeadingProps {
  title: string
  description?: string
}

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
      {description && <p className="text-slate-600">{description}</p>}
    </div>
  )
}
