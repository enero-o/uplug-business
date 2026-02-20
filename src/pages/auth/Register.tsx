import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../../services/api'

export function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState(1) // 1: Email, 2: OTP & Password
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleInitiate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await authApi.initiateSetup(email)
      setStep(2)
    } catch (err: any) {
      setError(err.message || 'Failed to send verification email')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await authApi.register({
        email,
        password,
        otp,
        entityRole: 'BUSINESS'
      })
      // After registration, usually login automatically or redirect to login
      navigate('/login', { state: { message: 'Account created successfully! Please sign in.' } })
    } catch (err: any) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-surface font-sans">
      {/* Left: Branding Panel */}
      <div className="relative hidden w-full max-w-[520px] lg:flex flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 bg-primary-dark z-0" />
        <div className="absolute inset-0 bg-gradient-mesh-green z-10 opacity-40 animate-pulse" />
        
        <div className="relative z-20">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md shadow-premium border border-white/20">
            <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="mt-10 text-4xl font-display font-bold text-white tracking-tight leading-tight">
            Start your journey with <span className="text-accent">Uplug.</span>
          </h2>
          <p className="mt-6 text-mint/80 text-lg max-w-sm font-light">
            Certify your business for international and domestic E-Invoicing standards in minutes.
          </p>
        </div>

        <div className="relative z-20 space-y-6">
          <div className="h-1 w-20 rounded-full bg-accent shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
          <p className="text-white/60 text-sm">
            FIRS compliant. Global ready. 
            Join 5,000+ businesses automating their tax reporting.
          </p>
        </div>
      </div>

      {/* Right: Register Form */}
      <div className="flex flex-1 items-center justify-center p-8 bg-surface">
        <div className="w-full max-w-[440px]">
          <div className="relative rounded-card bg-white p-10 shadow-premium border border-border overflow-hidden">
            <div className="absolute top-0 right-0 -tr-1/4 w-32 h-32 bg-accent/10 rounded-full blur-3xl opacity-50" />
            
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-display font-bold text-primary">
                {step === 1 ? 'Create account' : 'Verify email'}
              </h1>
              <p className="mt-2 text-text-light font-medium">
                {step === 1 ? 'Get started with your business email' : `We sent a code to ${email}`}
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-xl border border-red-100 bg-red-50/50 backdrop-blur-sm px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleInitiate} className="space-y-6 relative z-10">
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
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-primary focus:border-accent focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all"
                    placeholder="name@company.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-primary-vibrant py-4 text-sm font-bold text-white shadow-premium transition-all hover:bg-primary-dark hover:-translate-y-0.5 disabled:opacity-70"
                >
                  {loading ? 'Sending code...' : 'Continue'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label htmlFor="otp" className="text-sm font-semibold text-primary ml-1">
                    Verification Code (OTP)
                  </label>
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength={6}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-primary tracking-[0.5em] text-center font-bold focus:border-accent focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all"
                    placeholder="000000"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-semibold text-primary ml-1">
                    Create Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-primary focus:border-accent focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all"
                    placeholder="••••••••"
                  />
                  <p className="text-[10px] text-text-light/80 mt-1 px-1">
                    Must be 8-15 chars, with upper, lower, number and special char.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-accent py-4 text-sm font-bold text-white shadow-premium transition-all hover:bg-accent-dark hover:-translate-y-0.5 disabled:opacity-70"
                >
                  {loading ? 'Creating account...' : 'Complete Registration'}
                </button>
                
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-sm font-bold text-text-light hover:text-primary transition-colors"
                >
                  Back to email
                </button>
              </form>
            )}

            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-center text-sm text-text-light font-medium">
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-accent hover:text-accent-dark transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
