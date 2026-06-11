import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Lead, Project, FollowUp, NotificationItem } from '../types';
import apiClient from '../services/apiClient';

interface DataContextType {
  // State
  leads: Lead[];
  projects: Project[];
  followups: FollowUp[];
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  
  // Loading/Error states
  isLoading: boolean;
  error: string | null;
  
  // Lead operations
  fetchLeads: (filters?: any) => Promise<void>;
  createLead: (lead: Omit<Lead, 'id' | 'timeline'>) => Promise<Lead>;
  updateLead: (id: string, updates: Partial<Lead>) => Promise<Lead>;
  deleteLead: (id: string) => Promise<void>;
  addLeadTimelineEvent: (leadId: string, eventType: any, description: string) => Promise<void>;
  
  // Project operations
  fetchProjects: (filters?: any) => Promise<void>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<Project>;
  toggleProjectTask: (projectId: string, taskId: string) => Promise<void>;
  
  // Follow-up operations
  fetchFollowUps: () => Promise<void>;
  completeFollowUp: (id: string) => Promise<void>;
  addFollowUp: (followUp: Omit<FollowUp, 'id'>) => Promise<FollowUp>;
  
  // Notification operations
  fetchNotifications: () => Promise<void>;
  markNotificationsAsRead: () => Promise<void>;
  
  // Utility
  clearError: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [followups, setFollowups] = useState<FollowUp[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ========================================================================
  // LEADS OPERATIONS
  // ========================================================================

  const fetchLeads = useCallback(async (filters?: any) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiClient.getLeads(0, 1000, filters);
      setLeads(response.items || []);
    } catch (err: any) {
      const message = err.response?.data?.detail || err.message || 'Failed to fetch leads';
      setError(message);
      console.error('Error fetching leads:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createLead = useCallback(async (lead: Omit<Lead, 'id' | 'timeline'>) => {
    try {
      setError(null);
      const newLead = await apiClient.createLead(lead);
      setLeads(prev => [...prev, newLead]);
      return newLead;
    } catch (err: any) {
      const message = err.response?.data?.detail || err.message || 'Failed to create lead';
      setError(message);
      throw err;
    }
  }, []);

  const updateLead = useCallback(async (id: string, updates: Partial<Lead>) => {
    try {
      setError(null);
      const updated = await apiClient.updateLead(Number(id), updates);
      setLeads(prev => prev.map(l => l.id.toString() === id ? updated : l));
      return updated;
    } catch (err: any) {
      const message = err.response?.data?.detail || err.message || 'Failed to update lead';
      setError(message);
      throw err;
    }
  }, []);

  const deleteLead = useCallback(async (id: string) => {
    try {
      setError(null);
      await apiClient.deleteLead(Number(id));
      setLeads(prev => prev.filter(l => l.id.toString() !== id));
    } catch (err: any) {
      const message = err.response?.data?.detail || err.message || 'Failed to delete lead';
      setError(message);
      throw err;
    }
  }, []);

  const addLeadTimelineEvent = useCallback(async (leadId: string, eventType: any, description: string) => {
    try {
      setError(null);
      await apiClient.addLeadTimelineEvent(Number(leadId), {
        event_type: eventType,
        description,
        platform: 'direct',
      });
      // Refetch the lead to get updated timeline
      const updated = await apiClient.getLead(Number(leadId));
      setLeads(prev => prev.map(l => l.id.toString() === leadId ? updated : l));
    } catch (err: any) {
      const message = err.response?.data?.detail || err.message || 'Failed to add timeline event';
      setError(message);
      throw err;
    }
  }, []);

  // ========================================================================
  // PROJECTS OPERATIONS
  // ========================================================================

  const fetchProjects = useCallback(async (filters?: any) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiClient.getProjects(0, 1000, filters?.status);
      setProjects(response.items || []);
    } catch (err: any) {
      const message = err.response?.data?.detail || err.message || 'Failed to fetch projects';
      setError(message);
      console.error('Error fetching projects:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProject = useCallback(async (id: string, updates: Partial<Project>) => {
    try {
      setError(null);
      const updated = await apiClient.updateProject(Number(id), updates);
      setProjects(prev => prev.map(p => p.id.toString() === id ? updated : p));
      return updated;
    } catch (err: any) {
      const message = err.response?.data?.detail || err.message || 'Failed to update project';
      setError(message);
      throw err;
    }
  }, []);

  const toggleProjectTask = useCallback(async (projectId: string, taskId: string) => {
    try {
      setError(null);
      const project = projects.find(p => p.id.toString() === projectId);
      if (!project) return;

      const task = project.tasks.find(t => t.id === taskId);
      if (!task) return;

      await apiClient.updateProjectTask(Number(projectId), Number(taskId), {
        completed: !task.completed,
      });

      // Refetch project
      const updated = await apiClient.getProject(Number(projectId));
      setProjects(prev => prev.map(p => p.id.toString() === projectId ? updated : p));
    } catch (err: any) {
      const message = err.response?.data?.detail || err.message || 'Failed to update task';
      setError(message);
      throw err;
    }
  }, [projects]);

  // ========================================================================
  // FOLLOW-UPS OPERATIONS
  // ========================================================================

  const fetchFollowUps = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiClient.getFollowUps(0, 1000);
      setFollowups(response.items || []);
    } catch (err: any) {
      const message = err.response?.data?.detail || err.message || 'Failed to fetch follow-ups';
      setError(message);
      console.error('Error fetching follow-ups:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const completeFollowUp = useCallback(async (id: string) => {
    try {
      setError(null);
      await apiClient.completeFollowUp(Number(id));
      setFollowups(prev => prev.map(f => f.id === id ? { ...f, status: 'completed' } : f));
    } catch (err: any) {
      const message = err.response?.data?.detail || err.message || 'Failed to complete follow-up';
      setError(message);
      throw err;
    }
  }, []);

