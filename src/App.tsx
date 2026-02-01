import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { Onboarding } from './pages/onboarding/Onboarding'
import { Login } from './pages/auth/Login'
import { ForgotPassword } from './pages/auth/ForgotPassword'
import { ResetPassword } from './pages/auth/ResetPassword'
import { Register } from './pages/auth/Register'
import { Dashboard } from './pages/dashboard/Dashboard'
import { InvoicesList } from './pages/invoices/InvoicesList'
import { ErpIntegrations } from './pages/erp/ErpIntegrations'
import { Settings } from './pages/settings/Settings'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((s) => s.token)
  const onboarded = useAuthStore((s) => s.onboarded)
  if (!token) return <Navigate to="/login" replace />
  if (!onboarded) return <Navigate to="/onboarding" replace />
  return <>{children}</>
}

function OnboardingRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((s) => s.token)
  const onboarded = useAuthStore((s) => s.onboarded)
  if (!token) return <Navigate to="/login" replace />
  if (onboarded) return <Navigate to="/" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/onboarding"
        element={
          <OnboardingRoute>
            <Onboarding />
          </OnboardingRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="invoices" element={<InvoicesList />} />
        <Route path="erp" element={<ErpIntegrations />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
