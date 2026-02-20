import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BusinessProfileResponse } from '../types/api'

interface UserInfo {
  name: string
  email: string
}

interface AuthState {
  token: string | null
  user: UserInfo | null
  businessProfile: BusinessProfileResponse | null
  onboarded: boolean
  setAuth: (token: string, user: UserInfo, onboarded?: boolean, businessProfile?: BusinessProfileResponse) => void
  setBusinessProfile: (profile: BusinessProfileResponse) => void
  setOnboarded: (value: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      businessProfile: null,
      onboarded: false,
      setAuth: (token, user, onboarded = false, businessProfile: BusinessProfileResponse | null = null) =>
        set({ token, user, onboarded, businessProfile }),
      setBusinessProfile: (businessProfile) => set({ businessProfile }),
      setOnboarded: (onboarded) => set({ onboarded }),
      logout: () => set({ token: null, user: null, onboarded: false, businessProfile: null }),
    }),
    { 
      name: 'uplug-auth', 
      partialize: (s) => ({ 
        token: s.token, 
        user: s.user, 
        onboarded: s.onboarded,
        businessProfile: s.businessProfile 
      }) 
    }
  )
)
