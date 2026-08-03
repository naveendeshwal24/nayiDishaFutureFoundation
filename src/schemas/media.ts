import { z } from 'zod'

export const mediaUploadSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  type: z.enum(['image', 'video']),
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'File is required')
    .refine((file) => file.size <= 50 * 1024 * 1024, 'File must be under 50MB'),
})

export type MediaUploadInput = z.infer<typeof mediaUploadSchema>

