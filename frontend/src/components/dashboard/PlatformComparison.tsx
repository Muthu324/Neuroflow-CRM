import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';
import { useAppState } from '../../app/providers';
import { analyticsService } from '../../services/analyticsService';
import { formatCurrency } from '../../utils/formatCurrency';
import { GitCompare } from 'lucide-react';

export const PlatformComparison: React.FC = () => {
  const { leads } = useAppState();
  const data = analyticsService.getPlatformComparisonData(leads);

  return (
    <Card className="p-5 border-zinc-900 h-[360px] flex flex-col justify-between select-none">
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <GitCompare className="w-4 h-4 text-pink-400" />
            <h3 className="text-sm font-sans font-bold uppercase tracking-wider text-zinc-100">Network Breakdown</h3>
          </div>
          <p className="text-xs text-zinc-400">Comparing pipeline value across primary platforms</p>
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-between">
        {/* Simple Side-by-Side comparison panels (Uber Elite Visual Look) */}
        <div className="grid grid-cols-2 gap-4 mb-4 select-none">
          {data.map((p, idx) => (
            <div key={idx} className="bg-zinc-900/40 border border-zinc-850/80 rounded-xl p-4 space-y-1.5 hover:border-zinc-800 transition-colors">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">{p.name} Channels</span>
              <h4 className="text-lg font-bold text-zinc-100">{p.Leads} lead profiles</h4>
              <div className="text-xs space-y-0.5">
                <p className="text-zinc-400">Value: <span className="text-indigo-400 font-bold font-mono">{formatCurrency(p.PipelineValue)}</span></p>
                <p className="text-zinc-400">Wins: <span className="text-emerald-400 font-bold">{p.ClosedStatus} deals</span></p>
              </div>
            </div>
          ))}
        </div>

        {/* Mini platform comparison ratio line */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono text-zinc-500">
            <span>LinkedIn: {Math.round((data[0].PipelineValue / (data[0].PipelineValue + data[1].PipelineValue || 1)) * 100)}%</span>
            <span>Instagram: {Math.round((data[1].PipelineValue / (data[0].PipelineValue + data[1].PipelineValue || 1)) * 105)}%</span>
          </div>
          <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden flex border border-zinc-850 p-0.5">
            <div 
              className="bg-blue-500 h-full rounded-l-full" 
              style={{ width: `${(data[0].PipelineValue / (data[0].PipelineValue + data[1].PipelineValue || 1)) * 140}%` }}
            />
            <div 
              className="bg-pink-500 h-full rounded-r-full" 
              style={{ width: `${(data[1].PipelineValue / (data[0].PipelineValue + data[1].PipelineValue || 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
export default PlatformComparison;
