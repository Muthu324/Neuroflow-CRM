/**
 * API Service
 * Handles all API calls to the backend
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'

// Default headers
const defaultHeaders = {
  'Content-Type': 'application/json',
}

/**
 * Fetch wrapper with error handling
 */
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: defaultHeaders,
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

/**
 * Leads API
 */
export const leadsAPI = {
  getAll: () => fetchAPI('/leads'),
  getById: (id) => fetchAPI(`/leads/${id}`),
  create: (data) => fetchAPI('/leads', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => fetchAPI(`/leads/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => fetchAPI(`/leads/${id}`, { method: 'DELETE' }),
}

/**
 * Revenue API
 */
export const revenueAPI = {
  getAll: () => fetchAPI('/revenue'),
  getByMonth: (month) => fetchAPI(`/revenue/${month}`),
  create: (data) => fetchAPI('/revenue', { method: 'POST', body: JSON.stringify(data) }),
}

/**
 * Notifications API
 */
export const notificationsAPI = {
  getAll: () => fetchAPI('/notifications'),
  markAsRead: (id) => fetchAPI(`/notifications/${id}/read`, { method: 'PATCH' }),
  delete: (id) => fetchAPI(`/notifications/${id}`, { method: 'DELETE' }),
}

export default {
  leadsAPI,
  revenueAPI,
  notificationsAPI,
}
