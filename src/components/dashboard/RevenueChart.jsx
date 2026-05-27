import Card from '../ui/Card'

/**
 * RevenueChart Component
 * Displays revenue trend chart
 */
export const RevenueChart = ({ title = 'Revenue Trend', data = [] }) => {
  // Chart data for visual representation
  const mockBars = [
    { month: 'Jan', value: 45, height: '45%' },
    { month: 'Feb', value: 52, height: '52%' },
    { month: 'Mar', value: 48, height: '48%' },
    { month: 'Apr', value: 61, height: '61%' },
    { month: 'May', value: 55, height: '55%' },
    { month: 'Jun', value: 67, height: '67%' },
  ]

  return (
    <Card className="p-6 lg:col-span-2">
      <h3 className="text-sm font-semibold text-[#F1F5F9] mb-4">{title}</h3>
      <div className="flex items-end justify-between h-48 gap-2">
        {mockBars.map((bar, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className="w-full bg-gradient-to-t from-[#6366F1] to-[#8B5CF6] rounded-t-lg opacity-80 hover:opacity-100 transition-opacity" style={{ height: bar.height }} />
            <div className="text-xs text-[#94A3B8] mt-2">{bar.month}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default RevenueChart
