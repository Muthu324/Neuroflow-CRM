import Card from '../ui/Card'
import Button from '../ui/Button'

/**
 * LeadTable Component
 * Displays leads in a table format
 */
export const LeadTable = ({ leads = [] }) => {
  const defaultLeads = [
    { id: 1, name: 'John Smith', email: 'john@example.com', company: 'Tech Corp', status: 'hot', value: '$5,000' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', company: 'Design Inc', status: 'warm', value: '$3,500' },
    { id: 3, name: 'Mike Brown', email: 'mike@example.com', company: 'StartUp Co', status: 'cold', value: '$1,200' },
    { id: 4, name: 'Lisa Chen', email: 'lisa@example.com', company: 'Global Ltd', status: 'hot', value: '$8,000' },
  ]

  const displayLeads = leads.length > 0 ? leads : defaultLeads

  const getStatusColor = (status) => {
    const colors = {
      hot: 'bg-[#EF4444]/10 text-[#EF4444]',
      warm: 'bg-[#F59E0B]/10 text-[#F59E0B]',
      cold: 'bg-[#06B6D4]/10 text-[#06B6D4]',
    }
    return colors[status] || colors.cold
  }

  return (
    <Card className="p-6 overflow-x-auto">
      <h3 className="text-sm font-semibold text-[#F1F5F9] mb-4">Recent Leads</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/6">
            <th className="text-left text-xs font-semibold text-[#94A3B8] py-3 px-4">Name</th>
            <th className="text-left text-xs font-semibold text-[#94A3B8] py-3 px-4">Email</th>
            <th className="text-left text-xs font-semibold text-[#94A3B8] py-3 px-4">Company</th>
            <th className="text-left text-xs font-semibold text-[#94A3B8] py-3 px-4">Status</th>
            <th className="text-left text-xs font-semibold text-[#94A3B8] py-3 px-4">Value</th>
            <th className="text-left text-xs font-semibold text-[#94A3B8] py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {displayLeads.map((lead, i) => (
            <tr key={lead.id} className="border-b border-white/6 hover:bg-white/3 transition-colors">
              <td className="py-3 px-4 text-[#F1F5F9]">{lead.name}</td>
              <td className="py-3 px-4 text-[#94A3B8]">{lead.email}</td>
              <td className="py-3 px-4 text-[#94A3B8]">{lead.company}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                  {lead.status}
                </span>
              </td>
              <td className="py-3 px-4 text-[#F1F5F9] font-medium">{lead.value}</td>
              <td className="py-3 px-4">
                <button className="text-[#6366F1] hover:text-[#8B5CF6] transition-colors text-xs font-medium">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}

export default LeadTable
