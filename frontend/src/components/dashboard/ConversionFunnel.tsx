import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card } from '../ui/Card';
import { useAppState } from '../../app/providers';
import { analyticsService } from '../../services/analyticsService';
import { Filter } from 'lucide-react';

export const ConversionFunnel: React.FC = () => {
  const { leads } = useAppState();
  const funnelData = analyticsService.getConversionFunnelData(leads);

  return (
    <Card className="p-5 border-zinc-900 h-[360px] flex flex-col justify-between select-none">
      {/* Header element */}
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-sans font-bold uppercase tracking-wider text-zinc-100">Funnel Leaks</h3>
          </div>
          <p className="text-xs text-zinc-400">Conversion stages from profile logs to signed deals</p>
        </div>
      </div>

      {/* Visual Funnel Blocks */}
      <div className="flex-1 flex flex-col justify-center space-y-3.5">
        {funnelData.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-300 font-sans font-medium">{item.stage}</span>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">{item.count} leads</span>
                <span className="text-indigo-400 font-bold bg-indigo-950/20 px-1.5 py-0.5 rounded border border-indigo-900/30 text-[10px]">
                  {item.percentage}%
                </span>
              </div>
            </div>
            {/* Custom high-contrast progress rail */}
            <div className="w-full h-3.5 bg-zinc-900/60 rounded-full overflow-hidden border border-zinc-850/55 p-0.5">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-550 to-pink-500 transition-all duration-550"
                style={{ 
                  width: `${item.percentage}%`,
                  backgroundImage: `linear-gradient(to right, ${idx === 0 ? '#4f46e5, #4f46e5' : idx === 1 ? '#6366f1, #8b5cf6' : idx === 2 ? '#8b5cf6, #ec4899' : '#ec4899, #10b981'})`
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer statistics report */}
      <div className="border-t border-zinc-900 pt-3 flex justify-between items-center text-[11px] font-mono text-zinc-500">
        <span>Average Lead Velocity: 5.2s</span>
        <span className="text-emerald-400 font-bold font-sans">Healthy (SLA matched)</span>
      </div>
    </Card>
  );
};
export default ConversionFunnel;
