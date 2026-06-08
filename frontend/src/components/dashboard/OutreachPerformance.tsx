import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';
import { analyticsService } from '../../services/analyticsService';
import { MessageSquareCode } from 'lucide-react';

export const OutreachPerformance: React.FC = () => {
  const data = analyticsService.getWeeklyOutreachData();

  return (
    <Card className="p-5 border-zinc-900 h-[360px] flex flex-col justify-between select-none">
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <MessageSquareCode className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-sans font-bold uppercase tracking-wider text-zinc-100">Outreach Volume</h3>
          </div>
          <p className="text-xs text-zinc-400">Weekly message velocity, replies, and discovery calls booked</p>
        </div>
      </div>

      <div className="flex-1 min-h-0 w-full text-xs font-mono">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.2} />
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
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconSize={8}
              iconType="circle"
              wrapperStyle={{ fontSize: '10px', fontFamily: 'Inter, sans-serif' }}
            />
            <Bar name="DMs Sent" dataKey="DMs" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar name="Replies" dataKey="replies" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            <Bar name="Calls Booked" dataKey="calls" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
export default OutreachPerformance;
