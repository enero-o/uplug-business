import { useState } from 'react'
import { Link } from 'react-router-dom'
import { authApi } from '../../services/api'

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await authApi.requestPasswordReset(email)
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed. Try again or contact support.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="auth-panel-left hidden w-full max-w-[480px] flex-col justify-between p-10 lg:flex">
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 shadow-lg">
            <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h2 className="auth-panel-text mt-8 text-2xl font-bold tracking-tight">
            Reset your password
          </h2>
          <p className="auth-panel-text-muted mt-2 text-base">
            Enter your email and we’ll send you a link to set a new password.
          </p>
        </div>
        <p className="auth-panel-text-muted text-sm">
          <Link to="/login" className="font-medium text-white underline underline-offset-2 hover:no-underline">
            Back to sign in
          </Link>
        </p>
      </div>

      <div className="auth-panel-right flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-[400px]">
          <div className="rounded-2xl border border-gov-border bg-white p-8 shadow-xl">
            {sent ? (
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gov-surface">
                  <svg className="h-7 w-7 text-gov-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h1 className="mt-4 text-xl font-bold text-gov-text">Check your email</h1>
                <p className="mt-2 text-sm text-gov-text-muted">
                  If an account exists for <strong>{email}</strong>, we’ve sent a password reset link.
                </p>
                <Link
                  to="/login"
                  className="mt-6 inline-block rounded-lg bg-gov-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-gov-primary-dark"
                >
                  Back to sign in
                </Link>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gov-text">Forgot password?</h1>
                <p className="mt-1 text-sm text-gov-text-muted">
                  Enter your account email to receive a reset link.
                </p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
                      {error}
                    </div>
                  )}
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gov-text">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-lg border border-gov-border bg-white px-3 py-2.5 text-gov-text placeholder-gov-text-muted/60 focus:border-gov-accent focus:outline-none focus:ring-2 focus:ring-gov-accent/20"
                      placeholder="you@company.com"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-gov-primary py-3 text-sm font-semibold text-white shadow-md hover:bg-gov-primary-dark focus:outline-none focus:ring-2 focus:ring-gov-accent focus:ring-offset-2 disabled:opacity-60"
                  >
                    {loading ? 'Sending…' : 'Send reset link'}
                  </button>
                </form>
                <p className="mt-6 text-center text-sm text-gov-text-muted">
                  <Link to="/login" className="font-medium text-gov-accent hover:text-gov-primary">
                    Back to sign in
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
