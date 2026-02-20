import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { authApi } from '../../services/api'
import type { 
  IndustryClassification, 
  ReportingMethod, 
  ErpSolution, 
  CreateBusinessProfileRequest 
} from '../../types/api'

const steps = [
  { id: 1, title: 'Tax Identity', description: 'Verify your business TIN' },
  { id: 2, title: 'Business Profile', description: 'Industry and ERP details' },
  { id: 3, title: 'Preferences', description: 'Reporting and Notifications' },
]

export function Onboarding() {
  const [step, setStep] = useState(1)
  const [tin, setTin] = useState('')
  const [tinData, setTinData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [profile, setProfile] = useState<Partial<CreateBusinessProfileRequest>>({
    industryClassification: 'RETAIL' as IndustryClassification,
    erpSolution: 'OTHER' as ErpSolution,
    reportingMethods: 'REAL_TIME' as ReportingMethod,
  })

  const navigate = useNavigate()
  const setOnboarded = useAuthStore((s) => s.setOnboarded)

  const handleVerifyTIN = async () => {
    if (!tin.trim()) return
    setError('')
    setLoading(true)
    try {
      const res = await authApi.verifyTin(tin)
      setTinData(res)
      setProfile(prev => ({ ...prev, tinRequestId: res.id }))
      setStep(2)
    } catch (err: any) {
      setError(err.message || 'TIN verification failed')
    } finally {
      setLoading(false)
    }
  }

  const handleComplete = async () => {
    setError('')
    setLoading(true)
    try {
      await authApi.createProfile(profile as CreateBusinessProfileRequest)
      setOnboarded(true)
      navigate('/', { replace: true })
    } catch (err: any) {
      setError(err.message || 'Failed to create business profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface font-sans flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-header opacity-5 z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] z-0" />

      <div className="w-full max-w-3xl relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-display font-bold text-primary">Setup your business</h1>
          <p className="mt-3 text-text-light text-lg">Let's get your business certified for E-Invoicing</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-premium border border-border overflow-hidden">
          {/* Progress Header */}
          <div className="bg-slate-50/50 border-b border-border p-8 pb-0">
            <div className="flex justify-between items-center mb-8 px-4">
              {steps.map((s, idx) => (
                <div key={s.id} className="flex flex-col items-center gap-2 relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-subtle ${
                    step >= s.id ? 'bg-accent text-white' : 'bg-white border border-border text-text-light'
                  }`}>
                    {step > s.id ? (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : s.id}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-widest ${step >= s.id ? 'text-primary' : 'text-text-light'}`}>
                    {s.title}
                  </span>
                  {idx < steps.length - 1 && (
                    <div className="absolute top-5 left-[calc(100%+8px)] w-[calc(100vw/5)] h-[2px] bg-border -z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-10">
            {error && (
              <div className="mb-8 rounded-2xl border border-red-100 bg-red-50/50 p-4 text-sm text-red-600 flex items-center gap-3 animate-slide-in">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                {error}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center max-w-sm mx-auto">
                  <div className="w-16 h-16 bg-mint rounded-2xl flex items-center justify-center mx-auto mb-4 text-accent">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04c0 4.835 1.354 9.31 3.712 13.111L12 21.056l3.906-2.019a11.954 11.954 0 003.712-13.111z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-display font-bold text-primary">Verify your TIN</h3>
                  <p className="text-text-light mt-2">Enter your 10 or 14-digit Tax Identification Number registered with FIRS.</p>
                </div>
                
                <div className="max-w-md mx-auto relative group">
                  <input
                    type="text"
                    value={tin}
                    onChange={(e) => setTin(e.target.value)}
                    className="w-full rounded-2xl border border-border bg-surface px-6 py-5 text-xl font-bold tracking-widest text-primary focus:border-accent focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all text-center placeholder:tracking-normal placeholder:font-medium placeholder:text-text-light/30"
                    placeholder="12345678-0001"
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center">
                    {loading && <svg className="animate-spin h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>}
                  </div>
                </div>

                <div className="text-center pt-4">
                  <button
                    onClick={handleVerifyTIN}
                    disabled={loading || !tin}
                    className="px-10 py-4 bg-primary-vibrant text-white rounded-xl font-bold hover:bg-primary-dark transition-all shadow-premium disabled:opacity-50"
                  >
                    Verify & Continue
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary ml-1">Industry</label>
                    <select
                      value={profile.industryClassification}
                      onChange={(e) => setProfile({ ...profile, industryClassification: e.target.value as IndustryClassification })}
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-primary focus:border-accent focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all appearance-none cursor-pointer"
                    >
                      <option value="RETAIL">Retail & Commerce</option>
                      <option value="MANUFACTURING">Manufacturing</option>
                      <option value="FINANCE">Finance & Banking</option>
                      <option value="INFORMATION">Technology / Info</option>
                      <option value="HEALTHCARE">Healthcare</option>
                      <option value="CONSTRUCTION">Construction</option>
                      <option value="AGRICULTURE">Agriculture</option>
                      <option value="OTHER_SERVICES">Professional Services</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary ml-1">ERP Solution</label>
                    <select
                      value={profile.erpSolution}
                      onChange={(e) => setProfile({ ...profile, erpSolution: e.target.value as ErpSolution })}
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-primary focus:border-accent focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all appearance-none cursor-pointer"
                    >
                      <option value="SAGE">Sage</option>
                      <option value="SAP">SAP</option>
                      <option value="ORACLE">Oracle</option>
                      <option value="QUICKBOOKS">QuickBooks</option>
                      <option value="ZOHO">Zoho Books</option>
                      <option value="MICROSOFT_DYNAMICS">Microsoft Dynamics</option>
                      <option value="TALLY">Tally</option>
                      <option value="OTHER">Other / Custom</option>
                    </select>
                  </div>
                </div>

                <div className="bg-mint/30 rounded-2xl p-6 border border-accent/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent shadow-sm border border-accent/20">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">{tinData?.businessName || 'Business Entity'}</h4>
                      <p className="text-xs text-text-light font-medium uppercase tracking-wider">TIN: {tinData?.tin}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <button onClick={() => setStep(1)} className="px-8 py-3 text-sm font-bold text-text-light hover:text-primary transition-colors">Back</button>
                  <button onClick={() => setStep(3)} className="px-10 py-3.5 bg-accent text-white rounded-xl font-bold hover:bg-accent-dark transition-all shadow-premium">Next Step</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-10 animate-fade-in">
                <div className="space-y-4">
                  <label className="text-sm font-bold text-primary ml-1 uppercase tracking-widest opacity-60">Reporting Strategy</label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { mid: 'REAL_TIME', title: 'Real-time', desc: 'Sync as you issue' },
                      { mid: 'BATCH', title: 'Batch', desc: 'Sync periodically' }
                    ].map(m => (
                      <button
                        key={m.mid}
                        onClick={() => setProfile({ ...profile, reportingMethods: m.mid as ReportingMethod })}
                        className={`p-6 rounded-2xl border-2 text-left transition-all ${
                          profile.reportingMethods === m.mid 
                          ? 'border-accent bg-mint/10' 
                          : 'border-border bg-surface hover:border-accent-light'
                        }`}
                      >
                        <h5 className={`font-bold ${profile.reportingMethods === m.mid ? 'text-accent' : 'text-primary'}`}>{m.title}</h5>
                        <p className="text-xs text-text-light mt-1">{m.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <button onClick={() => setStep(2)} className="px-8 py-3 text-sm font-bold text-text-light hover:text-primary transition-colors">Back</button>
                  <button 
                    onClick={handleComplete} 
                    disabled={loading}
                    className="px-10 py-3.5 bg-primary-vibrant text-white rounded-xl font-bold hover:bg-primary-dark transition-all shadow-premium disabled:opacity-50 flex items-center gap-2"
                  >
                    {loading && <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>}
                    Complete Setup
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
