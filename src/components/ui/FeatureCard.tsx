interface FeatureCardProps {
  title: string
  description: string
  image?: string
}

export function FeatureCard({ title, description, image }: FeatureCardProps) {
  return (
    <article className="rounded-3xl bg-white shadow-sm transition hover:shadow-md ring-1 ring-slate-200 overflow-hidden">
      {image && (
        <div className="h-32 w-full overflow-hidden bg-slate-200">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
      </div>
    </article>
  )
}
