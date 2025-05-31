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

  // Sign out
  signOut: async () => {
    return await supabase.auth.signOut()
  },

  // Get current user
  getCurrentUser: async () => {
    return await supabase.auth.getUser()
  },

  // Listen to auth changes
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}