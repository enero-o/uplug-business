import type {
  Invoice,
  InvoiceFilters,
  DashboardStats,
  BusinessProfile,
  OnboardingPayload,
  ErpSyncResult,
} from '../types'

const API_URL = import.meta.env.VITE_API_URL || ''
const API_BASE_PATH = import.meta.env.VITE_API_BASE_PATH || '/api'
const BASE_URL = API_URL ? `${API_URL}${API_BASE_PATH}` : API_BASE_PATH

async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`
  const token = localStorage.getItem('auth_token')
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers as Record<string, string>),
  }

  const res = await fetch(url, { ...options, headers })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `API Error: ${res.status}`)
  }
  return res.json()
}

export const authApi = {
  login(username: string, password: string) {
    return apiCall<{ token: string; user: { name: string; email: string }; onboarded?: boolean }>(
      `/auth/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
      { method: 'POST' }
    )
  },
  logout() {
    localStorage.removeItem('auth_token')
    return apiCall<void>('/auth/logout').catch(() => {})
  },
  getProfile() {
    return apiCall<{ name: string; email: string }>('/user/profile')
  },
  requestPasswordReset(email: string) {
    return apiCall<{ message: string }>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  },
  resetPassword(token: string, newPassword: string) {
    return apiCall<{ message: string }>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    })
  },
  register(email: string, businessName?: string) {
    return apiCall<{ message: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, businessName }),
    })
  },
}

export const businessApi = {
  getProfile() {
    return apiCall<BusinessProfile>('/business/profile')
  },
  onboard(data: OnboardingPayload) {
    return apiCall<BusinessProfile>('/business/onboard', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  verifyTIN(tin: string) {
    return apiCall<{ valid: boolean; name?: string }>(`/business/tin/verify?tin=${encodeURIComponent(tin)}`)
  },
}

export const invoiceApi = {
  getInvoices(filters?: InvoiceFilters) {
    const params = new URLSearchParams()
    if (filters?.status) params.append('status', filters.status)
    if (filters?.search) params.append('search', filters.search)
    if (filters?.limit) params.append('limit', String(filters.limit))
    if (filters?.offset) params.append('offset', String(filters.offset))
    const q = params.toString()
    return apiCall<Invoice[]>(`/invoices${q ? `?${q}` : ''}`)
  },
  getInvoiceById(id: string) {
    return apiCall<Invoice>(`/invoices/${id}`)
  },
  async getDashboardStats(): Promise<DashboardStats> {
    const r = await apiCall<Partial<DashboardStats>>('/business/dashboard')
    return {
      total_invoices: r.total_invoices ?? 0,
      draft_invoices: r.draft_invoices ?? 0,
      sent_invoices: r.sent_invoices ?? 0,
      paid_invoices: r.paid_invoices ?? 0,
      cancelled_invoices: r.cancelled_invoices ?? 0,
      total_revenue: r.total_revenue ?? 0,
      pending_amount: r.pending_amount ?? 0,
      overdue_invoices: r.overdue_invoices ?? 0,
      currency: r.currency ?? 'NGN',
    }
  },
}

export const erpApi = {
  listAdapters() {
    return apiCall<string[]>('/erp')
  },
  push(system: string, invoice: unknown) {
    return apiCall<ErpSyncResult>(`/erp/${system}/push`, {
      method: 'POST',
      body: JSON.stringify(invoice),
    })
  },
  pull(system: string, request: { from?: string; to?: string }) {
    return apiCall<unknown[]>(`/erp/${system}/pull`, {
      method: 'POST',
      body: JSON.stringify(request ?? {}),
    })
  },
  sync(system: string, request: { mode?: string }) {
    return apiCall<ErpSyncResult>(`/erp/${system}/sync`, {
      method: 'POST',
      body: JSON.stringify(request ?? {}),
    })
  },
}
