/**
 * useRevenue Hook
 * Manages revenue-related state and operations
 */
import { useState, useCallback } from 'react'
import { MOCK_REVENUE } from '../data/revenue'

export const useRevenue = () => {
  const [revenue, setRevenue] = useState(MOCK_REVENUE)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchRevenue = useCallback(async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setRevenue(MOCK_REVENUE)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const getTotalRevenue = useCallback(() => {
    return revenue.reduce((sum, item) => sum + item.amount, 0)
  }, [revenue])

  const getAverageRevenue = useCallback(() => {
    return getTotalRevenue() / revenue.length
  }, [revenue, getTotalRevenue])

  return {
    revenue,
    loading,
    error,
    fetchRevenue,
    getTotalRevenue,
    getAverageRevenue,
  }
}

export default useRevenue