  const addFollowUp = useCallback(async (followUp: Omit<FollowUp, 'id'>) => {
    try {
      setError(null);
      const newFollowUp = await apiClient.createFollowUp(followUp);
      setFollowups(prev => [...prev, newFollowUp]);
      return newFollowUp;
    } catch (err: any) {
      const message = err.response?.data?.detail || err.message || 'Failed to create follow-up';
      setError(message);
      throw err;
    }
  }, []);

  // ========================================================================
  // NOTIFICATIONS OPERATIONS
  // ========================================================================

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await apiClient.getNotifications(0, 100, false);
      setNotifications(response.items || []);
      
      // Get unread count
      const count = await apiClient.getUnreadNotificationCount();
      setUnreadNotificationCount(count);
    } catch (err: any) {
      console.error('Error fetching notifications:', err);
    }
  }, []);

  const markNotificationsAsRead = useCallback(async () => {
    try {
      setError(null);
      const count = await apiClient.markAllNotificationsAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadNotificationCount(0);
    } catch (err: any) {
      const message = err.response?.data?.detail || err.message || 'Failed to mark notifications as read';
      setError(message);
      throw err;
    }
  }, []);

  // ========================================================================
  // INITIALIZATION
  // ========================================================================

 // ========================================================================
  // INITIALIZATION
  // ========================================================================

  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Execute all of your defined operations concurrently on mount
        await Promise.all([
          fetchLeads(),
          fetchProjects(),
          fetchFollowUps(),
          fetchNotifications()
        ]);
      } catch (err: any) {
        console.error('Initialization error:', err);
        setError('Failed to sync data dashboard on startup.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [fetchLeads, fetchProjects, fetchFollowUps, fetchNotifications]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);
  return (
    <DataContext.Provider value={{
      leads,
      projects,
      followups,
      notifications,
      unreadNotificationCount,
      isLoading,
      error,
      fetchLeads,
      createLead,
      updateLead,
      deleteLead,
      addLeadTimelineEvent,
      fetchProjects,
      updateProject,
      toggleProjectTask,
      fetchFollowUps,
      completeFollowUp,
      addFollowUp,
      fetchNotifications,
      markNotificationsAsRead,
      clearError,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
