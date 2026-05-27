/**
 * Authentication Service
 * Handles user authentication, login, logout, and token management
 */

const TOKEN_KEY = 'neuroflow_token'
const USER_KEY = 'neuroflow_user'

/**
 * Login user
 */
export const login = async (email, password) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) throw new Error('Login failed')

    const data = await response.json()
    localStorage.setItem(TOKEN_KEY, data.token)
    localStorage.setItem(USER_KEY, JSON.stringify(data.user))

    return data
  } catch (error) {
    console.error('Login Error:', error)
    throw error
  }
}

/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

/**
 * Register new user
 */
export const register = async (email, password, name) => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })

    if (!response.ok) throw new Error('Registration failed')
    return await response.json()
  } catch (error) {
    console.error('Registration Error:', error)
    throw error
  }
}

/**
 * Get current token
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * Get current user
 */
export const getCurrentUser = () => {
  const user = localStorage.getItem(USER_KEY)
  return user ? JSON.parse(user) : null
}

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!getToken()
}

/**
 * Refresh token
 */
export const refreshToken = async () => {
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!response.ok) throw new Error('Token refresh failed')

    const data = await response.json()
    localStorage.setItem(TOKEN_KEY, data.token)

    return data.token
  } catch (error) {
    logout()
    throw error
  }
}

export default {
  login,
  logout,
  register,
  getToken,
  getCurrentUser,
  isAuthenticated,
  refreshToken,
}
