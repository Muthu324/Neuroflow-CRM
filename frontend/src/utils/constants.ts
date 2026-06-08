import { Lead, Project, FollowUp, AchievementBadge, DailyTracker, NotificationItem } from '../types';

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    platform: 'linkedin',
    handle: 'sarah-jenkins-marketing-consulting',
    niche: 'SaaS Founder',
    company: 'ScribeFlow AI',
    revenueEstimate: 14500,
    status: 'negotiation',
    temperature: 'hot',
    lastContacted: '2026-05-28',
    nextFollowUp: '2026-05-31',
    notes: 'Very interested in our AI content integration system. Needs custom API bridges. Had a great call on Tuesday.',
    painPoints: 'Client churn is rising, and content production costs are scaling linearly with user growth.',
    offerInterested: 'Custom AI Automation Suite',
    probability: 85,
    tags: ['SaaS Founder', 'High ticket', 'Warm Lead'],
    timeline: [
      { id: '1', date: '2026-05-15', type: 'connection_sent', description: 'LinkedIn outreach request sent with personalized note on their product launch.', platform: 'linkedin' },
      { id: '2', date: '2026-05-17', type: 'connection_accepted', description: 'Sarah accepted lead and replied with congrats on our profile.', platform: 'linkedin' },
      { id: '3', date: '2026-05-18', type: 'message_sent', description: 'Sent personalized pitch regarding AI-driven content generation strategy.', platform: 'linkedin' },
      { id: '4', date: '2026-05-22', type: 'reply_received', description: 'Sarah responded: "This looks very interesting, our editorial costs are crazy right now. Can we chat?"', platform: 'linkedin' },
      { id: '5', date: '2026-05-25', type: 'call_booked', description: 'Booked discovery call. Value proposition validated.', platform: 'linkedin' },
      { id: '6', date: '2026-05-26', type: 'note_added', description: 'Proposal for $14.5k setup fee pitch sent via email.', platform: 'direct' }
    ]
  },
  {
    id: 'lead-2',
    name: 'David Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    platform: 'instagram',
    handle: 'vance_consulting',
    niche: 'Coach',
    company: 'Peak Performance Group',
    revenueEstimate: 8000,
    status: 'proposal',
    temperature: 'warm',
    lastContacted: '2026-05-29',
    nextFollowUp: '2026-06-02',
    notes: 'Wants to automate DM answers and leads scoring funnel. Skeptical about AI losing human touch, need to emphasize hybrid flow.',
    painPoints: 'Losing 30% of high-intent Instagram leads because of slow response times at night.',
    offerInterested: 'InstaFlow Chatbot Agent',
    probability: 60,
    tags: ['Coach', 'Instagram Funnel'],
    timeline: [
      { id: '1', date: '2026-05-20', type: 'message_sent', description: 'Story reply sent praising their recent reel on high-performance mindset.', platform: 'instagram' },
      { id: '2', date: '2026-05-22', type: 'reply_received', description: 'David liked message and commented on target audience alignment.', platform: 'instagram' },
      { id: '3', date: '2026-05-24', type: 'message_sent', description: 'Presented micro-case study on how we saved 12 hours/week for a similar coaching agency.', platform: 'instagram' },
      { id: '4', date: '2026-05-29', type: 'proposal_sent', description: 'Sent high-level workflow schematic showing the hybrid agent setup.', platform: 'instagram' }
    ]
  },
  {
    id: 'lead-3',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    platform: 'linkedin',
    handle: 'elena-rostova-growth-marketing',
    niche: 'Agency',
    company: 'NexusMedia Studio',
    revenueEstimate: 18000,
    status: 'closed_won',
    temperature: 'hot',
    lastContacted: '2026-05-29',
    nextFollowUp: '2026-06-15',
    notes: 'Contract signed! Starting workflow audit next Monday. Project kick-off complete.',
    painPoints: 'Manual client onboarding is highly redundant and consumes massive project manager bandwidth.',
    offerInterested: 'Enterprise Workflow Automation Engine',
    probability: 100,
    tags: ['Agency', 'High ticket', 'SaaS Founder'],
    timeline: [
      { id: '1', date: '2026-05-10', type: 'connection_sent', description: 'Connected on LinkedIn.', platform: 'linkedin' },
      { id: '2', date: '2026-05-12', type: 'message_sent', description: 'Sent personalized loom showing automation errors on their checkout pages.', platform: 'linkedin' },
      { id: '3', date: '2026-05-13', type: 'reply_received', description: 'Elena: "You completely caught us here. This is a severe leak. Chat on Monday?"', platform: 'linkedin' },
      { id: '4', date: '2026-05-16', type: 'call_booked', description: 'Discovery call completed. Clear alignment on pain points.', platform: 'linkedin' },
      { id: '5', date: '2026-05-20', type: 'proposal_sent', description: 'Pushed workflow architecture doc and proposal for $18,000.', platform: 'direct' },
      { id: '6', date: '2026-05-29', type: 'note_added', description: 'Contract signed and down payment received.', platform: 'direct' }
    ]
  },
  {
    id: 'lead-4',
    name: 'Marcus Brody',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    platform: 'linkedin',
    handle: 'marcus-brody-consulting',
    niche: 'Creator',
    company: 'AeroVisuals',
    revenueEstimate: 5000,
    status: 'nurturing',
    temperature: 'ghosted',
    lastContacted: '2026-05-15',
    nextFollowUp: '2026-06-05',
    notes: 'Appeared extremely hot initially during outreach, but disappeared after proposal was mentioned. Need to re-engage with extreme low-friction value.',
    painPoints: 'Spends too much time editing video descriptions, tagging, and resizing for multiple platforms.',
    offerInterested: 'AI Content Distribution Engine',
    probability: 25,
    tags: ['Creator', 'Ghosted'],
    timeline: [
      { id: '1', date: '2026-05-01', type: 'connection_sent', description: 'Connected.', platform: 'linkedin' },
      { id: '2', date: '2026-05-03', type: 'message_sent', description: 'Shared free AI asset script helper.', platform: 'linkedin' },
      { id: '3', date: '2026-05-15', type: 'message_sent', description: 'Followed up with sample outputs. No response.', platform: 'linkedin' }
    ]
  },
  {
    id: 'lead-5',
    name: 'Tina Alvarez',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    platform: 'instagram',
    handle: 'tina_digital_creative',
    niche: 'Agency',
    company: 'Alvarez Lab',
    revenueEstimate: 9500,
    status: 'contacted',
    temperature: 'warm',
    lastContacted: '2026-05-30',
    nextFollowUp: '2026-06-01',
    notes: 'Discussing cold email pipeline audit. Responded to our automation reel. High budget potential.',
    painPoints: 'Deliverability on cold campaigns dropped to 45% due to domain burn.',
    offerInterested: 'Email Infrastructure Setup',
    probability: 45,
    tags: ['Agency', 'Warm Lead'],
    timeline: [
      { id: '1', date: '2026-05-28', type: 'message_sent', description: 'Replied to her story about launch stress.', platform: 'instagram' },
      { id: '2', date: '2026-05-29', type: 'reply_received', description: 'Tina: "Literally dying running 12 campaigns by myself."', platform: 'instagram' },
      { id: '3', date: '2026-05-30', type: 'message_sent', description: 'Shared our automated DNS verification sequence.', platform: 'instagram' }
    ]
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'project-1',
    name: 'NexusMedia Workflow Automation',
    clientName: 'Elena Rostova',
    clientEmail: 'elena@nexusmedia.studio',
    status: 'active',
    deadline: '2026-06-25',
    remainingDays: 26,
    paymentStatus: 'partial',
    progress: 35,
    priority: 'high',
    aiRiskAnalysis: 'LOW RISK: Client is highly responsive and content templates were provided ahead of schedule. Payment terms are verified.',
    value: 18000,
    tasks: [
      { id: 't-1', title: 'Onboarding audit and tool cataloging', completed: true },
      { id: 't-2', title: 'Build automated onboarding forms in Webflow/Typeform', completed: true },
      { id: 't-3', title: 'Establish central Postgres customer log routing via Make.com', completed: false },
      { id: 't-4', title: 'Write custom Gemini-powered bios generator script', completed: false },
      { id: 't-5', title: 'Final testing & team handover session', completed: false }
    ],
    milestones: [
      { id: 'm-1', title: 'Funnels audit checkoff', dueDate: '2026-06-05', completed: true },
      { id: 'm-2', title: 'Core routing engine deliverable', dueDate: '2026-06-15', completed: false },
      { id: 'm-3', title: 'Full launch & training', dueDate: '2026-06-24', completed: false }
    ]
  },
  {
    id: 'project-2',
    name: 'AeroVisuals AI Multiplier',
    clientName: 'Marcus Brody',
    clientEmail: 'marcus@aerovisuals.co',
    status: 'planning',
    deadline: '2026-07-10',
    remainingDays: 41,
    paymentStatus: 'unpaid',
    progress: 10,
    priority: 'average',
    aiRiskAnalysis: 'MEDIUM RISK: High volume of technical requirements. Marcus is currently slow to respond on DM. Need to secure official contract sign-off before coding deep scripts.',
    value: 5000,
    tasks: [
      { id: 't-1', title: 'Video API documentation reading', completed: true },
      { id: 't-2', title: 'Establish AWS S3 content ingestion bucket', completed: false },
      { id: 't-3', title: 'V2 edit API webhook script', completed: false }
    ],
    milestones: [
      { id: 'm-1', title: 'Ingestion blueprint validation', dueDate: '2026-06-20', completed: false },
      { id: 'm-2', title: 'Dynamic processor launch', dueDate: '2026-07-08', completed: false }
    ]
  }
];

