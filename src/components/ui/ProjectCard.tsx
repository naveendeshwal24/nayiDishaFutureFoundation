import { formatDate } from '../../utils/date'

interface ProjectCardProps {
  title: string
  description: string
  image?: string
  date?: string
  onDelete?: () => void
  deleting?: boolean
}

export function ProjectCard({ title, description, image, date, onDelete, deleting }: ProjectCardProps) {
  return (
    <article className="relative rounded-3xl bg-gradient-to-br from-orange-50 to-orange-100 ring-1 ring-orange-200 transition hover:shadow-lg hover:ring-orange-300 overflow-hidden">
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          disabled={deleting}
          aria-label={`Remove ${title}`}
          className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-red-600 text-xs font-bold text-white shadow-md transition hover:bg-red-700 disabled:opacity-50"
        >
          ✕
        </button>
      )}
      {image && (
        <div className="h-32 sm:h-40 md:h-48 w-full overflow-hidden bg-orange-200">
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
        {date && <p className="mt-2 text-xs text-orange-500">{formatDate(date)}</p>}
        {image && (
          <a
            href={image}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-orange-600 hover:text-orange-800 hover:underline"
          >
            View full image
          </a>
        )}
      </div>
    </article>
  )
}
