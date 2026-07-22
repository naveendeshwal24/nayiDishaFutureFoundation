# Database Schema Documentation

## Project: Nayi Disha Foundation
**Database:** Supabase  
**Project ID:** ynkalunthvomjjgcbcmj  
**API URL:** https://ynkalunthvomjjgcbcmj.supabase.co

---

## 📋 Tables Overview

### 1. media_categories
Stores predefined categories for organizing media content.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `name` | TEXT | Unique category name |
| `description` | TEXT | Category description |
| `created_at` | TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

**Default Categories:**
- Education
- Health
- Empowerment
- Environment
- Events
- Projects
- Stories

---

### 2. media_items
Stores metadata for all uploaded media files (images and videos).

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `title` | TEXT | Media title (required) |
| `description` | TEXT | Media description |
| `type` | TEXT | 'image' or 'video' (required) |
| `category_id` | UUID | Foreign key to media_categories |
| `file_path` | TEXT | Path in storage bucket (e.g., 'education/image-1.jpg') |
| `file_size` | INTEGER | File size in bytes |
| `mime_type` | TEXT | MIME type (e.g., 'image/jpeg', 'video/mp4') |
| `duration` | INTEGER | Duration in seconds (for videos) |
| `thumbnail_url` | TEXT | Thumbnail URL (for videos) |
| `is_featured` | BOOLEAN | Whether this media is featured |
| `uploaded_by` | UUID | Foreign key to auth.users |
| `uploaded_at` | TIMESTAMP | Upload timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

---

## 🗄️ Storage Buckets

Create two public buckets in Supabase Storage:

### 1. `images` (Public)
Store all image files here.
- Subdirectories by category: `education/`, `health/`, etc.
- Example path: `images/education/photo-2026.jpg`

### 2. `videos` (Public)
Store all video files here.
- Subdirectories by category: `education/`, `health/`, etc.
- Example path: `videos/projects/promo-2026.mp4`

---

## 🔐 Row Level Security (RLS)

### Policies Applied:

**media_items:**
- ✅ **SELECT**: Public read access (anyone can view)
- ✅ **INSERT**: Authenticated users only
- ✅ **UPDATE**: Only by media owner
- ✅ **DELETE**: Only by media owner

**media_categories:**
- ✅ **SELECT**: Public read access (anyone can view)

---

## 📊 Database Relationships

```
media_categories (1)
    ↓
    └─── media_items (Many)
         └─── auth.users (uploaded_by)
```

---

## 🚀 How to Use

### 1. Setup SQL Schema
- Copy content from `database/schema.sql`
- Paste in Supabase Dashboard → SQL Editor
- Click "RUN"

### 2. Create Storage Buckets
- Go to Supabase Dashboard → Storage
- Create `images` bucket (Public)
- Create `videos` bucket (Public)

### 3. Upload Media
```typescript
// Use the service functions in src/services/supabase/storage.ts
import { uploadFile, saveMediaMetadata } from './services/supabase/storage'

// Upload file to storage
const fileData = await uploadFile('images', 'education/photo.jpg', file)

// Save metadata to database
const mediaItem = await saveMediaMetadata({
  title: 'Education Photo',
  description: 'Our education program in action',
  type: 'image',
  category_id: 'category-uuid',
  file_path: 'education/photo.jpg',
  file_size: 2048,
  mime_type: 'image/jpeg',
  uploaded_by: 'user-uuid'
})
```

### 4. Query Media
```typescript
import { getMediaItems, getMediaItem } from './services/supabase/storage'

// Get all images in Education category
const items = await getMediaItems({ 
  type: 'image', 
  category_id: 'education-uuid' 
})

// Get single media item
const item = await getMediaItem('media-uuid')
```

---

## 📁 File Structure

```
NayiDishaFoundation/
├── database/
│   ├── schema.sql          ← SQL table definitions
│   └── README.md           ← This file
├── src/
│   ├── config/
│   │   └── supabase.ts     ← Supabase client config
│   ├── services/
│   │   └── supabase/
│   │       └── storage.ts  ← Storage & database functions
│   ├── types/
│   │   └── models.ts       ← TypeScript interfaces
│   └── features/
│       └── admin/
│           └── MediaUploadForm.tsx ← Upload UI
└── .env.local              ← Environment variables
```

---

## ✅ Checklist

- [ ] Create SQL schema in Supabase
- [ ] Create `images` storage bucket
- [ ] Create `videos` storage bucket
- [ ] Test file upload
- [ ] Test metadata retrieval
- [ ] Setup admin authentication
- [ ] Deploy to production

---

## 🔗 Useful Links

- **Supabase Dashboard:** https://app.supabase.com/
- **Project ID:** ynkalunthvomjjgcbcmj
- **API URL:** https://ynkalunthvomjjgcbcmj.supabase.co
- **Documentation:** https://supabase.com/docs

---

**Last Updated:** 2026-07-18
