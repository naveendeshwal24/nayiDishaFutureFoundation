import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { adminLogin, adminSignup } from '../../services/auth/admin'

const authSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type AuthFormValues = z.infer<typeof authSchema>

export function AdminLoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
  })

  const onSubmit = async (data: AuthFormValues) => {
    setIsSubmitting(true)
    setApiError(null)

    try {
      if (isSignUp) {
        await adminSignup(data.email, data.password)
        setApiError(null)
        setSuccessMessage('Signup successful! Please check your email to confirm your account, then login.')
        setIsSignUp(false)
        reset()
      } else {
        await adminLogin(data.email, data.password)
        navigate('/admin')
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      setApiError(errorMessage)
      console.error('Auth error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    setApiError(null)
    reset()
  }

  return (
    <section className="mx-auto max-w-md space-y-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 shadow-lg ring-1 ring-slate-200">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          {isSignUp ? 'Create Admin Account' : 'Admin Login'}
        </h1>
        <p className="text-sm text-slate-600">
          {isSignUp ? 'Create a new admin account to manage media and content.' : 'Sign in to manage media, stories, and program content.'}
        </p>
      </div>

      {apiError && (
        <div className="rounded-xl bg-red-50 p-4 border-l-4 border-red-600 shadow-sm">
          <p className="text-sm font-medium text-red-900">{apiError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-2.5 block text-sm font-semibold text-slate-700">Email Address</label>
          <input
            type="email"
            {...register('email')}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="admin@foundation.org"
          />
          {errors.email && <p className="mt-2 text-sm font-medium text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label className="mb-2.5 block text-sm font-semibold text-slate-700">Password</label>
          <input
            type="password"
            {...register('password')}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="••••••••"
          />
          {errors.password && <p className="mt-2 text-sm font-medium text-red-600">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white transition shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {isSubmitting ? (isSignUp ? 'Creating Account...' : 'Signing in...') : isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs text-slate-500">OR</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <button
        type="button"
        onClick={toggleMode}
        className="inline-flex w-full justify-center rounded-full border-2 border-slate-200 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
      >
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </button>

      <div className="rounded-3xl bg-blue-50 p-4 ring-1 ring-blue-200">
        <p className="text-xs text-blue-900">
          <strong>Note:</strong> After signing up, you'll receive a confirmation email. Verify your email to activate your admin account and login.
        </p>
      </div>

      {successMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                <span className="text-lg text-green-600">✓</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Success</h3>
            </div>
            <p className="mb-6 text-sm text-slate-600">{successMessage}</p>
            <button
              type="button"
              onClick={() => setSuccessMessage(null)}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2.5 text-sm font-semibold text-white transition shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

