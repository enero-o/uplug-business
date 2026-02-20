import { Link } from 'react-router-dom'
import { useEinvoiceActions } from '../../hooks/useInvoices'
import { useAuthStore } from '../../store/authStore'

export function Dashboard() {
  const { data: actions = [], isLoading } = useEinvoiceActions()
  const user = useAuthStore(s => s.user)

  const stats = {
    total: actions.length,
    reported: actions.filter(a => a.actionType === 'REPORT').length,
    validated: actions.filter(a => a.actionType === 'VALIDATE').length,
    failed: actions.filter(a => a.status?.includes('FAIL') || a.status?.includes('ERR')).length,
  }

  const recentActions = actions.slice(0, 5)

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-32 bg-white rounded-card border border-border" />
        <div className="grid grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-24 bg-white rounded-2xl border border-border" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-card bg-primary-vibrant p-10 text-white shadow-premium">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-20 blur-[80px] -tr-1/2" />
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display font-bold">Hello, {user?.name || 'Business'}</h1>
            <p className="mt-2 text-mint/80 font-medium max-w-md">
              Your business is certified and active. All e-invoicing endpoints are currently operational.
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end">
            <span className="text-xs font-bold uppercase tracking-widest opacity-60">Status</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-2 w-2 rounded-full bg-accent animate-ping" />
              <span className="text-sm font-bold text-accent">LIVESTREAM ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
          { label: 'Total Actions', val: stats.total, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'text-primary bg-surface' },
          { label: 'Validated', val: stats.reported, icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-accent bg-mint/20' },
          { label: 'Reported', val: stats.validated, icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12', color: 'text-indigo-600 bg-indigo-50' },
          { label: 'Failed Sync', val: stats.failed, icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', color: 'text-red-600 bg-red-50' }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-border shadow-subtle hover:shadow-premium transition-all">
            <div className={`p-2.5 rounded-xl inline-flex mb-4 ${stat.color}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} /></svg>
            </div>
            <p className="text-sm font-bold text-text-light uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl font-display font-bold text-primary mt-1">{stat.val}</p>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Actions Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-bold text-primary">Recent Operations</h3>
            <Link to="/invoices" className="text-sm font-bold text-accent hover:text-accent-dark transition-colors">View All Actions</Link>
          </div>
          <div className="bg-white rounded-2xl border border-border shadow-subtle overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface text-text-light font-bold uppercase tracking-widest text-[10px] border-b border-border">
                <tr>
                  <th className="px-6 py-4">Action</th>
                  <th className="px-6 py-4">Reference</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentActions.map((action) => (
                  <tr key={action.id} className="hover:bg-surface/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-bold text-primary text-xs">{action.actionType}</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-text-muted">
                      {action.reference || action.id.split('-')[0]}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 font-bold text-[10px] text-accent">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                        SUCCESS
                      </div>
                    </td>
                  </tr>
                ))}
                {actions.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-text-light/50 font-medium italic">
                      No recent actions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Tools */}
        <div className="space-y-4">
          <h3 className="text-xl font-display font-bold text-primary">Quick Tools</h3>
          <div className="grid grid-cols-1 gap-4">
            <Link to="/invoices" className="group p-5 bg-white rounded-2xl border border-border shadow-subtle hover:border-accent hover:shadow-premium transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-mint rounded-xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm group-hover:text-accent transition-colors">Audit History</h4>
                  <p className="text-xs text-text-light mt-0.5">Full compliance action logs</p>
                </div>
              </div>
            </Link>

            <Link to="/erp" className="group p-5 bg-white rounded-2xl border border-border shadow-subtle hover:border-accent hover:shadow-premium transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m4-4l-4-4" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm group-hover:text-indigo-600 transition-colors">ERP Sync</h4>
                  <p className="text-xs text-text-light mt-0.5">Manage Sage/Oracle integrations</p>
                </div>
              </div>
            </Link>

            <Link to="/settings" className="group p-5 bg-white rounded-2xl border border-border shadow-subtle hover:border-accent hover:shadow-premium transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm transition-colors">Account Settings</h4>
                  <p className="text-xs text-text-light mt-0.5">Manage API Keys & Profile</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
