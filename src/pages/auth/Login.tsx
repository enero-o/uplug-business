import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { authApi } from '../../services/api'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)
  const setOnboarded = useAuthStore((s) => s.setOnboarded)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await authApi.login(username, password)
      const token = (res as { token?: string }).token ?? ''
      const user = (res as { user?: { name: string; email: string } }).user ?? { name: username, email: username }
      const onboarded = (res as { onboarded?: boolean }).onboarded ?? true
      if (token) localStorage.setItem('auth_token', token)
      setAuth(token, user, onboarded)
      setOnboarded(onboarded)
      if (onboarded) {
        navigate('/', { replace: true })
      } else {
        navigate('/onboarding', { replace: true })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left: branding panel - use auth-panel-left so gov green is always applied */}
      <div className="auth-panel-left hidden w-full max-w-[480px] flex-col justify-between p-10 lg:flex">
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 shadow-lg">
            <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="auth-panel-text mt-8 text-2xl font-bold tracking-tight">
            Uplug Business
          </h2>
          <p className="auth-panel-text-muted mt-2 text-base">
            E-Invoicing dashboard for FIRS-compliant businesses. Issue, track, and sync invoices in one place.
          </p>
        </div>
        <div className="space-y-4">
          <div className="h-px w-16 bg-white/30" />
          <p className="auth-panel-text-muted text-sm">
            Secure sign-in with your business credentials. New to Uplug?{' '}
            <Link to="/register" className="font-medium text-white underline underline-offset-2 hover:no-underline">
              Get started
            </Link>
          </p>
        </div>
      </div>

      {/* Right: form */}
      <div className="auth-panel-right flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-[400px]">
          <div className="rounded-2xl border border-gov-border bg-white p-8 shadow-xl">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gov-text">Sign in</h1>
              <p className="mt-1 text-sm text-gov-text-muted">
                Enter your username or email and password.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
                  {error}
                </div>
              )}
              <div>
                <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-gov-text">
                  Username / Email
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gov-border bg-white px-3 py-2.5 text-gov-text placeholder-gov-text-muted/60 focus:border-gov-accent focus:outline-none focus:ring-2 focus:ring-gov-accent/20"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gov-text">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-gov-accent hover:text-gov-primary"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gov-border bg-white px-3 py-2.5 text-gov-text placeholder-gov-text-muted/60 focus:border-gov-accent focus:outline-none focus:ring-2 focus:ring-gov-accent/20"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-gov-primary py-3 text-sm font-semibold text-white shadow-md hover:bg-gov-primary-dark focus:outline-none focus:ring-2 focus:ring-gov-accent focus:ring-offset-2 disabled:opacity-60"
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-gov-text-muted">
              Don’t have an account?{' '}
              <Link to="/register" className="font-medium text-gov-accent hover:text-gov-primary">
                Register your business
              </Link>
            </p>
          </div>
          <p className="mt-6 text-center text-xs text-gov-text-muted/80">
            Use your portal credentials. Backend may run on port 8080.
          </p>
        </div>
      </div>
    </div>
  )
}
