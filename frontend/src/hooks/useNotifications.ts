import { useCallback } from 'react';
import { useData } from '../app/dataContext';

export function useNotifications() {
  const {
    notifications,
    unreadNotificationCount,
    fetchNotifications,
    markNotificationsAsRead,
    isLoading,
    error,
    clearError,
  } = useData();

  return {
    notifications,
    unreadCount: unreadNotificationCount,
    isLoading,
    error,
    clearError,
    fetchNotifications,
    markNotificationsAsRead
  };
}
