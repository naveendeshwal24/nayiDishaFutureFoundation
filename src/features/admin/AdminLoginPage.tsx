import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SectionHeading } from '../../components/ui/SectionHeading'
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
        alert('Signup successful! Please check your email to confirm your account, then login.')
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
    <section className="mx-auto max-w-xl space-y-8 rounded-3xl bg-white p-10 shadow-sm ring-1 ring-slate-200">
      <SectionHeading
        title={isSignUp ? 'Create Admin Account' : 'Admin Login'}
        description={isSignUp ? 'Create a new admin account to manage media and content.' : 'Sign in to manage media, stories, and program content.'}
      />

      {apiError && (
        <div className="rounded-2xl bg-red-50 p-4 ring-1 ring-red-200">
          <p className="text-sm text-red-700">{apiError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
            placeholder="admin@foundation.org"
          />
          {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            {...register('password')}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
            placeholder="••••••••"
          />
          {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
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
    </section>
  )
}

