import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export const Leads = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#F1F5F9]">Leads Management</h2>
        <Button variant="primary">+ Add Lead</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input placeholder="Search leads..." />
        <select className="bg-white/4 border border-white/8 text-[#F1F5F9] rounded-lg px-3 py-2 text-sm">
          <option>All Status</option>
          <option>Hot</option>
          <option>Warm</option>
          <option>Cold</option>
        </select>
        <select className="bg-white/4 border border-white/8 text-[#F1F5F9] rounded-lg px-3 py-2 text-sm">
          <option>All Platforms</option>
          <option>LinkedIn</option>
          <option>Instagram</option>
          <option>Email</option>
        </select>
      </div>

      <Card className="p-6">
        <p className="text-[#94A3B8]">Leads management section with full CRUD operations coming soon...</p>
      </Card>
    </div>
  )
}

export default Leads
