import Card from '../ui/Card'

/**
 * LinkedinCRM Component
 * LinkedIn-specific CRM features
 */
export const LinkedinCRM = () => {
  const stats = [
    { label: 'Profile Views', value: '1,234' },
    { label: 'Connection Requests', value: '89' },
    { label: 'Message Opens', value: '2,847' },
    { label: 'Engagement Rate', value: '8.9%' },
  ]

  const recentActivity = [
    { user: 'Sarah Anderson', action: 'accepted connection', time: '2 hours ago' },
    { user: 'Michael Chen', action: 'viewed profile', time: '5 hours ago' },
    { user: 'Emma Rodriguez', action: 'message opened', time: '8 hours ago' },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#F1F5F9] mb-6">LinkedIn CRM</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="p-4 text-center">
            <div className="text-sm text-[#94A3B8] mb-2">{stat.label}</div>
            <div className="text-2xl font-bold text-[#F1F5F9]">{stat.value}</div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-sm font-semibold text-[#F1F5F9] mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, i) => (
            <div key={i} className="flex items-center justify-between pb-4 border-b border-white/6 last:border-0">
              <div>
                <div className="text-sm font-medium text-[#F1F5F9]">{activity.user}</div>
                <div className="text-xs text-[#94A3B8]">{activity.action}</div>
              </div>
              <div className="text-xs text-[#475569]">{activity.time}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default LinkedinCRM
