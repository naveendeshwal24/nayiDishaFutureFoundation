import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from '../layouts/AppLayout'
import { AppRoutes } from '../constants/routes'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { HomePage } from '../../features/home/HomePage'
import { AboutPage } from '../../features/home/AboutPage'
import { MissionVisionPage } from '../../features/home/MissionVisionPage'
import { ProgramsPage } from '../../features/home/ProgramsPage'
import { ProjectsPage } from '../../features/home/ProjectsPage'
import { GalleryPage } from '../../features/home/GalleryPage'
import { VideosPage } from '../../features/home/VideosPage'
import { EventsPage } from '../../features/home/EventsPage'
import { StoriesPage } from '../../features/home/StoriesPage'
import { ContactPage } from '../../features/home/ContactPage'
import { PrivacyPage } from '../../features/home/PrivacyPage'
import { TermsPage } from '../../features/home/TermsPage'
import { AdminLoginPage } from '../../features/admin/AdminLoginPage'
import { AdminDashboardPage } from '../../features/admin/AdminDashboardPage'
import { NotFoundPage } from '../../features/home/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: AppRoutes.home, element: <HomePage /> },
      { path: AppRoutes.about, element: <AboutPage /> },
      { path: AppRoutes.mission, element: <MissionVisionPage /> },
      { path: AppRoutes.programs, element: <ProgramsPage /> },
      { path: AppRoutes.projects, element: <ProjectsPage /> },
      { path: AppRoutes.gallery, element: <GalleryPage /> },
      { path: AppRoutes.videos, element: <VideosPage /> },
      { path: AppRoutes.events, element: <EventsPage /> },
      { path: AppRoutes.stories, element: <StoriesPage /> },
      { path: AppRoutes.contact, element: <ContactPage /> },
      { path: AppRoutes.privacy, element: <PrivacyPage /> },
      { path: AppRoutes.terms, element: <TermsPage /> },
      { path: AppRoutes.login, element: <AdminLoginPage /> },
      {
        path: AppRoutes.admin,
        element: (
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        ),
      },
      { path: AppRoutes.notFound, element: <NotFoundPage /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
