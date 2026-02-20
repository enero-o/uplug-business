import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { einvoiceApi } from '../services/api'
import type { ActionType } from '../types/api'

export const invoiceKeys = {
  all: ['einvoices'] as const,
  actions: (type?: ActionType) => [...invoiceKeys.all, 'actions', type] as const,
  logins: () => [...invoiceKeys.all, 'logins'] as const,
  signings: () => [...invoiceKeys.all, 'signings'] as const,
}

export function useEinvoiceActions(type?: ActionType) {
  return useQuery({
    queryKey: invoiceKeys.actions(type),
    queryFn: () => einvoiceApi.getActions(type),
  })
}

export function useTaxpayerLogins() {
  return useQuery({
    queryKey: invoiceKeys.logins(),
    queryFn: () => einvoiceApi.getTaxpayerLogins(),
  })
}

export function useValidateInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (invoice: any) => einvoiceApi.validate(invoice),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoiceKeys.all });
    }
  });
}

export function useReportInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => einvoiceApi.report(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoiceKeys.all });
    }
  });
}

export function useSignInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => einvoiceApi.sign(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoiceKeys.all });
    }
  });
}
