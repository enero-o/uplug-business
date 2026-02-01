import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserInfo {
  name: string
  email: string
}

interface AuthState {
  token: string | null
  user: UserInfo | null
  onboarded: boolean
  setAuth: (token: string, user: UserInfo, onboarded?: boolean) => void
  setOnboarded: (value: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      onboarded: true,
      setAuth: (token, user, onboarded = true) =>
        set({ token, user, onboarded }),
      setOnboarded: (onboarded) => set({ onboarded }),
      logout: () => set({ token: null, user: null, onboarded: true }),
    }),
    { name: 'uplug-auth', partialize: (s) => ({ token: s.token, user: s.user, onboarded: s.onboarded }) }
  )
)
