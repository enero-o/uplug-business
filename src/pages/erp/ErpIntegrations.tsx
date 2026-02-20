import { useTaxpayerLogins } from '../../hooks/useInvoices'

export function ErpIntegrations() {
  const { data: logins = [], isLoading, error } = useTaxpayerLogins()

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-primary">Taxpayer Authentication</h1>
          <p className="text-sm text-text-light font-medium">Manage connections to government tax portals</p>
        </div>
        
        <button className="px-6 py-2.5 bg-accent text-white rounded-xl font-bold hover:bg-accent-dark transition-all shadow-premium flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          New Portal Link
        </button>
      </div>

      {error ? (
        <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-6 text-amber-700">
          <h3 className="font-bold">Authentication Service Offline</h3>
          <p className="mt-1 text-sm font-medium opacity-80">We couldn't retrieve your portal login status. Please ensure your business profile is complete.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logins.map((login) => (
            <div key={login.id} className="bg-white rounded-[2rem] border border-border p-6 shadow-subtle hover:shadow-premium transition-all">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-surface rounded-2xl flex items-center justify-center text-primary border border-border">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0112 3a10.003 10.003 0 014.139 1.441l.054.09m-3.44 2.04A7.001 7.001 0 0012 3a7.001 7.001 0 00-4.139 1.441M12 11V7" /></svg>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  login.status === 'VERIFIED' ? 'bg-mint text-accent border border-accent/20' : 'bg-red-50 text-red-600 border border-red-100'
                }`}>
                  {login.status || 'ACTIVE'}
                </span>
              </div>
              
              <h3 className="font-display font-bold text-primary truncate">{login.email}</h3>
              <p className="text-xs text-text-light font-medium mt-1">Portal ID: {login.code || '—'}</p>
              
              <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                <span className="text-[10px] text-text-light font-bold uppercase tracking-widest leading-none">
                  Sync: {login.receivedAt ? new Date(login.receivedAt).toLocaleDateString() : 'Pending'}
                </span>
                <button className="text-xs font-bold text-accent hover:text-accent-dark transition-colors">Re-Authenticate</button>
              </div>
            </div>
          ))}
          
          {logins.length === 0 && !isLoading && (
            <div className="col-span-full py-20 bg-white rounded-card border-2 border-dashed border-border flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4 text-text-light/20">
                 <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
              </div>
              <h3 className="text-lg font-bold text-primary">No Portal Links</h3>
              <p className="text-sm text-text-light font-medium mt-1 max-w-xs px-6">Link your taxpayer account to automate reporting directly to the FIRS exchange.</p>
              <button className="mt-6 text-sm font-bold text-accent hover:underline">Link your first account &rarr;</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
