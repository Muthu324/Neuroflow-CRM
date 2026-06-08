import { Lead, Project } from '../types';

export const analyticsService = {
  getWeeklyOutreachData() {
    return [
      { name: 'Mon', DMs: 25, replies: 12, calls: 2 },
      { name: 'Tue', DMs: 40, replies: 19, calls: 4 },
      { name: 'Wed', DMs: 35, replies: 22, calls: 5 },
      { name: 'Thu', DMs: 48, replies: 28, calls: 7 },
      { name: 'Fri', DMs: 50, replies: 31, calls: 8 },
      { name: 'Sat', DMs: 15, replies: 8, calls: 1 },
      { name: 'Sun', DMs: 10, replies: 4, calls: 0 }
    ];
  },

  getMonthlyRevenueData() {
    return [
      { name: 'Jan', MRR: 4500, projection: 4500 },
      { name: 'Feb', MRR: 6200, projection: 6200 },
      { name: 'Mar', MRR: 8500, projection: 8500 },
      { name: 'Apr', MRR: 11000, projection: 12000 },
      { name: 'May', MRR: 18000, projection: 20000 },
      { name: 'Jun', MRR: 18000, projection: 32500 } // June predicts won deals
    ];
  },

  getPlatformComparisonData(leads: Lead[]) {
    const linkedinLeads = leads.filter(l => l.platform === 'linkedin');
    const instagramLeads = leads.filter(l => l.platform === 'instagram');

    const linkedinClosed = linkedinLeads.filter(l => l.status === 'closed_won').length;
    const instagramClosed = instagramLeads.filter(l => l.status === 'closed_won').length;

    const linkedinVal = linkedinLeads.reduce((acc, curr) => acc + curr.revenueEstimate, 0);
    const instagramVal = instagramLeads.reduce((acc, curr) => acc + curr.revenueEstimate, 0);

    return [
      { name: 'LinkedIn', Leads: linkedinLeads.length, ClosedStatus: linkedinClosed, PipelineValue: linkedinVal },
      { name: 'Instagram', Leads: instagramLeads.length, ClosedStatus: instagramClosed, PipelineValue: instagramVal }
    ];
  },

  getConversionFunnelData(leads: Lead[]) {
    const total = leads.length;
    const contacted = leads.filter(l => l.status !== 'new').length;
    const proposed = leads.filter(l => ['proposal', 'negotiation', 'closed_won'].includes(l.status)).length;
    const won = leads.filter(l => l.status === 'closed_won').length;

    return [
      { stage: 'Total Leads', count: total, percentage: 100, fill: '#6366f1' },
      { stage: 'Contacted', count: contacted, percentage: total > 0 ? Math.round((contacted / total) * 100) : 0, fill: '#8b5cf6' },
      { stage: 'Proposal Sent', count: proposed, percentage: total > 0 ? Math.round((proposed / total) * 100) : 0, fill: '#ec4899' },
      { stage: 'Closed Won', count: won, percentage: total > 0 ? Math.round((won / total) * 100) : 0, fill: '#10b981' }
    ];
  },

  getOutreachQualityMetrics(leads: Lead[]) {
    const total = leads.length;
    if (total === 0) return { hotPct: 0, ghostedPct: 0 };

    const hot = leads.filter(l => l.temperature === 'hot').length;
    const ghosted = leads.filter(l => l.temperature === 'ghosted').length;

    return {
      hotPct: Math.round((hot / total) * 100),
      ghostedPct: Math.round((ghosted / total) * 100)
    };
  }
};
