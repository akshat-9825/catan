import { supabase } from './client'

export const authHelpers = {
  // Sign up with email/password
  signUp: async (email: string, password: string) => {
    return await supabase.auth.signUp({ email, password })
  },

  // Sign in with email/password  
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password })
  },

  // Sign in with Google OAuth
  signInWithGoogle: async (redirectTo?: string) => {
    return await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectTo || `${window.location.origin}/auth/callback`,
      },
    })
  },

  // Sign out
  signOut: async () => {
    return await supabase.auth.signOut()
  },

  // Get current user
  getCurrentUser: async () => {
    return await supabase.auth.getUser()
  },

  // Get current session
  getSession: async () => {
    return await supabase.auth.getSession()
  },

  // Refresh session
  refreshSession: async () => {
    return await supabase.auth.refreshSession()
  },

  // Listen to auth changes
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  },

  // Reset password
  resetPassword: async (email: string) => {
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
  },

  // Update password
  updatePassword: async (password: string) => {
    return await supabase.auth.updateUser({ password })
  },
}