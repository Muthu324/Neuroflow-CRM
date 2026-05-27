import StatsCards from '../components/dashboard/StatsCards'
import RevenueChart from '../components/dashboard/RevenueChart'
import PlatformPerformance from '../components/dashboard/PlatformPerformance'
import AiInsights from '../components/dashboard/AiInsights'
import LeadTable from '../components/crm/LeadTable'
import Followups from '../components/crm/Followups'

export const Dashboard = ({ setActive }) => {
  return (
    <div className="space-y-6">
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart />
        <div className="space-y-6">
          <PlatformPerformance />
          <AiInsights />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LeadTable />
        </div>
        <Followups />
      </div>
    </div>
  )
}

export default Dashboard
