import { useQuery } from '@tanstack/react-query'
import { invoiceApi } from '../services/api'
import type { InvoiceFilters } from '../types'

export const invoiceKeys = {
  all: ['invoices'] as const,
  lists: () => [...invoiceKeys.all, 'list'] as const,
  list: (filters?: InvoiceFilters) => [...invoiceKeys.lists(), filters] as const,
  detail: (id: string) => [...invoiceKeys.all, 'detail', id] as const,
  dashboard: () => [...invoiceKeys.all, 'dashboard'] as const,
}

export function useInvoices(filters?: InvoiceFilters) {
  return useQuery({
    queryKey: invoiceKeys.list(filters),
    queryFn: () => invoiceApi.getInvoices(filters),
  })
}

export function useInvoice(id: string | null) {
  return useQuery({
    queryKey: invoiceKeys.detail(id ?? ''),
    queryFn: () => invoiceApi.getInvoiceById(id!),
    enabled: !!id,
  })
}

export function useDashboardStats() {
  return useQuery({
    queryKey: invoiceKeys.dashboard(),
    queryFn: () => invoiceApi.getDashboardStats(),
  })
}
