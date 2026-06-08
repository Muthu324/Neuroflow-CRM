import { useCallback, useMemo } from 'react';
import { useData } from '../app/dataContext';
import type { Lead } from '../types';

export function useLeads() {
  const {
    leads,
    fetchLeads,
    createLead,
    updateLead,
    deleteLead,
    addLeadTimelineEvent,
    isLoading,
    error,
    clearError,
  } = useData();

  /**
   * Get LinkedIn-specific metrics
   */
  const getLinkedinMetrics = useCallback(() => {
    const linkedin = leads.filter(l => l.platform === 'linkedin');
    return {
      total: linkedin.length,
      accepted: linkedin.filter(l => l.status !== 'new').length,
      sent: linkedin.reduce((acc, curr) => acc + curr.timeline.filter(e => e.type === 'connection_sent').length, 0),
      replies: linkedin.reduce((acc, curr) => acc + curr.timeline.filter(e => e.type === 'reply_received').length, 0),
      hot: linkedin.filter(l => l.temperature === 'hot').length,
      warm: linkedin.filter(l => l.temperature === 'warm').length,
      ghosted: linkedin.filter(l => l.temperature === 'ghosted').length,
      conversionRate: linkedin.length > 0
        ? Math.round((linkedin.filter(l => l.status === 'closed_won').length / linkedin.length) * 100)
        : 0
    };
  }, [leads]);

  /**
   * Get Instagram-specific metrics
   */
  const getInstagramMetrics = useCallback(() => {
    const instagram = leads.filter(l => l.platform === 'instagram');
    return {
      total: instagram.length,
      dms: instagram.reduce((acc, curr) => acc + curr.timeline.filter(e => e.type === 'message_sent').length, 0),
      replies: instagram.reduce((acc, curr) => acc + curr.timeline.filter(e => e.type === 'reply_received').length, 0),
      booked: instagram.filter(l => l.status === 'proposal' || l.status === 'negotiation' || l.status === 'closed_won').length,
      revenueWon: instagram.filter(l => l.status === 'closed_won').reduce((acc, curr) => acc + curr.revenueEstimate, 0)
    };
  }, [leads]);

  /**
   * Get global funnel statistics
   */
  const getGlobalFunnelStats = useCallback(() => {
    return {
      total: leads.length,
      cold: leads.filter(l => l.temperature === 'cold').length,
      warm: leads.filter(l => l.temperature === 'warm').length,
      hot: leads.filter(l => l.temperature === 'hot').length,
      ghosted: leads.filter(l => l.temperature === 'ghosted').length,
      closedWon: leads.filter(l => l.status === 'closed_won').length
    };
  }, [leads]);

  return {
    leads,
    isLoading,
    error,
    clearError,
    fetchLeads,
    createLead,
    updateLead,
    deleteLead,
    addLeadTimelineEvent,
    getLinkedinMetrics,
    getInstagramMetrics,
    getGlobalFunnelStats
  };
}
