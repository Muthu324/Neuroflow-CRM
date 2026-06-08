import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';
import { analyticsService } from '../../services/analyticsService';
import { formatCurrency } from '../../utils/formatCurrency';
import { Calendar, DollarSign } from 'lucide-react';

export const RevenueChart: React.FC = () => {
  const data = analyticsService.getMonthlyRevenueData();

  return (
    <Card className="p-5 border-zinc-900 flex flex-col justify-between h-[360px] relative overflow-hidden select-none">
      {/* Header section */}
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-sans font-bold uppercase tracking-wider text-zinc-100">MRR Velocity</h3>
          </div>
          <p className="text-xs text-zinc-400">Monthly recurring income & projection indexes</p>
        </div>
        <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-850 px-2.5 py-1 rounded-lg">
          <Calendar className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-[10px] font-mono text-zinc-300">YTD (2026)</span>
        </div>
      </div>

      {/* Chart container */}
      <div className="flex-1 min-h-0 w-full text-xs font-mono">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMRR" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorProjection" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" opacity={0.3} />
            <XAxis 
              dataKey="name" 
              stroke="#6b7280" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#6b7280" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#09090b',
                borderColor: '#27272a',
                borderRadius: '8px',
                color: '#f4f4f5',
                fontSize: '11px',
                fontFamily: 'JetBrains Mono, monospace'
              }}
              formatter={(value: any) => [formatCurrency(Number(value)), '']}
            />
            <Area 
              name="Secured MRR"
              type="monotone" 
              dataKey="MRR" 
              stroke="#6366f1" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorMRR)" 
            />
            <Area 
              name="AI Prediction"
              type="monotone" 
              dataKey="projection" 
              stroke="#10b981" 
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fillOpacity={1} 
              fill="url(#colorProjection)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
export default RevenueChart;
