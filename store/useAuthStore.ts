import { create } from 'zustand';

export type AuthProvider = 'email' | 'google' | 'apple';

export interface AuthUser {
  id: string;
  name: string;
  email?: string;
  provider: AuthProvider;
}

interface AuthState {
  user: AuthUser | null;
  signIn: (user: AuthUser) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  signIn: (user) => set({ user }),
  signOut: () => set({ user: null }),
}));
