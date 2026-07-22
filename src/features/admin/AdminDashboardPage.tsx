import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { MediaUploadForm } from './MediaUploadForm'
import { MediaList } from './MediaList'
import { getCurrentAdmin, adminLogout } from '../../services/auth/admin'

interface AdminUser {
  email?: string
  user_metadata?: {
    name?: string
  }
}

export function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'gallery' | 'videos'>('gallery')
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const loadAdmin = async () => {
      try {
        const user = await getCurrentAdmin()
        setAdminUser(user as AdminUser)
      } catch (error) {
        console.error('Failed to load admin:', error)
      }
    }

    loadAdmin()
  }, [])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await adminLogout()
      navigate('/admin/login')
    } catch (error) {
      console.error('Logout failed:', error)
      alert('Failed to logout')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <SectionHeading title="Admin Dashboard" description="Manage media, content, and NGO resources through this secure interface." />
        <div className="flex items-center gap-4">
          {adminUser?.email && (
            <span className="text-sm text-slate-600">
              Logged in as: <strong>{adminUser.email}</strong>
            </span>
          )}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="rounded-full bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-sm font-semibold transition disabled:bg-red-400"
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>

      <div className="flex gap-4 rounded-2xl bg-white p-2 ring-1 ring-slate-200">
        <button
          onClick={() => setActiveTab('gallery')}
          className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
            activeTab === 'gallery'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Gallery Images
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
            activeTab === 'videos'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Videos
        </button>
      </div>

      <MediaUploadForm />

      {activeTab === 'gallery' && <MediaList type="image" />}
      {activeTab === 'videos' && <MediaList type="video" />}

      <div className="rounded-3xl bg-blue-50 p-8 ring-1 ring-blue-200">
        <p className="text-sm text-blue-900">
          <strong>Future Features:</strong> Bulk renaming, batch categorization, advanced search, image optimization, video transcoding, and analytics dashboard will be added without altering the current architecture.
        </p>
      </div>
    </section>
  )
}
