import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { mediaUploadSchema, type MediaUploadInput } from '../../schemas/media'
import { formatFileSize, isValidImageFile, isValidVideoFile, generateFilename } from '../../utils/file'
import { uploadFile, saveMediaMetadata, getMediaCategories } from '../../services/supabase/storage'
import { getCurrentAdmin } from '../../services/auth/admin'
import { useToast } from '../../components/ui/Toast'

export function MediaUploadForm() {
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const queryClient = useQueryClient()
  const { success: showSuccess, error: showError } = useToast()

  // Load real categories (with UUID ids) from the database
  const { data: categories = [] } = useQuery({
    queryKey: ['media-categories'],
    queryFn: getMediaCategories,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<MediaUploadInput>({
    resolver: zodResolver(mediaUploadSchema),
  })

  const fileInput = watch('file')
  const typeInput = watch('type')
  const { ref: fileRef, name: fileName, onBlur: fileOnBlur } = register('file')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Store the actual File (not the FileList) so zod's instanceof(File) check passes
    setValue('file', file, { shouldValidate: true })

    // Show preview immediately for all supported formats
    if (typeInput === 'image') {
      const reader = new FileReader()
      reader.onload = (event) => setPreview(event.target?.result as string)
      reader.readAsDataURL(file)
    } else if (typeInput === 'video') {
      setPreview(`📹 ${file.name}`)
    }
  }

  const onSubmit = async (values: MediaUploadInput) => {
    setUploading(true)
    setUploadError(null)
    setUploadSuccess(false)

    try {
      const file = values.file as unknown as File

      // Validate file type based on selected media type
      if (values.type === 'image') {
        if (!isValidImageFile(file)) {
          throw new Error('Invalid image format. Accepted: JPG, JPEG, PNG, WebP, GIF, BMP, SVG')
        }
      } else if (values.type === 'video') {
        if (!isValidVideoFile(file)) {
          throw new Error('Invalid video format. Accepted: MP4, WebM, MOV, AVI, MKV')
        }
      }

      const bucket = values.type === 'image' ? 'images' : 'videos'
      const filename = generateFilename(file.name, values.type)
      const categoryName = categories.find((cat) => cat.id === values.category)?.name || 'general'
      const filePath = `${categoryName.toLowerCase()}/${filename}`

      // Upload file to Supabase storage
      await uploadFile(bucket, filePath, file)
      console.log("bucket, filePath, file :- ", bucket, filePath, file)

      // Get current admin user
      const adminUser = await getCurrentAdmin()
      const adminId = adminUser?.id

      // Save metadata to database
      await saveMediaMetadata({
        title: values.title,
        description: values.description || '',
        type: values.type as 'image' | 'video',
        category_id: values.category,
        file_path: filePath,
        file_size: file.size,
        mime_type: file.type,
        uploaded_by: adminId,
      })

      // Invalidate queries to refresh MediaList
      await queryClient.invalidateQueries({ queryKey: ['media'] })

      setUploadSuccess(true)
      reset()
      setPreview(null)

      // Show success toast
      showSuccess(`✓ ${filename} uploaded (${formatFileSize(file.size)})`)
    } catch (error) {
      const rawMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      const errorMessage = rawMessage.toLowerCase().includes('row-level security')
        ? 'Upload blocked by Supabase storage permissions. The "images"/"videos" buckets need RLS policies allowing authenticated uploads — run the storage policies in database/schema.sql from the Supabase SQL Editor.'
        : rawMessage
      setUploadError(errorMessage)
      showError(errorMessage)
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Upload Media</h2>
        <p className="text-xs text-slate-600">Add images or videos to the gallery</p>
      </div>

      {uploadError && (
        <div className="rounded-lg bg-red-50 p-3 ring-1 ring-red-200">
          <p className="text-xs text-red-700">❌ {uploadError}</p>
        </div>
      )}

      {uploadSuccess && (
        <div className="rounded-lg bg-green-50 p-3 ring-1 ring-green-200">
          <p className="text-xs text-green-700">✓ Upload successful!</p>
        </div>
      )}

      <div className="grid gap-2 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-700">Media Type *</label>
          <select
            {...register('type')}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-900 outline-none transition focus:border-slate-400"
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-700">Category *</label>
          <select
            {...register('category')}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-900 outline-none transition focus:border-slate-400"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category.message}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-slate-700">Title *</label>
        <input
          type="text"
          {...register('title')}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-900 outline-none transition focus:border-slate-400"
          placeholder="e.g., Community Event"
        />
        {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-slate-700">Description</label>
        <textarea
          {...register('description')}
          rows={2}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-900 outline-none transition focus:border-slate-400"
          placeholder="Optional: Add context"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-slate-700">File ({typeInput === 'image' ? 'JPG, PNG, WebP' : 'MP4, WebM'}) *</label>
        <div className="rounded-lg border-2 border-dashed border-slate-300 p-3 text-center">
          <input
            type="file"
            ref={fileRef}
            name={fileName}
            onBlur={fileOnBlur}
            onChange={handleFileChange}
            className="hidden"
            id="file-input"
            accept={typeInput === 'image' ? 'image/jpeg,image/jpg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp,.gif' : 'video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov'}
          />
          <label htmlFor="file-input" className="cursor-pointer">
            <p className="text-xs text-slate-600">Click to browse or drag & drop</p>
            <p className="mt-0.5 text-xs text-slate-500">Max 50 MB</p>
          </label>
          {fileInput && <p className="mt-1 text-xs text-slate-700">📄 {(fileInput as unknown as File).name}</p>}
        </div>
        {errors.file && <p className="mt-1 text-xs text-red-600">{errors.file.message}</p>}
      </div>

      {preview && (
        <div className="rounded-lg bg-slate-100 p-2">
          {typeInput === 'image' ? (
            <img src={preview} alt="preview" className="h-20 w-full rounded object-cover" />
          ) : (
            <p className="text-xs text-slate-700">{preview}</p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={uploading}
        className="w-full rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {uploading ? 'Uploading...' : 'Upload Media'}
      </button>
    </form>
  )
}