export const INITIAL_FOLLOWUPS: FollowUp[] = [
  {
    id: 'f-1',
    leadId: 'lead-1',
    leadName: 'Sarah Jenkins',
    platform: 'linkedin',
    dueDate: '2026-05-31',
    status: 'pending',
    priority: 'high',
    aiSuggestion: 'Sarah is awaiting the final custom API integrations list. Reply with the specific list of 4 tools we support (Make, Zapier, HubSpot, Notion) to secure contract signature.',
    streakValue: 5
  },
  {
    id: 'f-2',
    leadId: 'lead-2',
    leadName: 'David Vance',
    platform: 'instagram',
    dueDate: '2026-06-02',
    status: 'pending',
    priority: 'medium',
    aiSuggestion: 'David commented that he is concerned about "bot-sounding replies". Send him a screenshot of our hybrid inbox control screen showing how easily a human can take over at any time.',
    streakValue: 3
  },
  {
    id: 'f-3',
    leadId: 'lead-5',
    leadName: 'Tina Alvarez',
    platform: 'instagram',
    dueDate: '2026-06-01',
    status: 'pending',
    priority: 'high',
    aiSuggestion: 'Offer a free 15-minute deliverability audit to inspect their SPF and DKIM tags. Absolute no-brainer hook that closes warm agency leads.',
    streakValue: 12
  }
];

