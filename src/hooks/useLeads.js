/**
 * useLeads Hook
 * Manages lead-related state and operations
 */
import { useState, useCallback } from 'react'
import { MOCK_LEADS } from '../data/leads'

export const useLeads = () => {
  const [leads, setLeads] = useState(MOCK_LEADS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setLeads(MOCK_LEADS)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const addLead = useCallback((newLead) => {
    setLeads(prev => [...prev, { id: prev.length + 1, ...newLead }])
  }, [])

  const updateLead = useCallback((id, updates) => {
    setLeads(prev => prev.map(lead => (lead.id === id ? { ...lead, ...updates } : lead)))
  }, [])

  const deleteLead = useCallback((id) => {
    setLeads(prev => prev.filter(lead => lead.id !== id))
  }, [])

  return {
    leads,
    loading,
    error,
    fetchLeads,
    addLead,
    updateLead,
    deleteLead,
  }
}

export default useLeads
