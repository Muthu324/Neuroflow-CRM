import Card from '../ui/Card'
import Button from '../ui/Button'

/**
 * Followups Component
 * Follow-up task management
 */
export const Followups = () => {
  const followups = [
    { id: 1, lead: 'John Smith', task: 'Send proposal', dueIn: '2 hours', priority: 'high' },
    { id: 2, lead: 'Sarah Johnson', task: 'Schedule call', dueIn: '1 day', priority: 'medium' },
    { id: 3, lead: 'Mike Brown', task: 'Follow up email', dueIn: '3 days', priority: 'low' },
    { id: 4, lead: 'Lisa Chen', task: 'Contract review', dueIn: '5 hours', priority: 'high' },
  ]

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-[#EF4444]/10 text-[#EF4444]',
      medium: 'bg-[#F59E0B]/10 text-[#F59E0B]',
      low: 'bg-[#10B981]/10 text-[#10B981]',
    }
    return colors[priority] || colors.low
  }

  return (
    <Card className="p-6">
      <h3 className="text-sm font-semibold text-[#F1F5F9] mb-4">Upcoming Follow-ups</h3>
      <div className="space-y-3">
        {followups.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between p-3 rounded-lg border border-white/6 hover:border-[#6366F1]/30 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <div>
                  <div className="text-sm font-medium text-[#F1F5F9]">{item.task}</div>
                  <div className="text-xs text-[#94A3B8]">{item.lead}</div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                {item.priority}
              </span>
              <div className="text-xs text-[#94A3B8] min-w-fit">{item.dueIn}</div>
            </div>
          </div>
        ))}
      </div>
      <Button variant="primary" className="w-full mt-4">
        Add Follow-up
      </Button>
    </Card>
  )
}

export default Followups
