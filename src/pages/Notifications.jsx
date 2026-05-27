import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

export const Notifications = ({ notifications = [], setNotifications }) => {
  const defaultNotifications = [
    { id: 1, type: 'success', title: 'Lead Converted', message: 'John Smith converted to customer', time: '2 hours ago', read: false },
    { id: 2, type: 'info', title: 'New Message', message: 'Sarah sent you a message', time: '4 hours ago', read: false },
    { id: 3, type: 'warning', title: 'Low Performance', message: 'Email campaign underperforming', time: '1 day ago', read: true },
  ]

  const displayNotifications = notifications.length > 0 ? notifications : defaultNotifications

  const getTypeColor = (type) => {
    const colors = {
      success: 'bg-[#10B981]/10 text-[#10B981]',
      info: 'bg-[#06B6D4]/10 text-[#06B6D4]',
      warning: 'bg-[#F59E0B]/10 text-[#F59E0B]',
      error: 'bg-[#EF4444]/10 text-[#EF4444]',
    }
    return colors[type] || colors.info
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#F1F5F9]">Notifications</h2>
        <Button variant="ghost" onClick={() => setNotifications([])}>Clear All</Button>
      </div>

      <div className="space-y-3">
        {displayNotifications.map(notification => (
          <Card
            key={notification.id}
            className={`p-4 ${!notification.read ? 'border-[#6366F1]/50' : ''}`}
          >
            <div className="flex items-start gap-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                {notification.type}
              </span>
              <div className="flex-1">
                <h3 className="font-medium text-[#F1F5F9]">{notification.title}</h3>
                <p className="text-sm text-[#94A3B8] mt-1">{notification.message}</p>
                <p className="text-xs text-[#475569] mt-2">{notification.time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Notifications
