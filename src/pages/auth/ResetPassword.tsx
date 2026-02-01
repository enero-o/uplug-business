import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { authApi } from '../../services/api'

export function ResetPassword() {
  const [searchParams] = useSearchParams()
  const tokenFromUrl = searchParams.get('token') ?? ''
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    const token = tokenFromUrl || (document.querySelector('input[name="token"]') as HTMLInputElement)?.value
    if (!token) {
      setError('Missing reset token. Use the link from your email.')
      return
    }
    setLoading(true)
    try {
      await authApi.resetPassword(token, password)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reset failed. The link may have expired.')
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="auth-panel-text mt-8 text-2xl font-bold tracking-tight">
            Set new password
          </h2>
          <p className="auth-panel-text-muted mt-2 text-base">
            Choose a strong password for your business account.
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
            {success ? (
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gov-surface">
                  <svg className="h-7 w-7 text-gov-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="mt-4 text-xl font-bold text-gov-text">Password updated</h1>
                <p className="mt-2 text-sm text-gov-text-muted">
                  You can now sign in with your new password.
                </p>
                <Link
                  to="/login"
                  className="mt-6 inline-block rounded-lg bg-gov-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-gov-primary-dark"
                >
                  Sign in
                </Link>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gov-text">New password</h1>
                <p className="mt-1 text-sm text-gov-text-muted">
                  Enter your new password below. Use at least 8 characters.
                </p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  {!tokenFromUrl && (
                    <input type="hidden" name="token" value="" readOnly />
                  )}
                  {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
                      {error}
                    </div>
                  )}
                  <div>
                    <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gov-text">
                      New password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                      className="w-full rounded-lg border border-gov-border bg-white px-3 py-2.5 text-gov-text placeholder-gov-text-muted/60 focus:border-gov-accent focus:outline-none focus:ring-2 focus:ring-gov-accent/20"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm" className="mb-1.5 block text-sm font-medium text-gov-text">
                      Confirm password
                    </label>
                    <input
                      id="confirm"
                      type="password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      required
                      minLength={8}
                      className="w-full rounded-lg border border-gov-border bg-white px-3 py-2.5 text-gov-text placeholder-gov-text-muted/60 focus:border-gov-accent focus:outline-none focus:ring-2 focus:ring-gov-accent/20"
                      placeholder="••••••••"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-gov-primary py-3 text-sm font-semibold text-white shadow-md hover:bg-gov-primary-dark focus:outline-none focus:ring-2 focus:ring-gov-accent focus:ring-offset-2 disabled:opacity-60"
                  >
                    {loading ? 'Updating…' : 'Update password'}
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
