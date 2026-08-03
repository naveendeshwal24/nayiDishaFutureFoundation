import { supabase } from '../../config/supabase'
import type { MediaItem } from '../../types/models'

/**
 * Get the full public URL for a file in Supabase storage
 */
export function getStorageUrl(bucket: string, path: string): string {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`
}

/**
 * Upload a file to Supabase storage
 */
export async function uploadFile(bucket: string, path: string, file: File) {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: true,
  })

  if (error) throw error
  return data
}

/**
 * Delete a file from Supabase storage
 */
export async function deleteFile(bucket: string, path: string) {
  const { error } = await supabase.storage.from(bucket).remove([path])
  if (error) throw error
}

/**
 * Save media metadata to database
 */
export async function saveMediaMetadata(mediaItem: Omit<MediaItem, 'id' | 'uploaded_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('media_items')
    .insert([mediaItem])
    .select()
    .single()

  if (error) throw error
  return data as MediaItem
}

/**
 * Get all media items with optional filtering
 */
export async function getMediaItems(filters?: { type?: 'image' | 'video'; category_id?: string }) {
  let query = supabase.from('media_items').select('*, media_categories(*)')

  if (filters?.type) {
    query = query.eq('type', filters.type)
  }
  if (filters?.category_id) {
    query = query.eq('category_id', filters.category_id)
  }

  const { data, error } = await query.order('uploaded_at', { ascending: false })

  if (error) throw error
  return data as MediaItem[]
}

/**
 * Get a single media item by ID
 */
export async function getMediaItem(id: string) {
  const { data, error } = await supabase
    .from('media_items')
    .select('*, media_categories(*)')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as MediaItem
}

/**
 * Update media metadata
 */
export async function updateMediaItem(id: string, updates: Partial<Omit<MediaItem, 'id' | 'uploaded_at'>>) {
  const { data, error } = await supabase
    .from('media_items')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as MediaItem
}

/**
 * Delete media item metadata (call before deleting from storage)
 */
export async function deleteMediaItem(id: string) {
  const { error } = await supabase.from('media_items').delete().eq('id', id)

  if (error) throw error
}

/**
 * Get all categories
 */
export async function getMediaCategories() {
  const { data, error } = await supabase.from('media_categories').select('*').order('name')

  if (error) throw error
  return data
}
