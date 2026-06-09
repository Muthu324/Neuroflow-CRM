import React from 'react';
import { Loader } from '../components/ui/Loader';
import { StatsCards } from '../components/dashboard/StatsCards';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { ConversionFunnel } from '../components/dashboard/ConversionFunnel';
import { OutreachPerformance } from '../components/dashboard/OutreachPerformance';
import { PlatformComparison } from '../components/dashboard/PlatformComparison';
import { QuickActions } from '../components/dashboard/QuickActions';
import { AIRecommendations } from '../components/ai/AIRecommendations';
import { AIAssistant } from '../components/ai/AIAssistant';
import { Sparkles, BarChart3, Activity } from 'lucide-react';
import { useLeads } from '../hooks/useLeads'; // Import your custom hook

export const Dashboard: React.FC = () => {
  // 1. Fetch the loading state from your hook
  const { loading } = useLeads();

  // 2. Safely return the Loader INSIDE the component
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  // 3. Return the main Dashboard only when loading is false
  return (
    <div className="space-y-8 pb-10">
      {/* Intro Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 select-none">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-400 animate-pulse" />
            <h2 className="text-xl font-sans font-black tracking-tight text-zinc-100 uppercase">Executive Dashboard</h2>
          </div>
          <p className="text-xs text-zinc-400 font-sans">
            AI Operating system coordinating CRM metrics, outreach quotas, and MRR cashflow
          </p>
        </div>

        <div className="flex items-center gap-2.5 bg-zinc-900 border border-zinc-850 px-3.5 py-1.5 rounded-lg select-none">
          <Activity className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-sans font-medium text-zinc-400">System Resonance Live</span>
        </div>
      </div>

      {/* Core Counters Metrics */}
      <StatsCards />

      {/* Primary Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RevenueChart />
        <ConversionFunnel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <OutreachPerformance />
        <PlatformComparison />
      </div>

      {/* Active Checklists and Sidebar Assist Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {/* Quick Action Triggers */}
          <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-zinc-500 select-none">Quick Integrations</h3>
          <QuickActions />
          {/* Dynamic recommended tactical checkoffs */}
          <AIRecommendations />
        </div>

        {/* AIAssistant Quality Meter widget */}
        <div className="space-y-5">
          <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-zinc-500 select-none">Agent Assistant</h3>
          <AIAssistant />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
