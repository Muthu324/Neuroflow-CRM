import React from 'react';
import { useRevenue } from '../hooks/useRevenue';
import { useAppState } from '../app/providers';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { RevenueForecast } from '../components/ai/RevenueForecast';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';
import { 
  DollarSign, 
  TrendingUp, 
  Sparkles, 
  BarChart3, 
  Activity, 
  Briefcase 
} from 'lucide-react';

export const Revenue: React.FC = () => {
  const { getRevenueStats } = useRevenue();
  const { projects } = useAppState();
  const stats = getRevenueStats();

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400 animate-pulse" />
            <h2 className="text-xl font-sans font-black tracking-tight text-white uppercase font-sans">Business Revenue</h2>
          </div>
          <p className="text-xs text-zinc-400 font-sans">
            Review month-on-month recurring velocity, secured pipelines, and projected outcomes
          </p>
        </div>

        <div className="flex items-center gap-2 bg-zinc-90 w-full sm:w-auto bg-emerald-950/20 border border-emerald-900/40 px-3.5 py-1.5 rounded-lg select-none">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-bold text-emerald-300">MoM growth: +14.2%</span>
        </div>
      </div>

      {/* Grid counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 select-none animate-fade-in">
        <Card className="p-4 bg-zinc-90 border border-zinc-900 relative">
          <span className="text-[10px] font-sans font-semibold text-zinc-500 uppercase tracking-widest block leading-none">Gross Pipeline Value</span>
          <h4 className="text-xl font-bold font-mono text-zinc-100 mt-2">{formatCurrency(stats.totalRevenue)}</h4>
          <span className="text-[10px] text-zinc-400 font-sans block mt-1">Sum of all profiled deals</span>
        </Card>

        <Card className="p-4 bg-zinc-90 border border-zinc-900 relative">
          <span className="text-[10px] font-sans font-semibold text-[#808080] uppercase tracking-widest block leading-none">Monthly Recurring (MRR)</span>
          <h4 className="text-xl font-bold font-mono text-indigo-400 mt-2">{formatCurrency(stats.mrr)}</h4>
          <span className="text-[10px] text-zinc-400 font-sans block mt-1">Retainer contracts secured</span>
        </Card>

        <Card className="p-4 bg-zinc-90 border border-zinc-900 relative">
          <span className="text-[10px] font-sans font-semibold text-zinc-500 uppercase tracking-widest block leading-none">Average Ticket Value</span>
          <h4 className="text-xl font-bold font-mono text-zinc-100 mt-2">{formatCurrency(stats.averageDealSize)}</h4>
          <span className="text-[10px] text-zinc-400 font-sans block mt-1">ICP-focused target pricing</span>
        </Card>

        <Card className="p-4 bg-zinc-90 border border-zinc-900 relative">
          <span className="text-[10px] font-sans font-semibold text-zinc-500 uppercase tracking-widest block leading-none">Forecasted Closures</span>
          <h4 className="text-xl font-bold font-mono text-emerald-400 mt-2">{formatCurrency(stats.forecastedRevenue)}</h4>
          <span className="text-[10px] text-zinc-400 font-sans block mt-1">Estimated with close probabilities</span>
        </Card>
      </div>

      {/* Main Billing and charts sections split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Predictive calculations sidebar */}
        <div className="lg:col-span-2 space-y-4">
          <RevenueForecast />
        </div>

        {/* List active deliverable project values */}
        <div className="space-y-4">
          <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-zinc-500 select-none">Active Invoiced Contracts</h3>
          <Card className="p-5 border-zinc-900 bg-zinc-950/40 select-none space-y-3.5 max-h-[420px] overflow-y-auto scrollbar-thin">
            {projects.length === 0 ? (
              <p className="text-center italic text-zinc-600 text-xs font-mono py-12">No active invoice contracts tracked.</p>
            ) : (
              projects.map((proj) => (
                <div key={proj.id} className="p-3 bg-zinc-900/35 border border-zinc-850 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-sans font-bold text-zinc-300 truncate uppercase tracking-wider">{proj.name}</span>
                    <span className="text-emerald-400 font-mono font-bold shrink-0">{formatCurrency(proj.value)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-zinc-550">
                    <span>Due: {formatDate(proj.dueDate)}</span>
                    <span className="uppercase text-zinc-500">Tier: {proj.status}</span>
                  </div>
                </div>
              ))
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Revenue;
