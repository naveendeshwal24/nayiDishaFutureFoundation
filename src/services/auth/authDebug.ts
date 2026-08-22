/**
 * Authentication Debug Utilities
 * Use these functions to verify token-based authentication is working
 */

import { supabase } from '../../config/supabase'

/**
 * Check if user has a valid authenticated session
 */
export async function checkAuthStatus() {
  try {
    const { data } = await supabase.auth.getSession()
    const session = data.session

    if (!session) {
      console.log('❌ No active session')
      return {
        isAuthenticated: false,
        user: null,
        session: null,
      }
    }

    console.log('✓ Active session found')
    console.log('  - User Email:', session.user.email)
    console.log('  - User ID:', session.user.id)
    console.log('  - Token Expires:', new Date(session.expires_at! * 1000).toLocaleString())

    return {
      isAuthenticated: true,
      user: session.user,
      session: {
        accessToken: session.access_token.substring(0, 20) + '...',
        refreshToken: session.refresh_token?.substring(0, 20) + '...',
        expiresIn: session.expires_in,
      },
    }
  } catch (error) {
    console.error('Auth check error:', error)
    return {
      isAuthenticated: false,
      user: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Verify token is still valid
 */
export async function verifyToken() {
  try {
    const { data, error } = await supabase.auth.refreshSession()

    if (error) {
      console.error('❌ Token refresh failed:', error.message)
      return { isValid: false, error: error.message }
    }

    if (data.session) {
      console.log('✓ Token verified and refreshed')
      return { isValid: true, expiresAt: new Date(data.session.expires_at! * 1000) }
    }

    console.log('❌ No valid session after refresh')
    return { isValid: false }
  } catch (error) {
    console.error('❌ Token verification error:', error)
    return { isValid: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

/**
 * Clear all authentication data
 */
export async function clearAuth() {
  try {
    await supabase.auth.signOut()
    console.log('✓ All authentication data cleared')
    return { success: true }
  } catch (error) {
    console.error('❌ Failed to clear auth:', error)
    return { success: false, error }
  }
}

/**
 * Test if admin dashboard is accessible
 */
export async function testAdminAccess() {
  const authStatus = await checkAuthStatus()

  if (!authStatus.isAuthenticated) {
    console.log('⚠️  Admin dashboard NOT accessible - no valid session')
    console.log('   To access: Login at /admin/login')
    return { accessible: false, reason: 'No valid session' }
  }

  console.log('✓ Admin dashboard IS accessible')
  return { accessible: true, user: authStatus.user?.email }
}

/**
 * Display full auth report in console
 */
export async function printAuthReport() {
  console.clear()
  console.log('═══════════════════════════════════════')
  console.log('    AUTHENTICATION DEBUG REPORT')
  console.log('═══════════════════════════════════════')

  const status = await checkAuthStatus()
  console.log('\n📋 Session Status:', status.isAuthenticated ? 'AUTHENTICATED' : 'NOT AUTHENTICATED')

  if (status.session) {
    console.log('\n🔐 Token Info:')
    console.log('  ', status.session)
  }

  const tokenValid = await verifyToken()
  console.log('\n✓ Token Valid:', tokenValid.isValid)

  if (tokenValid.expiresAt) {
    console.log('  Expires:', tokenValid.expiresAt.toLocaleString())
  }

  const dashboardAccess = await testAdminAccess()
  console.log('\n🔑 Dashboard Access:', dashboardAccess.accessible ? 'ALLOWED' : 'DENIED')

  console.log('\n═══════════════════════════════════════')
  console.log('To test authentication:')
  console.log('  1. Run: window.authDebug.printAuthReport()')
  console.log('  2. Check browser console for results')
  console.log('═══════════════════════════════════════\n')
}

// Expose debug utilities to window for testing (dev builds only - never ship to production)
declare global {
  interface Window {
    authDebug?: {
      checkAuthStatus: typeof checkAuthStatus
      verifyToken: typeof verifyToken
      clearAuth: typeof clearAuth
      testAdminAccess: typeof testAdminAccess
      printAuthReport: typeof printAuthReport
    }
  }
}

if (import.meta.env.DEV && typeof window !== 'undefined') {
  window.authDebug = {
    checkAuthStatus,
    verifyToken,
    clearAuth,
    testAdminAccess,
    printAuthReport,
  }
}
