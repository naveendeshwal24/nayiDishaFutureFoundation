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
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || ''
}

/**
 * Check if file is a valid image by extension (primary) and MIME type (fallback)
 */
export function isValidImageFile(file: File): boolean {
  // Allowed image extensions
  const validExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'svg']
  const fileExtension = getFileExtension(file.name)

  // If extension is valid, accept it
  if (validExtensions.includes(fileExtension)) {
    return true
  }

  // Fallback to MIME type check
  const validMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/bmp',
    'image/svg+xml',
  ]

  return validMimeTypes.includes(file.type)
}

/**
 * Check if file is a valid video by extension (primary) and MIME type (fallback)
 */
export function isValidVideoFile(file: File): boolean {
  // Allowed video extensions
  const validExtensions = ['mp4', 'webm', 'mov', 'avi', 'mkv']
  const fileExtension = getFileExtension(file.name)

  // If extension is valid, accept it
  if (validExtensions.includes(fileExtension)) {
    return true
  }

  // Fallback to MIME type check
  const validMimeTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska']

  return validMimeTypes.includes(file.type)
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
