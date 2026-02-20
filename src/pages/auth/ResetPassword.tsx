import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { authApi } from '../../services/api'

export function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setError('')
    setLoading(true)
    try {
      await authApi.resetPassword(token || '', password)
      navigate('/login', { state: { message: 'Password reset successful! Please sign in.' } })
    } catch (err: any) {
      setError(err.message || 'Reset failed')
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-8">
        <div className="bg-white rounded-card shadow-premium border border-border p-10 text-center max-w-sm">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <h1 className="text-2xl font-display font-bold text-primary">Invalid Token</h1>
          <p className="mt-2 text-text-light font-medium">The reset link is missing or has expired. Please request a new one.</p>
          <Link to="/forgot-password" className="mt-8 block w-full rounded-xl bg-primary-vibrant py-4 text-sm font-bold text-white shadow-premium transition-all hover:bg-primary-dark">Request New Link</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-surface font-sans">
      <div className="relative hidden w-full max-w-[520px] lg:flex flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 bg-primary-dark z-0" />
        <div className="absolute inset-0 bg-gradient-mesh-green z-10 opacity-30" />
        
        <div className="relative z-20">
          <h2 className="mt-20 text-4xl font-display font-bold text-white tracking-tight leading-loose">
            Secure your <span className="text-accent underline decoration-accent/30 underline-offset-8">account.</span>
          </h2>
          <p className="mt-6 text-mint/80 text-lg max-w-sm font-light">
            Choose a strong password to protect your business data and compliance logs.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-8 bg-surface">
        <div className="w-full max-w-[440px]">
          <div className="relative rounded-card bg-white p-10 shadow-premium border border-border overflow-hidden">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-display font-bold text-primary">Set New Password</h1>
              <p className="mt-2 text-text-light font-medium">Create a new secure password for your portal</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {error && (
                <div className="rounded-xl border border-red-100 bg-red-50/50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-semibold text-primary ml-1">
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-primary placeholder-text-light/40 transition-all focus:border-accent focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/10"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-semibold text-primary ml-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-primary placeholder-text-light/40 transition-all focus:border-accent focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/10"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-primary-vibrant py-4 text-sm font-bold text-white shadow-premium transition-all hover:bg-primary-dark hover:-translate-y-0.5 disabled:opacity-70"
              >
                {loading ? 'Updating password...' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
