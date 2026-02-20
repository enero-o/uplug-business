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
    } catch (err: any) {
      setError(err.message || 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-surface font-sans">
      <div className="relative hidden w-full max-w-[520px] lg:flex flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 bg-primary-dark z-0" />
        <div className="absolute inset-0 bg-gradient-mesh-green z-10 opacity-30" />
        
        <div className="relative z-20">
          <Link to="/login" className="flex items-center gap-2 text-mint/60 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            Back to login
          </Link>
          <h2 className="mt-20 text-4xl font-display font-bold text-white tracking-tight leading-loose">
            Forgot your <span className="text-accent underline decoration-accent/30 underline-offset-8">password?</span>
          </h2>
          <p className="mt-6 text-mint/80 text-lg max-w-sm font-light">
            Don't worry, we'll send you instructions to reset it safely.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-8 bg-surface">
        <div className="w-full max-w-[440px]">
          <div className="relative rounded-card bg-white p-10 shadow-premium border border-border overflow-hidden text-center">
            {sent ? (
              <div className="animate-fade-in">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-mint text-accent shadow-premium mb-8">
                  <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-display font-bold text-primary">Check your Inbox</h1>
                <p className="mt-4 text-text-light font-medium leading-relaxed">
                  We've sent a recovery link to <span className="text-primary font-bold">{email}</span>. Click it to reset your credentials.
                </p>
                <Link
                  to="/login"
                  className="mt-10 block w-full rounded-xl bg-primary-vibrant py-4 text-sm font-bold text-white shadow-premium hover:bg-primary-dark transition-all"
                >
                  Return to Sign In
                </Link>
                <button 
                  onClick={() => setSent(false)}
                  className="mt-4 text-xs font-bold text-text-light hover:text-accent transition-colors"
                >
                  Didn't get the email? Try again
                </button>
              </div>
            ) : (
              <>
                <div className="mb-10">
                  <h1 className="text-3xl font-display font-bold text-primary">Recover Password</h1>
                  <p className="mt-2 text-text-light font-medium">
                    Enter your email to receive a secure link
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 text-left relative z-10">
                  {error && (
                    <div className="rounded-xl border border-red-100 bg-red-50/50 px-4 py-3 text-sm text-red-600">
                      {error}
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-primary ml-1">
                      Business Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-primary placeholder-text-light/40 transition-all focus:border-accent focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/10"
                      placeholder="name@company.com"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-primary-vibrant py-4 text-sm font-bold text-white shadow-premium transition-all hover:bg-primary-dark hover:-translate-y-0.5 disabled:opacity-70"
                  >
                    {loading ? 'Sending link...' : 'Send Recovery Link'}
                  </button>
                </form>

                <div className="mt-10 pt-8 border-t border-border">
                  <Link to="/login" className="text-sm font-bold text-accent hover:text-accent-dark transition-colors">
                    Back to Sign In
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
