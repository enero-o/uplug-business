import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { authApi } from '../../services/api'

export function Login() {
  const [email, setEmail] = useState('')
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
      const res = await authApi.login({ email, password })
      localStorage.setItem('auth_token', res.token)
      localStorage.setItem('user_profile', JSON.stringify(res))
      
      const onboarded = !!res.businessProfile
      setAuth(res.token, { name: res.email.split('@')[0], email: res.email }, onboarded)
      setOnboarded(onboarded)
      
      if (onboarded) {
        navigate('/', { replace: true })
      } else {
        navigate('/onboarding', { replace: true })
      }
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-surface font-sans">
      {/* Left: Branding Panel */}
      <div className="relative hidden w-full max-w-[520px] lg:flex flex-col justify-between p-12 overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 bg-primary-dark z-0" />
        <div className="absolute inset-0 bg-gradient-mesh-green z-10 opacity-40 animate-pulse" />
        
        <div className="relative z-20">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md shadow-premium border border-white/20">
            <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="mt-10 text-4xl font-display font-bold text-white tracking-tight leading-tight">
            Compliance made <span className="text-accent">effortless.</span>
          </h2>
          <p className="mt-6 text-mint/80 text-lg max-w-sm font-light">
            Empowering businesses with seamless E-Invoicing solutions for FIRS and beyond.
          </p>
        </div>

        <div className="relative z-20 space-y-6">
          <div className="h-1 w-20 rounded-full bg-accent shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
          <p className="text-white/60 text-sm">
            Trusted by modern enterprises for cross-border tax compliance.
            Join the network of certified businesses today.
          </p>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex flex-1 items-center justify-center p-8 bg-surface">
        <div className="w-full max-w-[440px]">
          <div className="relative rounded-card bg-white p-10 shadow-premium border border-border overflow-hidden">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 -tr-1/4 w-32 h-32 bg-mint/20 rounded-full blur-3xl opacity-50" />
            
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-display font-bold text-primary">Welcome back</h1>
              <p className="mt-2 text-text-light font-medium">
                Enter your credentials to manage your business
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {error && (
                <div className="rounded-xl border border-red-100 bg-red-50/50 backdrop-blur-sm px-4 py-3 text-sm text-red-600 animate-slide-in">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-primary ml-1">
                  Email Address
                </label>
                <div className="relative group">
                   <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-primary placeholder-text-light/40 transition-all focus:border-accent focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/10"
                    placeholder="name@company.com"
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center opacity-0 group-focus-within:opacity-100 transition-opacity">
                    <div className="h-2 w-2 rounded-full bg-accent animate-ping" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label htmlFor="password" className="text-sm font-semibold text-primary">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-bold text-accent hover:text-accent-dark transition-colors"
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
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-primary placeholder-text-light/40 transition-all focus:border-accent focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/10"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="relative w-full overflow-hidden group rounded-xl bg-primary-vibrant py-4 text-sm font-bold text-white shadow-premium transition-all hover:bg-primary-dark hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-accent/20 disabled:opacity-70"
              >
                <div className="absolute inset-0 bg-gradient-emerald opacity-0 group-hover:opacity-20 transition-opacity" />
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Authenticating...
                    </>
                  ) : (
                    'Sign in to Dashboard'
                  )}
                </span>
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-center text-sm text-text-light font-medium">
                New to AARC Business?{' '}
                <Link to="/register" className="font-bold text-accent hover:text-accent-dark transition-colors">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
          
          <p className="mt-8 text-center text-xs text-text-light/60 font-medium">
            Secure, encrypted connection by AARC. &copy; 2026 AARC Inc.
          </p>
        </div>
      </div>
    </div>
  )
}
