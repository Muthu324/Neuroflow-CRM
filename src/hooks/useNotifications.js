/**
 * useNotifications Hook
 * Manages notifications state
 */
import { useState, useCallback } from 'react'

const DEFAULT_NOTIFICATIONS = [
  { id: 1, type: 'success', title: 'Lead Converted', message: 'John Smith converted to customer', time: '2 hours ago', read: false },
  { id: 2, type: 'info', title: 'New Message', message: 'Sarah sent you a message', time: '4 hours ago', read: false },
  { id: 3, type: 'warning', title: 'Low Performance', message: 'Email campaign underperforming', time: '1 day ago', read: true },
]

export const useNotifications = () => {
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATIONS)

  const addNotification = useCallback((notification) => {
    setNotifications(prev => [
      { id: Date.now(), read: false, ...notification },
      ...prev,
    ])
  }, [])

  const markAsRead = useCallback((id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })))
  }, [])

  const deleteNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  return {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    unreadCount,
  }
}

export default useNotifications
