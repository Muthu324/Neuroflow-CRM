import Card from '../ui/Card'

/**
 * AiInsights Component
 * AI-powered insights and recommendations
 */
export const AiInsights = () => {
  const insights = [
    { type: 'opportunity', icon: '💡', text: 'LinkedIn engagement rates up 34% - increase LinkedIn outreach', color: '#6366F1' },
    { type: 'warning', icon: '⚠️', text: 'Email campaign underperforming - A/B test subject lines', color: '#F59E0B' },
    { type: 'success', icon: '✓', text: 'Instagram strategy working - 3x ROI on recent campaign', color: '#10B981' },
    { type: 'action', icon: '→', text: 'Follow up with 12 leads cold in next 48 hours', color: '#06B6D4' },
  ]

  return (
    <Card className="p-6">
      <h3 className="text-sm font-semibold text-[#F1F5F9] mb-4 flex items-center gap-2">
        <span className="text-lg">🤖</span>
        AI Insights
      </h3>
      <div className="space-y-3">
        {insights.map((insight, i) => (
          <div
            key={i}
            className="flex gap-3 p-3 rounded-lg border"
            style={{
              borderColor: `${insight.color}30`,
              background: `${insight.color}08`,
            }}
          >
            <span className="text-lg flex-shrink-0">{insight.icon}</span>
            <p className="text-xs text-[#94A3B8] leading-relaxed">{insight.text}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default AiInsights
