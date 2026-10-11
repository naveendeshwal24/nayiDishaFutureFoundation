# Nai Disha Future Foundation – NGO Management Website

A **lightweight**, **production-ready** NGO management platform built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Supabase**.

## Project Overview

This is a scalable web application for showcasing NGO programs, projects, media galleries, impact stories, and providing a secure admin dashboard for media and content management.

### Key Features

✅ **Public Website**
- Hero sections with dynamic storytelling
- Mission & vision pages
- Program and project showcase
- Gallery and video preview sections
- Event calendar
- Success stories and testimonials
- Contact forms
- Privacy policy and terms pages

✅ **Admin Dashboard**
- Secure login (Supabase auth)
- Media Manager (upload, categorize, delete images and videos)
- Bulk operations
- Tab-based interface for gallery and video management

✅ **Enterprise Architecture**
- Feature-based modular design
- Clean Architecture principles
- SOLID compliance
- Type-safe with strict TypeScript
- Tailwind CSS for responsive, modern UI
- Framer Motion for subtle animations
- **SEO Optimized** – Meta tags, Open Graph, Twitter Cards
- **Lightweight** – Minimal dependencies, optimized bundle

---

## Tech Stack

### Frontend
- **React 19** – UI framework
- **TypeScript** – Type safety
- **Vite** – Build tool and dev server
- **React Router v7** – Client-side routing
- **Tailwind CSS** – Utility-first styling
- **React Hook Form** – Form state management
- **Zod** – Schema validation
- **TanStack Query** – Server state management
- **Framer Motion** – Animations
- **Lucide React** – Icon library
- **Supabase JS** – Backend client

### Backend / Services
- **Supabase**
  - PostgreSQL database
  - Authentication (admin login)
  - Storage (images and videos)

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to project
cd "e:\Client folder\NayiDishaFoundation"

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add Supabase credentials to .env.local
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5174` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── app/                    # Application core
│   ├── router/            # React Router configuration
│   ├── providers/         # Context providers
│   ├── layouts/           # Layout wrappers
│   ├── constants/         # Routes and config
│
├── features/              # Feature modules
│   ├── home/             # Public pages
│   ├── admin/            # Admin dashboard & media manager
│
├── components/            # Reusable UI components
│   ├── ui/               # Base components
│   ├── common/           # Feature-agnostic components
│
├── services/              # Business logic
│   ├── auth/             # Authentication
│   ├── supabase/         # Supabase client
│
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript types
├── schemas/               # Zod validation schemas
├── utils/                 # Utility functions
├── config/                # Configuration
```

---

## Environment Variables

Create `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## Admin Dashboard

Access the admin panel at `/admin/login`.

**Features:**
- Upload images and videos
- Categorize media by program type
- Drag-and-drop interface
- Bulk delete operations
- Tab-based gallery and video management

---

## Pages

- **Home** – Hero, mission, vision, stats, programs, projects, gallery, videos, testimonials
- **About** – Organization overview
- **Mission & Vision** – Detailed goals
- **Programs** – Program categories
- **Projects** – Active projects
- **Gallery** – Image showcase
- **Videos** – Video showcase
- **Events** – Event listings
- **Stories** – Impact stories
- **Contact** – Contact information
- **Privacy Policy** – Privacy terms
- **Terms & Conditions** – Usage terms
- **Admin Login** – Secure admin access
- **Admin Dashboard** – Media management
- **404** – Page not found

---

## Architecture Highlights

✅ **Clean Architecture** – Separation of concerns
✅ **SOLID Principles** – Maintainable, scalable code
✅ **Feature-Based** – Organized by feature, not by type
✅ **Type-Safe** – Strict TypeScript, no `any` types
✅ **Reusable Components** – DRY principle throughout
✅ **API Layer** – Centralized Supabase calls
✅ **Error Handling** – Comprehensive error boundaries
✅ **Performance** – Code splitting, lazy loading, memoization

---

## Future-Ready Modules

The architecture supports zero-refactor addition of:
- Blog & News Module
- Volunteer Management
- Donation System
- Event Registration
- CSR Portal
- Multi-language Support
- Mobile Application
- Advanced Admin Roles
- Notification System
- AI Chatbot
- Full-text Search
- Analytics Dashboard

---

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy on every push

### Netlify
1. Build locally: `npm run build`
2. Upload `dist/` folder
3. Configure environment variables

### Docker
```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 5174
CMD ["npm", "run", "preview"]
```

---

## Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## Key Design Principles

- **Single Responsibility** – Each function/component has one job
- **DRY** – Don't repeat yourself
- **KISS** – Keep it simple
- **Type Safety** – Strict TypeScript configuration
- **Component Reusability** – Every component can be reused
- **Separation of Concerns** – UI, logic, and state separated
- **Accessibility** – WCAG compliant
- **Performance** – Optimized bundle size and load time

---

## Support

For questions or issues:
- Email: `hello@naydishafoundation.org`
- Check the documentation above

---

## Version

- **v0.1.0** – Initial release
- **Built:** July 2026
- **React:** 19
- **Node:** 18+

**Happy coding! 🚀**
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
