import Card from '../ui/Card'

/**
 * StatsCards Component
 * Displays key performance metrics
 */
export const StatsCards = ({ stats = [] }) => {
  const defaultStats = [
    { label: 'Total Revenue', value: '$48.5K', change: '+12.5%', icon: '💰', positive: true },
    { label: 'Active Leads', value: '847', change: '+24%', icon: '👥', positive: true },
    { label: 'Conversion Rate', value: '3.8%', change: '+0.5%', icon: '📈', positive: true },
    { label: 'Avg Deal Value', value: '$2.4K', change: '-2.1%', icon: '🎯', positive: false },
  ]

  const displayStats = stats.length > 0 ? stats : defaultStats

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {displayStats.map((stat, i) => (
        <Card key={i} className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-xs text-[#94A3B8] font-medium mb-2">{stat.label}</div>
              <div className="text-2xl font-bold text-[#F1F5F9] mb-2">{stat.value}</div>
              <div className={`text-xs font-medium ${stat.positive ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                {stat.change}
              </div>
            </div>
            <div className="text-3xl opacity-50">{stat.icon}</div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default StatsCards
