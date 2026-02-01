import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { businessApi } from '../services/api'
import type { OnboardingPayload } from '../types'

export const businessKeys = {
  all: ['business'] as const,
  profile: () => [...businessKeys.all, 'profile'] as const,
}

export function useBusinessProfile() {
  return useQuery({
    queryKey: businessKeys.profile(),
    queryFn: () => businessApi.getProfile(),
    retry: false,
  })
}

export function useOnboard() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: OnboardingPayload) => businessApi.onboard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: businessKeys.all })
    },
  })
}

export function useVerifyTIN() {
  return useMutation({
    mutationFn: (tin: string) => businessApi.verifyTIN(tin),
  })
}
