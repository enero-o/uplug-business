import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useApiKeys } from '../../hooks/useBusiness'

export function Settings() {
  const businessProfile = useAuthStore(s => s.businessProfile)
  const { data: apiKeys, isLoading } = useApiKeys(businessProfile?.id)
  const [showSecret, setShowSecret] = useState(false)

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-primary">Business Settings</h1>
        <p className="text-sm text-text-light font-medium">Manage your profile and API credentials</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Profile Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] border border-border p-8 shadow-subtle">
            <h3 className="text-lg font-display font-bold text-primary mb-6">Profile Details</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">Industry</p>
                  <p className="mt-1 font-bold text-primary">{businessProfile?.industryClassification || '—'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">ERP Solution</p>
                  <p className="mt-1 font-bold text-primary">{businessProfile?.erpSolution || '—'}</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">Reporting Method</p>
                <div className="mt-2 inline-flex items-center gap-2 rounded-lg bg-mint/30 px-3 py-1 text-xs font-bold text-accent border border-accent/10">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  {businessProfile?.reportingMethods}
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <p className="text-[10px] font-bold text-text-light uppercase tracking-widest text-emerald-600">Verified TIN</p>
                <div className="mt-3 flex items-center justify-between p-4 bg-surface rounded-2xl border border-border">
                  <div>
                    <p className="text-base font-bold text-primary">{businessProfile?.tin?.businessName}</p>
                    <p className="text-xs text-text-light font-medium mt-1">TIN: {businessProfile?.tin?.tin}</p>
                  </div>
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04c0 4.835 1.354 9.31 3.712 13.111L12 21.056l3.906-2.019a11.954 11.954 0 003.712-13.111z" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API Keys Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] border border-border p-8 shadow-subtle relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-50 -tr-1/4" />
            
            <h3 className="text-lg font-display font-bold text-primary mb-2">API Credentials</h3>
            <p className="text-xs text-text-light font-medium mb-8">Use these keys to integrate your custom systems via our API.</p>

            {isLoading ? (
               <div className="space-y-4 animate-pulse">
                <div className="h-16 bg-surface rounded-2xl" />
                <div className="h-16 bg-surface rounded-2xl" />
              </div>
            ) : apiKeys ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-light uppercase tracking-widest ml-1">Public Key</label>
                  <div className="flex items-center gap-2 p-4 bg-surface rounded-2xl border border-border font-mono text-xs text-primary overflow-hidden">
                    <span className="truncate">{apiKeys.publicKey}</span>
                    <button onClick={() => navigator.clipboard.writeText(apiKeys.publicKey)} className="text-accent hover:text-accent-dark transition-colors shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V7a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-light uppercase tracking-widest ml-1">Secret Key</label>
                   <div className="flex items-center gap-2 p-4 bg-surface rounded-2xl border border-border font-mono text-xs text-primary overflow-hidden">
                    <span className="truncate">{showSecret ? apiKeys.secretKey : '••••••••••••••••••••••••••••••••'}</span>
                    <button onClick={() => setShowSecret(!showSecret)} className="text-text-light hover:text-primary transition-colors shrink-0">
                      {showSecret ? (
                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
                  <svg className="w-5 h-5 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider leading-relaxed">Never share your Secret Key. Anyone with this key can issue invoices on your behalf.</p>
                </div>
              </div>
            ) : (
              <div className="py-10 text-center text-text-light/50 font-medium">No API keys found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
