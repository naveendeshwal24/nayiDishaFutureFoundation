import { supabase } from '../supabase/storage'

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
  const { data } = await supabase.auth.getSession()
  return data.session?.user || null
}

export async function isAdmin() {
  const user = await getCurrentAdmin()
  return !!user
}
