import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Load auth debug utilities for testing (dev only, excluded from production bundle)
if (import.meta.env.DEV) {
  void import('./services/auth/authDebug')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
