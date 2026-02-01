import { useQuery } from '@tanstack/react-query'
import { erpApi } from '../services/api'

export const erpKeys = {
  all: ['erp'] as const,
  adapters: () => [...erpKeys.all, 'adapters'] as const,
}

export function useErpAdapters() {
  return useQuery({
    queryKey: erpKeys.adapters(),
    queryFn: () => erpApi.listAdapters(),
  })
}
