-- Nayi Disha Foundation - Database Schema
-- Created: 2026-07-18
-- Database: Supabase (ynkalunthvomjjgcbcmj)

-- ============================================
-- TABLE: media_categories
-- ============================================
-- Stores predefined media categories for organizing content

CREATE TABLE IF NOT EXISTS media_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE: media_items
-- ============================================
-- Stores metadata for all uploaded media (images and videos)

CREATE TABLE IF NOT EXISTS media_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  category_id UUID REFERENCES media_categories(id) ON DELETE SET NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  duration INTEGER,
  thumbnail_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INSERT: Default Categories
-- ============================================

INSERT INTO media_categories (name, description) VALUES
  ('Education', 'Educational materials and resources'),
  ('Health', 'Health and wellness related content'),
  ('Empowerment', 'Community empowerment initiatives'),
  ('Environment', 'Environmental conservation projects'),
  ('Events', 'Event coverage and updates'),
  ('Projects', 'Project highlights and progress'),
  ('Stories', 'Success stories and testimonials')
ON CONFLICT DO NOTHING;

-- ============================================
-- INDEXES: Performance Optimization
-- ============================================

CREATE INDEX IF NOT EXISTS idx_media_items_category_id ON media_items(category_id);
CREATE INDEX IF NOT EXISTS idx_media_items_type ON media_items(type);
CREATE INDEX IF NOT EXISTS idx_media_items_uploaded_by ON media_items(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_media_items_created_at ON media_items(uploaded_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS): Enable
-- ============================================

ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_categories ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLICIES: media_items
-- ============================================

-- Policy 1: Allow public read access
CREATE POLICY "Allow public read access to media_items" 
  ON media_items FOR SELECT 
  USING (true);

-- Policy 2: Allow authenticated users to insert
CREATE POLICY "Allow authenticated users to insert media_items" 
  ON media_items FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Policy 3: Allow users to update their own media
CREATE POLICY "Allow users to update their own media" 
  ON media_items FOR UPDATE 
  USING (auth.uid() = uploaded_by);

-- Policy 4: Allow users to delete their own media
CREATE POLICY "Allow users to delete their own media" 
  ON media_items FOR DELETE 
  USING (auth.uid() = uploaded_by);

-- ============================================
-- POLICIES: media_categories
-- ============================================

-- Policy: Allow public read access to categories
CREATE POLICY "Allow public read access to media_categories" 
  ON media_categories FOR SELECT 
  USING (true);

-- ============================================
-- END OF SCHEMA
-- ============================================
