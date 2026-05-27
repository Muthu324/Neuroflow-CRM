import Card from '../ui/Card'

/**
 * PlatformPerformance Component
 * Shows platform metrics
 */
export const PlatformPerformance = () => {
  const platforms = [
    { name: 'LinkedIn', leads: 342, icon: '🔗', color: '#0A66C2' },
    { name: 'Instagram', leads: 289, icon: '📱', color: '#E4405F' },
    { name: 'Email', leads: 156, icon: '✉️', color: '#4285F4' },
    { name: 'Referral', leads: 98, icon: '🤝', color: '#10B981' },
  ]

  const total = platforms.reduce((sum, p) => sum + p.leads, 0)

  return (
    <Card className="p-6">
      <h3 className="text-sm font-semibold text-[#F1F5F9] mb-4">Platform Performance</h3>
      <div className="space-y-4">
        {platforms.map((platform, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{platform.icon}</span>
                <span className="text-xs font-medium text-[#F1F5F9]">{platform.name}</span>
              </div>
              <span className="text-xs font-semibold text-[#94A3B8]">{platform.leads}</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]"
                style={{ width: `${(platform.leads / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default PlatformPerformance
