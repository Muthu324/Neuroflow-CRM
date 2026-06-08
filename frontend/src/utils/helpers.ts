import { Lead, Project } from '../types';

/**
 * Calculates user progress level based on total XP
 */
export function calculateLevel(xp: number): { level: number; nextLevelXp: number; progressPercentage: number } {
  const xpPerLevel = 1000;
  const level = Math.floor(xp / xpPerLevel) + 1;
  const currentLevelXp = xp % xpPerLevel;
  const progressPercentage = (currentLevelXp / xpPerLevel) * 100;
  return {
    level,
    nextLevelXp: xpPerLevel,
    progressPercentage
  };
}

/**
 * Calculates conversion rates across a lead funnel
 */
export function calculateFunnelRates(leads: Lead[]) {
  const total = leads.length;
  if (total === 0) return { contactedRate: 0, proposalRate: 0, closedRate: 0 };

  const contacted = leads.filter(l => l.status !== 'new').length;
  const proposalValue = leads.filter(l => ['proposal', 'negotiation', 'closed_won'].includes(l.status)).length;
  const closed = leads.filter(l => l.status === 'closed_won').length;

  return {
    contactedRate: Math.round((contacted / total) * 100),
    proposalRate: Math.round((proposalValue / total) * 100),
    closedRate: Math.round((closed / total) * 100)
  };
}

/**
 * Estimates average lead closing quality based on warm ratings
 */
export function calculateAverageAIQualityScore(leads: Lead[]): number {
  if (leads.length === 0) return 0;
  
  const scores = leads.map(l => {
    switch(l.temperature) {
      case 'hot': return 95;
      case 'warm': return 75;
      case 'cold': return 40;
      case 'ghosted': return 15;
      default: return 50;
    }
  });

  const sum = scores.reduce((acc, curr) => acc + curr, 0);
  return Math.round(sum / leads.length);
}

/**
 * Simple debounce function for search inputs
 */
export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timer: any;
  return function(this: any, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