export const ACHIEVEMENT_BADGES: AchievementBadge[] = [
  {
    id: 'badge-1',
    name: 'LinkedIn Outreacher Elite',
    description: 'Send 50 high-quality, non-spammy personalized messages on LinkedIn',
    icon: 'Linkedin',
    unlockedAt: '2026-05-25',
    badgeColor: 'from-[#0A66C2] to-blue-500',
    xpValue: 500
  },
  {
    id: 'badge-2',
    name: 'Insta Closer',
    description: 'Deals closed directly initiated from Instagram DMS',
    icon: 'Instagram',
    unlockedAt: '2026-04-12',
    badgeColor: 'from-[#E1306C] via-[#C13584] to-[#F77737]',
    xpValue: 750
  },
  {
    id: 'badge-3',
    name: 'Outreach Sprint King',
    description: 'Maintain an Outreach Action Streak of over 10 days',
    icon: 'Flame',
    unlockedAt: '2026-05-29',
    badgeColor: 'from-amber-500 to-rose-600',
    xpValue: 1000
  },
  {
    id: 'badge-4',
    name: 'Workflow Architect',
    description: 'Complete 3 seamless workflow integration projects with positive feedback',
    icon: 'Cpu',
    unlockedAt: null,
    badgeColor: 'from-purple-500 to-indigo-600',
    xpValue: 1500
  }
];

export const DAILY_TRACKERS: DailyTracker[] = [
  { id: 'd-1', action: 'Personalized LinkedIn DMs', completed: false, targetCount: 15, currentCount: 8, xpPoints: 150, category: 'outreach' },
  { id: 'd-2', action: 'Instagram Story replies & engagement', completed: true, targetCount: 10, currentCount: 10, xpPoints: 100, category: 'outreach' },
  { id: 'd-3', action: 'Review active client deliverable status', completed: true, targetCount: 1, currentCount: 1, xpPoints: 50, category: 'delivery' },
  { id: 'd-4', action: 'Write daily system growth insights log', completed: false, targetCount: 1, currentCount: 0, xpPoints: 80, category: 'mindset' }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    type: 'followup_reminder',
    title: 'High Intent Follow-Up Due',
    message: 'Sarah Jenkins (Scribeflow AI) follow-up is due soon. High-ticket deal closing chance: 85%.',
    timestamp: '2 hours ago',
    read: false,
    severity: 'alert'
  },
  {
    type: 'revenue_milestone',
    id: 'n-2',
    title: 'Closed Deal Alert 🚀',
    message: 'NexusMedia workflow contract finalized for $18,000. 50% deposit cleared.',
    timestamp: '1 day ago',
    read: false,
    severity: 'success'
  },
  {
    type: 'ai_recommendation',
    id: 'n-3',
    title: 'AI Pipeline Strategy Alert',
    message: 'Agency niches are performing 40% better than Coaching niches in your local funnel this month. Target more agencies on LinkedIn.',
    timestamp: '2 days ago',
    read: true,
    severity: 'info'
  },
  {
    type: 'deadline_alert',
    id: 'n-4',
    title: 'Project Deadline Alert',
    message: 'NexusMedia Workflow Automation code integration deadline is approaching in 26 days.',
    timestamp: '3 days ago',
    read: true,
    severity: 'warning'
  }
];
