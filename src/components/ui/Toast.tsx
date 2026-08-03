import { useState, useEffect } from 'react'

export type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

const toastStore: { listeners: Set<Function>; toasts: Toast[] } = {
  listeners: new Set(),
  toasts: [],
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const listener = () => setToasts([...toastStore.toasts])
    toastStore.listeners.add(listener)
    return () => void toastStore.listeners.delete(listener)
  }, [])

  return {
    success: (message: string) => addToast(message, 'success'),
    error: (message: string) => addToast(message, 'error'),
    info: (message: string) => addToast(message, 'info'),
    toasts,
    remove: (id: string) => removeToast(id),
  }
}

function addToast(message: string, type: ToastType) {
  const id = Math.random().toString(36)
  const toast = { id, message, type }
  toastStore.toasts.push(toast)
  toastStore.listeners.forEach((listener) => listener())

  setTimeout(() => removeToast(id), 3000)
}

function removeToast(id: string) {
  toastStore.toasts = toastStore.toasts.filter((t) => t.id !== id)
  toastStore.listeners.forEach((listener) => listener())
}

export function ToastContainer() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-lg px-4 py-3 text-white shadow-lg animate-in fade-in slide-in-from-top-2 ${
            toast.type === 'success'
              ? 'bg-green-600'
              : toast.type === 'error'
                ? 'bg-red-600'
                : 'bg-blue-600'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">
              {toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'}
            </span>
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
