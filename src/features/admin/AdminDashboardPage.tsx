import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MediaUploadForm } from './MediaUploadForm'
import { MediaList } from './MediaList'
import { getCurrentAdmin, adminLogout } from '../../services/auth/admin'
import { useToast } from '../../components/ui/Toast'

interface AdminUser {
  email?: string
  user_metadata?: {
    name?: string
  }
}

export function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'gallery' | 'projects' | 'videos'>('gallery')
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const navigate = useNavigate()
  const { success } = useToast()

  useEffect(() => {
    const loadAdmin = async () => {
      try {
        const user = await getCurrentAdmin()
        setAdminUser(user as AdminUser)
      } catch (error) {
        console.error('Failed to load admin:', error)
        navigate('/admin/login')
      }
    }

    loadAdmin()
  }, [navigate])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await adminLogout()
      success('Logged out successfully')
      // Clear all auth state
      setTimeout(() => {
        navigate('/admin/login')
      }, 500)
    } catch (error) {
      console.error('Logout failed:', error)
      alert('Failed to logout')
      setIsLoggingOut(false)
    }
  }

  return (
    <section className="mx-auto max-w-3xl space-y-3 px-3 py-4">
      <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-3 ring-1 ring-blue-100">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg ring-1 ring-blue-100">
            {adminUser?.email && (
              <div className="text-right">
                <p className="text-xs text-slate-500">Logged in as</p>
                <p className="text-xs font-semibold text-slate-900">{adminUser.email}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1 rounded text-xs font-semibold transition disabled:opacity-50"
            >
              {isLoggingOut ? '...' : 'Logout'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-1 rounded-lg bg-white p-1 ring-1 ring-slate-200 shadow-sm">
        <button
          onClick={() => setActiveTab('gallery')}
          className={`flex-1 rounded px-3 py-2 text-xs font-semibold transition ${
            activeTab === 'gallery'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          🖼️ Gallery
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex-1 rounded px-3 py-2 text-xs font-semibold transition ${
            activeTab === 'projects'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          🏗️ Projects
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`flex-1 rounded px-3 py-2 text-xs font-semibold transition ${
            activeTab === 'videos'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          🎬 Videos
        </button>
      </div>

      <MediaUploadForm />

      {activeTab === 'gallery' && <MediaList type="image" excludeCategory="Projects" label="Gallery Images" />}
      {activeTab === 'projects' && <MediaList type="image" categoryFilter="Projects" label="Project Images" />}
      {activeTab === 'videos' && <MediaList type="video" label="Videos" />}
    </section>
  )
}
