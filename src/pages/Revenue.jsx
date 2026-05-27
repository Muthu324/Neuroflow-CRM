import Card from '../components/ui/Card'

export const Revenue = () => {
  const revenueData = [
    { month: 'January', amount: '$12,500', change: '+5%', growth: true },
    { month: 'February', amount: '$14,200', change: '+13.6%', growth: true },
    { month: 'March', amount: '$13,800', change: '-2.8%', growth: false },
    { month: 'April', amount: '$18,900', change: '+36.9%', growth: true },
    { month: 'May', amount: '$21,400', change: '+13.2%', growth: true },
    { month: 'June', amount: '$24,700', change: '+15.4%', growth: true },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#F1F5F9]">Revenue Analytics</h2>

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {revenueData.map((item, i) => (
            <div key={i} className="p-4 border border-white/6 rounded-lg">
              <div className="text-sm text-[#94A3B8] mb-2">{item.month}</div>
              <div className="text-2xl font-bold text-[#F1F5F9]">{item.amount}</div>
              <div className={`text-xs font-medium mt-2 ${item.growth ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                {item.change}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default Revenue
