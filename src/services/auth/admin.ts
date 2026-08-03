import { supabase } from '../../config/supabase'

export async function adminSignup(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function adminLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function adminLogout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentAdmin() {
  try {
    // Get current session
    const { data } = await supabase.auth.getSession()
    const user = data.session?.user

    if (!user) return null

    // Verify token is still valid by refreshing session
    const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession()

    if (refreshError || !refreshData.session) {
      // Token is invalid, clear session
      await supabase.auth.signOut()
      return null
    }

    return refreshData.session.user || user
  } catch (error) {
    console.error('Error getting current admin:', error)
    return null
  }
}

export async function isAdmin() {
  const user = await getCurrentAdmin()
  return !!user
}
