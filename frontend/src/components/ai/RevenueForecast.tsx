import React from 'react';
import { useRevenue } from '../../hooks/useRevenue';
import { useAppState } from '../../app/providers';
import { Card } from '../ui/Card';
import { formatCurrency } from '../../utils/formatCurrency';
import { TrendingUp, BarChart3, LineChart, Sparkles } from 'lucide-react';

export const RevenueForecast: React.FC = () => {
  const { getRevenueStats } = useRevenue();
  const { projects } = useAppState();
  const stats = getRevenueStats();

  const activeBillingAmount = projects.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Card className="p-5 border-zinc-900 select-none">
      <div className="flex justify-between items-center border-b border-zinc-900 pb-4 mb-4 select-none">
        <div className="flex items-center gap-2">
          <LineChart className="w-4 h-4 text-indigo-400" />
          <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-100 font-sans">AI Billing Predictor</h4>
        </div>
        <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-850 px-2.5 py-1 rounded-lg">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-[10px] font-mono text-indigo-300">Predictive Modeling</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Statistics highlights */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900/40 border border-zinc-850 p-4.5 rounded-xl space-y-1">
            <span className="text-[9px] font-mono font-semibold text-zinc-500 uppercase tracking-widest block leading-none">Secured Pipeline</span>
            <span className="text-lg font-bold text-zinc-100 font-sans">{formatCurrency(stats.totalRevenue)}</span>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-850 p-4.5 rounded-xl space-y-1">
            <span className="text-[9px] font-mono font-semibold text-zinc-500 uppercase tracking-widest block leading-none">Gross Forecast Value</span>
            <span className="text-lg font-bold text-emerald-400 font-sans">{formatCurrency(stats.forecastedRevenue)}</span>
          </div>
        </div>

        {/* Narrative */}
        <div className="bg-zinc-950/70 border border-zinc-90 w-full rounded-xl p-4 flex gap-3 items-start">
          <TrendingUp className="w-4.5 h-4.5 text-emerald-500 mt-0.5 shrink-0" />
          <div className="text-xs space-y-1 text-zinc-400 font-sans leading-relaxed">
            <p>
              Your pipeline is currently modeled with an <strong className="text-zinc-200">average deal value of {formatCurrency(stats.averageDealSize)}</strong>.
            </p>
            <p>
              Closing 50% of the active proposal stages would result in contract collection values reaching <strong className="text-emerald-400 font-bold font-mono">{formatCurrency(stats.forecastedRevenue)}</strong> by June 30.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default RevenueForecast;
