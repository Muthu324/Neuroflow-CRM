import React from 'react';
import { AIChat } from '../components/ai/AIChat';
import { CEOInsights } from '../components/ai/CEOInsights';
import { Sparkles, BrainCircuit, Activity } from 'lucide-react';

export const AIAgent: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 select-none">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-indigo-400 animate-pulse" />
            <h2 className="text-xl font-sans font-black tracking-tight text-white uppercase font-sans">AI Operating Center</h2>
          </div>
          <p className="text-xs text-zinc-400 font-sans">
            Consult your AI Business Advisor on objection handling, outreach script drafting, and compile pipeline audits
          </p>
        </div>

        <div className="flex items-center gap-2 bg-indigo-950/20 border border-indigo-900/40 px-3.5 py-1.5 rounded-lg select-none">
          <Activity className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-mono font-bold text-indigo-300">Live Pilot Connected</span>
        </div>
      </div>

      {/* Grid layouts detailing Chat and reports */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Chat terminal command board */}
        <div className="space-y-4">
          <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-zinc-500 select-none">Dialogue Terminal</h3>
          <AIChat />
        </div>

        {/* CEO Reports Bottlenecks board */}
        <div className="space-y-4">
          <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-[#7c7c7c] select-none">Strategic Deep Diagnostic</h3>
          <CEOInsights />
        </div>
      </div>
    </div>
  );
};
export default AIAgent;
