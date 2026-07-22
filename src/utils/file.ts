/**
 * Format file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Check if file is a valid image
 */
export function isValidImageFile(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  return validTypes.includes(file.type)
}

/**
 * Check if file is a valid video
 */
export function isValidVideoFile(file: File): boolean {
  const validTypes = ['video/mp4', 'video/webm', 'video/quicktime']
  return validTypes.includes(file.type)
}

/**
 * Generate a unique filename with timestamp
 */
export function generateFilename(originalName: string, prefix = ''): string {
  const ext = originalName.split('.').pop()
  const timestamp = Date.now()
  const name = originalName.split('.')[0].replace(/[^a-z0-9]/gi, '_')
  return `${prefix}${prefix ? '_' : ''}${name}_${timestamp}.${ext}`
}
