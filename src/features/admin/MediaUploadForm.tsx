import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { mediaUploadSchema, type MediaUploadInput } from '../../schemas/media'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { formatFileSize, isValidImageFile, generateFilename } from '../../utils/file'
import { uploadFile, saveMediaMetadata } from '../../services/supabase/storage'
import { getCurrentAdmin } from '../../services/auth/admin'

const categories = ['Education', 'Health', 'Empowerment', 'Environment', 'Events', 'Projects', 'Stories']

export function MediaUploadForm() {
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<MediaUploadInput>({
    resolver: zodResolver(mediaUploadSchema),
  })

  const fileInput = watch('file')
  const typeInput = watch('type')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (typeInput === 'image' && isValidImageFile(file)) {
        const reader = new FileReader()
        reader.onload = (event) => setPreview(event.target?.result as string)
        reader.readAsDataURL(file)
      } else if (typeInput === 'video') {
        setPreview(`📹 ${file.name}`)
      }
    }
  }

  const onSubmit = async (values: MediaUploadInput) => {
    setUploading(true)
    setUploadError(null)
    setUploadSuccess(false)

    try {
      const file = values.file as unknown as File
      const bucket = values.type === 'image' ? 'images' : 'videos'
      const filename = generateFilename(file.name, values.type)
      const filePath = `${values.category.toLowerCase()}/${filename}`

      // Upload file to Supabase storage
      await uploadFile(bucket, filePath, file)

      // Get current admin user
      const adminUser = await getCurrentAdmin()
      const adminId = adminUser?.id

      // Save metadata to database
      await saveMediaMetadata({
        title: values.title,
        description: values.description || '',
        type: values.type as 'image' | 'video',
        category_id: values.category, // You may need to fetch the actual category ID from database
        file_path: filePath,
        file_size: file.size,
        mime_type: file.type,
        uploaded_by: adminId,
      })

      setUploadSuccess(true)
      reset()
      setPreview(null)

      // Show success message
      setTimeout(() => {
        alert(`✓ Successfully uploaded ${filename} (${formatFileSize(file.size)})`)
        setUploadSuccess(false)
      }, 500)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setUploadError(errorMessage)
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <SectionHeading title="Upload Media" description="Add images or videos to the gallery or project collections." />

      {uploadError && (
        <div className="rounded-2xl bg-red-50 p-4 ring-1 ring-red-200">
          <p className="text-sm text-red-700">Error: {uploadError}</p>
        </div>
      )}

      {uploadSuccess && (
        <div className="rounded-2xl bg-green-50 p-4 ring-1 ring-green-200">
          <p className="text-sm text-green-700">✓ Upload successful!</p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Media Type *</label>
          <select
            {...register('type')}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Category *</label>
          <select
            {...register('category')}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-2 text-sm text-red-600">{errors.category.message}</p>}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Title *</label>
        <input
          type="text"
          {...register('title')}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
          placeholder="e.g., Community Learning Event"
        />
        {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
        <textarea
          {...register('description')}
          rows={3}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
          placeholder="Optional: Add context or story"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">File ({typeInput === 'image' ? 'JPG, PNG, WebP' : 'MP4, WebM'}) *</label>
        <div className="rounded-2xl border-2 border-dashed border-slate-300 p-6 text-center">
          <input type="file" {...register('file')} onChange={handleFileChange} className="hidden" id="file-input" />
          <label htmlFor="file-input" className="cursor-pointer">
            <p className="text-sm text-slate-600">Click to browse or drag and drop</p>
            <p className="mt-1 text-xs text-slate-500">Max 50 MB</p>
          </label>
          {fileInput && <p className="mt-2 text-xs text-slate-700">📄 {(fileInput as unknown as File).name}</p>}
        </div>
        {errors.file && <p className="mt-2 text-sm text-red-600">{errors.file.message}</p>}
      </div>

      {preview && (
        <div className="rounded-2xl bg-slate-100 p-4">
          {typeInput === 'image' ? (
            <img src={preview} alt="preview" className="h-32 w-full rounded-xl object-cover" />
          ) : (
            <p className="text-sm text-slate-700">{preview}</p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={uploading}
        className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {uploading ? 'Uploading...' : 'Upload Media'}
      </button>
    </form>
  )
}
