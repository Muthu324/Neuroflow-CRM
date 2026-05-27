import Card from '../ui/Card'

/**
 * InstagramCRM Component
 * Instagram-specific CRM features
 */
export const InstagramCRM = () => {
  const stats = [
    { label: 'Followers', value: '5,420' },
    { label: 'Reach', value: '28.5K' },
    { label: 'Engagement', value: '3.2%' },
    { label: 'Saved', value: '892' },
  ]

  const campaigns = [
    { name: 'Summer Collection', performance: 'High', engagement: '4.8%' },
    { name: 'Flash Sale', performance: 'Medium', engagement: '2.1%' },
    { name: 'Brand Awareness', performance: 'Low', engagement: '1.5%' },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#F1F5F9] mb-6">Instagram CRM</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="p-4 text-center">
            <div className="text-sm text-[#94A3B8] mb-2">{stat.label}</div>
            <div className="text-2xl font-bold text-[#F1F5F9]">{stat.value}</div>
          </Card>
        ))}
      </div>

      {/* Campaigns */}
      <Card className="p-6">
        <h3 className="text-sm font-semibold text-[#F1F5F9] mb-4">Active Campaigns</h3>
        <div className="space-y-4">
          {campaigns.map((campaign, i) => (
            <div key={i} className="flex items-center justify-between pb-4 border-b border-white/6 last:border-0">
              <div>
                <div className="text-sm font-medium text-[#F1F5F9]">{campaign.name}</div>
                <div className="text-xs text-[#94A3B8]">Engagement: {campaign.engagement}</div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                campaign.performance === 'High'
                  ? 'bg-[#10B981]/10 text-[#10B981]'
                  : campaign.performance === 'Medium'
                  ? 'bg-[#F59E0B]/10 text-[#F59E0B]'
                  : 'bg-[#EF4444]/10 text-[#EF4444]'
              }`}>
                {campaign.performance}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default InstagramCRM
