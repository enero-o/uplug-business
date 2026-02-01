export interface User {
  id: number
  username?: string
  name: string
  email: string
  role: string
  is_active?: boolean
  is_verified?: boolean
  created_at?: string
  updated_at?: string
}

export interface DashboardStats {
  total_invoices: number
  draft_invoices: number
  sent_invoices: number
  paid_invoices: number
  cancelled_invoices: number
  total_revenue: number
  pending_amount: number
  overdue_invoices: number
  currency?: string
}

export interface BusinessProfile {
  id?: number
  name: string
  tin?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  country?: string
  postal_code?: string
  is_onboarded?: boolean
  created_at?: string
  updated_at?: string
}

export interface OnboardingPayload {
  business_name: string
  tin: string
  email: string
  phone?: string
  address?: string
  city?: string
  state?: string
  country?: string
  postal_code?: string
}

export interface ApiResponse<T> {
  data?: T
  message?: string
  error?: string
  status?: number
}

export type InvoiceStatus = 'draft' | 'sent' | 'delivered' | 'paid' | 'cancelled'

export interface Invoice {
  id: number
  invoice_number: string
  invoice_type_code?: string
  issue_date: string
  due_date: string
  supplier_name: string
  customer_name: string
  document_currency_code: string
  tax_exclusive_amount: number
  tax_inclusive_amount: number
  payable_amount: number
  status: InvoiceStatus
  peppol_status?: string
  erp_sync_status?: string
  created_at?: string
  updated_at?: string
}

export interface InvoiceFilters {
  status?: InvoiceStatus | ''
  search?: string
  date_from?: string
  date_to?: string
  limit?: number
  offset?: number
}

export interface ErpAdapter {
  name: string
  displayName?: string
}

export interface ErpSyncResult {
  success: boolean
  message?: string
  synced?: number
  failed?: number
}
