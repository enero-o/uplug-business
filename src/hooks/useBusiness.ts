import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authApi } from '../services/api'
import type { CreateBusinessProfileRequest } from '../types/api'

export const businessKeys = {
  all: ['business'] as const,
  profile: () => [...businessKeys.all, 'profile'] as const,
  apiKeys: (id: string) => [...businessKeys.all, 'apiKeys', id] as const,
}

export function useVerifyTIN() {
  return useMutation({
    mutationFn: (tin: string) => authApi.verifyTin(tin),
  })
}

export function useCreateProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateBusinessProfileRequest) => authApi.createProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: businessKeys.all })
    },
  })
}

export function useApiKeys(businessId: string | undefined) {
  return useQuery({
    queryKey: businessKeys.apiKeys(businessId ?? ''),
    queryFn: () => authApi.getApiKeys(businessId!),
    enabled: !!businessId,
  })
}
