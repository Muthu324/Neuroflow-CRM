import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lead, Project, FollowUp, AchievementBadge, DailyTracker, NotificationItem } from '../types';
import { 
  INITIAL_LEADS, 
  INITIAL_PROJECTS, 
  INITIAL_FOLLOWUPS, 
  ACHIEVEMENT_BADGES, 
  DAILY_TRACKERS, 
  INITIAL_NOTIFICATIONS 
} from '../utils/constants';

interface AppContextType {
  leads: Lead[];
  projects: Project[];
  followups: FollowUp[];
  notifications: NotificationItem[];
  badges: AchievementBadge[];
  trackers: DailyTracker[];
  xp: number;
  streak: number;
  theme: 'dark' | 'light';
  addLead: (lead: Omit<Lead, 'id' | 'timeline'>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  toggleProjectTask: (projectId: string, taskId: string) => void;
  addLeadTimelineEvent: (leadId: string, eventType: any, description: string) => void;
  toggleDailyTracker: (id: string) => void;
  addXP: (amount: number) => void;
  toggleTheme: () => void;
  addNotification: (title: string, message: string, severity: NotificationItem['severity'], type?: NotificationItem['type']) => void;
  markNotificationsAsRead: () => void;
  addFollowUp: (followUp: Omit<FollowUp, 'id'>) => void;
  completeFollowUp: (id: string) => void;
  resetState: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

let idCounter = 0;
const generateUniqueId = (prefix: string): string => {
  idCounter++;
  const randomSuffix = Math.random().toString(36).substring(2, 9);
  return `${prefix}-${Date.now()}-${idCounter}-${randomSuffix}`;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>(() => {
    const data = localStorage.getItem('neuroflow_leads');
    return data ? JSON.parse(data) : INITIAL_LEADS;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const data = localStorage.getItem('neuroflow_projects');
    return data ? JSON.parse(data) : INITIAL_PROJECTS;
  });

  const [followups, setFollowups] = useState<FollowUp[]>(() => {
    const data = localStorage.getItem('neuroflow_followups');
    return data ? JSON.parse(data) : INITIAL_FOLLOWUPS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const data = localStorage.getItem('neuroflow_notifications');
    return data ? JSON.parse(data) : INITIAL_NOTIFICATIONS;
  });

  const [badges, setBadges] = useState<AchievementBadge[]>(() => {
    const data = localStorage.getItem('neuroflow_badges');
    return data ? JSON.parse(data) : ACHIEVEMENT_BADGES;
  });

  const [trackers, setTrackers] = useState<DailyTracker[]>(() => {
    const data = localStorage.getItem('neuroflow_trackers');
    return data ? JSON.parse(data) : DAILY_TRACKERS;
  });

  const [xp, setXp] = useState<number>(() => {
    const data = localStorage.getItem('neuroflow_xp');
    return data ? parseInt(data, 10) : 1850; // Starting XP representation
  });

  const [streak, setStreak] = useState<number>(() => {
    const data = localStorage.getItem('neuroflow_streak');
    return data ? parseInt(data, 10) : 12; // Starting daily streak
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const data = localStorage.getItem('neuroflow_theme');
    return (data as 'dark' | 'light') || 'dark';
  });

  // Sync state with LocalStorage
  useEffect(() => {
    localStorage.setItem('neuroflow_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('neuroflow_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('neuroflow_followups', JSON.stringify(followups));
  }, [followups]);

  useEffect(() => {
    localStorage.setItem('neuroflow_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('neuroflow_badges', JSON.stringify(badges));
  }, [badges]);

  useEffect(() => {
    localStorage.setItem('neuroflow_trackers', JSON.stringify(trackers));
  }, [trackers]);

  useEffect(() => {
    localStorage.setItem('neuroflow_xp', xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem('neuroflow_streak', streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem('neuroflow_theme', theme);
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Actions
  const addLead = (leadDetails: Omit<Lead, 'id' | 'timeline'>) => {
    const newLead: Lead = {
      ...leadDetails,
      id: generateUniqueId('lead'),
      timeline: [
        {
          id: generateUniqueId('t-init'),
          date: new Date().toISOString().split('T')[0],
          type: 'note_added',
          description: 'Lead profile initiated in CRM database successfully.',
          platform: leadDetails.platform
        }
      ]
    };
    setLeads(prev => [newLead, ...prev]);
    addXP(100);
    addNotification(
      'New Lead Added', 
      `${leadDetails.name} added to ${leadDetails.platform} leads lists. CRM timeline launched.`, 
      'success',
      'hot_activity'
    );
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        // Trigger congratulations notification if status is updated to Closed Won
        if (updates.status === 'closed_won' && lead.status !== 'closed_won') {
          addNotification(
            'High Ticket Closed Won! 🚀',
            `Congratulations! You closed ${lead.name} for ${updates.revenueEstimate || lead.revenueEstimate}. Progress logged to revenue center.`,
            'success',
            'revenue_milestone'
          );
          addXP(800);
          
          // Auto create a client project!
          const newProjValue = updates.revenueEstimate || lead.revenueEstimate;
          const newProj: Project = {
            id: generateUniqueId('project'),
            name: `${lead.company || lead.name} system setup`,
            clientName: lead.name,
            clientEmail: `${lead.name.toLowerCase().replace(' ', '')}@gmail.com`,
            status: 'planning',
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            remainingDays: 30,
            paymentStatus: 'partial',
            progress: 15,
            priority: 'average',
            aiRiskAnalysis: 'LOW RISK: New setup initiative. Prompt templates configured. Client verified budget.',
            value: newProjValue,
            tasks: [
              { id: 'tk-1', title: 'Onboarding handover audit', completed: true },
              { id: 'tk-2', title: 'Custom prompt integrations sandbox configuration', completed: false },
              { id: 'tk-3', title: 'Final system deployment & client sign-off', completed: false }
            ],
            milestones: [
              { id: 'ml-1', title: 'Onboarding', dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], completed: true },
              { id: 'ml-2', title: 'System Handover', dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], completed: false }
            ]
          };
          setProjects(projPrev => [newProj, ...projPrev]);
        }
        return { ...lead, ...updates };
      }
      return lead;
    }));
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
    addNotification('Lead Removed', 'Lead profile was archived from local directories.', 'info');
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const toggleProjectTask = (projectId: string, taskId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const updatedTasks = p.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
        const completedCount = updatedTasks.filter(t => t.completed).length;
        const progress = Math.round((completedCount / updatedTasks.length) * 100);
        
        // Trigger notification if complete
        if (progress === 100 && p.progress !== 100) {
          addNotification('Project Complete! 🏆', `${p.name} deliverables are fully completed. Releasing final invoice draft.`, 'success', 'deadline_alert');
          addXP(500);
        } else {
          addXP(30);
        }

        return {
          ...p,
          tasks: updatedTasks,
          progress
        };
      }
      return p;
    }));
  };

  const addLeadTimelineEvent = (leadId: string, eventType: any, description: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        return {
          ...l,
          timeline: [
            ...l.timeline,
            {
              id: generateUniqueId('t-event'),
              date: new Date().toISOString().split('T')[0],
              type: eventType,
              description,
              platform: l.platform
            }
          ]
        };
      }
      return l;
    }));
  };

  const toggleDailyTracker = (id: string) => {
    setTrackers(prev => prev.map(t => {
      if (t.id === id) {
        const nextCompleted = !t.completed;
        const nextCount = nextCompleted ? t.targetCount : Math.max(0, t.currentCount - 1);
        if (nextCompleted) {
          addXP(t.xpPoints);
          
          // Streak dynamic award check
          const allCompleted = prev.every(item => item.id === id ? true : item.completed);
          if (allCompleted) {
            setStreak(s => s + 1);
            addXP(250);
            addNotification('Outreach Streak Levelled! 🔥', 'You ticked off 100% of your daily outreach targets today! Bonus XP applied.', 'success', 'followup_reminder');
          }
        }
        return {
          ...t,
          completed: nextCompleted,
          currentCount: nextCount
        };
      }
      return t;
    }));
  };

  const addXP = (amount: number) => {
    setXp(prev => {
      const currentLevel = Math.floor(prev / 1000) + 1;
      const nextXp = prev + amount;
      const nextLevel = Math.floor(nextXp / 1000) + 1;

      if (nextLevel > currentLevel) {
        // Unlock next tier achievement dynamically
        addNotification(
          `System Levelled Up: Tier ${nextLevel}! 🛡️`,
          `Your outreach operating score has scaled. Standard pricing estimates upgraded by 10%.`,
          'success',
          'ai_recommendation'
        );
        
        // Unlock badge if Level 3
        if (nextLevel === 3) {
          setBadges(bPrev => bPrev.map(b => b.id === 'badge-4' ? { ...b, unlockedAt: new Date().toISOString().split('T')[0] } : b));
        }
      }
      return nextXp;
    });
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const addNotification = (
    title: string, 
    message: string, 
    severity: NotificationItem['severity'],
    type: NotificationItem['type'] = 'hot_activity'
  ) => {
    const freshNotif: NotificationItem = {
      id: generateUniqueId('notif'),
      type,
      title,
      message,
      timestamp: 'Just now',
      read: false,
      severity
    };
    setNotifications(prev => [freshNotif, ...prev]);
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addFollowUp = (item: Omit<FollowUp, 'id'>) => {
    const fUp: FollowUp = {
      ...item,
      id: generateUniqueId('fup')
    };
    setFollowups(prev => [fUp, ...prev]);
  };

  const completeFollowUp = (id: string) => {
    setFollowups(prev => prev.filter(f => f.id !== id));
    addXP(100);
    addNotification('Follow-Up Completed', 'Conversation logged and pipeline streak strengthened.', 'success');
  };

  const resetState = () => {
    localStorage.removeItem('neuroflow_leads');
    localStorage.removeItem('neuroflow_projects');
    localStorage.removeItem('neuroflow_followups');
    localStorage.removeItem('neuroflow_notifications');
    localStorage.removeItem('neuroflow_badges');
    localStorage.removeItem('neuroflow_trackers');
    localStorage.removeItem('neuroflow_xp');
    localStorage.removeItem('neuroflow_streak');
    
    setLeads(INITIAL_LEADS);
    setProjects(INITIAL_PROJECTS);
    setFollowups(INITIAL_FOLLOWUPS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setBadges(ACHIEVEMENT_BADGES);
    setTrackers(DAILY_TRACKERS);
    setXp(1850);
    setStreak(12);
    
    addNotification('System Purged ⚙️', 'All dynamic profiles, CRM databases, and project streams reset to default operating values.', 'info');
  };

  return (
    <AppContext.Provider value={{
      leads,
      projects,
      followups,
      notifications,
      badges,
      trackers,
      xp,
      streak,
      theme,
      addLead,
      updateLead,
      deleteLead,
      updateProject,
      toggleProjectTask,
      addLeadTimelineEvent,
      toggleDailyTracker,
      addXP,
      toggleTheme,
      addNotification,
      markNotificationsAsRead,
      addFollowUp,
      completeFollowUp,
      resetState
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppState must be used inside AppProvider');
  return context;
};
