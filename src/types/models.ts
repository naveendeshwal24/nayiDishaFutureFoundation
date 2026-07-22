export interface MediaCategory {
  id: string
  name: string
  description?: string
  created_at: string
  updated_at: string
}

export interface MediaItem {
  id: string
  title: string
  description?: string
  type: 'image' | 'video'
  category_id?: string
  category?: MediaCategory
  file_path: string
  file_size?: number
  mime_type?: string
  duration?: number
  thumbnail_url?: string
  is_featured?: boolean
  uploaded_by?: string
  uploaded_at: string
  updated_at: string
}

export interface GalleryImage extends MediaItem {
  type: 'image'
}

export interface GalleryVideo extends MediaItem {
  type: 'video'
  duration: number
  thumbnail_url: string
}

export interface AdminUser {
  id: string
  email: string
  name?: string
  role: 'admin' | 'super_admin'
  createdAt: string
}
