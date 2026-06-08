/**
 * NeuroFlow CRM - Standard TypeScript Definitions
 */

export type PlatformType = 'linkedin' | 'instagram' | 'direct';

export interface Lead {
  id: string;
  name: string;
  avatar?: string;
  platform: PlatformType;
  handle: string;
  niche: string;
  company: string;
  revenueEstimate: number;
  status: 'new' | 'contacted' | 'nurturing' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  temperature: 'cold' | 'warm' | 'hot' | 'ghosted';
  lastContacted: string;
  nextFollowUp: string;
  notes: string;
  painPoints: string;
  offerInterested: string;
  probability: number; // 0 to 100
  tags: string[];
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  type: 'connection_sent' | 'connection_accepted' | 'message_sent' | 'reply_received' | 'call_booked' | 'proposal_sent' | 'note_added';
  description: string;
  platform: PlatformType;
}

export interface Project {
  id: string;
  name: string;
  clientName: string;
  clientEmail: string;
  status: 'planning' | 'active' | 'review' | 'completed';
  deadline: string;
  remainingDays: number;
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  progress: number; // 0 to 100
  priority: 'low' | 'average' | 'high';
  aiRiskAnalysis: string;
  value: number;
  tasks: ProjectTask[];
  milestones: ProjectMilestone[];
}

export interface ProjectTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export interface FollowUp {
  id: string;
  leadId: string;
  leadName: string;
  platform: PlatformType;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  aiSuggestion: string;
  streakValue: number;
}

export interface RevenueMetric {
  mrr: number;
  closedDealsCount: number;
  totalRevenue: number;
  forecastedRevenue: number;
  averageDealSize: number;
  sourceBreakdown: {
    linkedin: number;
    instagram: number;
    referrals: number;
    other: number;
  };
}

export interface NotificationItem {
  id: string;
  type: 'followup_reminder' | 'deadline_alert' | 'hot_activity' | 'revenue_milestone' | 'ai_recommendation' | 'missed_opportunity';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  severity: 'info' | 'warning' | 'success' | 'alert';
}

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
  badgeColor: string;
  xpValue: number;
}

export interface DailyTracker {
  id: string;
  action: string;
  completed: boolean;
  targetCount: number;
  currentCount: number;
  xpPoints: number;
  category: 'outreach' | 'delivery' | 'mindset';
}

export interface AIInsightMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
