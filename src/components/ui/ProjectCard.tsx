interface ProjectCardProps {
  title: string
  description: string
  image?: string
}

export function ProjectCard({ title, description, image }: ProjectCardProps) {
  return (
    <article className="rounded-3xl bg-gradient-to-br from-orange-50 to-orange-100 ring-1 ring-orange-200 transition hover:shadow-lg hover:ring-orange-300 overflow-hidden">
      {image && (
        <div className="h-40 w-full overflow-hidden bg-orange-200">
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
        <h3 className="font-semibold text-orange-900">{title}</h3>
        <p className="mt-2 text-sm text-orange-700">{description}</p>
      </div>
    </article>
  )
}
