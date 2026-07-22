interface ProgramCardProps {
  title: string
  description: string
  image?: string
}

export function ProgramCard({ title, description, image }: ProgramCardProps) {
  return (
    <article className="rounded-3xl bg-gradient-to-br from-purple-50 to-purple-100 ring-1 ring-purple-200 transition hover:shadow-lg hover:ring-purple-300 overflow-hidden">
      {image && (
        <div className="h-40 w-full overflow-hidden bg-purple-200">
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
        <h3 className="font-semibold text-purple-900">{title}</h3>
        <p className="mt-2 text-sm text-purple-700">{description}</p>
      </div>
    </article>
  )
}
