import { useState } from 'react'
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const nav = [
  { to: '/', label: 'Overview', icon: DashboardIcon },
  { to: '/invoices', label: 'E-Invoicing', icon: InvoicesIcon },
  { to: '/erp', label: 'Integrations', icon: ErpIcon },
  { to: '/settings', label: 'Settings', icon: SettingsIcon },
]

function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  )
}
function InvoicesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}
function ErpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
    </svg>
  )
}
function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 2.31.826 1.37 1.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 2.31-1.37 1.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-2.31-.826-1.37-1.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-2.31 1.37-1.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}
function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  )
}
function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  )
}

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const pageTitle =
    nav.find(item => item.to === location.pathname)?.label || 'Overview'

  return (
    <div className="flex h-screen bg-surface overflow-hidden font-sans">
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-primary-dark text-white/70 transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-64' : 'w-20'
        } shrink-0 relative z-30 border-r border-white/5 shadow-2xl`}
      >
        {/* Brand */}
        <div className="flex h-20 items-center justify-between px-6 border-b border-white/5">
          {sidebarOpen ? (
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white shadow-premium">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">AARC</span>
            </div>
          ) : (
            <div className="mx-auto w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white shadow-premium">
               <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-8 px-3 space-y-2 custom-scrollbar">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-bold transition-all relative group ${
                  isActive
                    ? 'bg-accent text-white shadow-lg shadow-accent/20'
                    : 'hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              {sidebarOpen && <span className="animate-fade-in">{label}</span>}
              {!sidebarOpen && (
                 <div className="absolute left-full ml-4 px-3 py-2 bg-primary-dark text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl border border-white/10">
                    {label}
                 </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User / Footer */}
        <div className="p-4 border-t border-white/5">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-bold transition-all hover:bg-red-500/10 hover:text-red-400 group relative"
          >
            <LogoutIcon className="h-5 w-5 shrink-0" />
            {sidebarOpen && <span className="animate-fade-in">Sign out</span>}
            {!sidebarOpen && (
                 <div className="absolute left-full ml-4 px-3 py-2 bg-red-600 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
                    Sign out
                 </div>
              )}
          </button>
        </div>
        
        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-accent text-white border-2 border-primary-dark flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
        >
          <ChevronLeft className={`h-3 w-3 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} />
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col min-w-0 relative">
        <header className="flex h-20 shrink-0 items-center justify-between border-b border-border bg-white px-10 relative z-20">
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              {/* Mobile Menu Toggle */}
            </div>
            <h2 className="text-xl font-display font-bold text-primary">{pageTitle}</h2>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-text-light hover:text-primary transition-colors">
              <div className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white" />
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </button>
            <div className="h-8 w-px bg-border" />
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-primary leading-none">{user?.name || 'Admin'}</p>
                <p className="text-[10px] font-bold text-text-light uppercase tracking-widest mt-1 opacity-60">Verified Business</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-mint border border-accent/20 flex items-center justify-center text-accent font-bold text-sm shadow-subtle">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 relative z-10 custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
