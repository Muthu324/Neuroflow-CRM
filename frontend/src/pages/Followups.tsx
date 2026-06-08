import React from 'react';
import { FollowupCenter } from '../components/crm/FollowupCenter';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useAppState } from '../app/providers';
import { Clock, Flame, Calendar, Sparkles } from 'lucide-react';

export const Followups: React.FC = () => {
  const { streak, followups } = useAppState();

  const totalPending = followups.filter(f => f.status === 'pending').length;
  const highPriorityCount = followups.filter(f => f.status === 'pending' && f.priority === 'high').length;

  return (
    <div className="space-y-8 pb-10 select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400 animate-pulse" />
            <h2 className="text-xl font-sans font-black tracking-tight text-white uppercase font-sans">Smart Touchpoints</h2>
          </div>
          <p className="text-xs text-zinc-400 font-sans">
            AI-suggested outreach nurturing sequences compiled from client temperature triggers
          </p>
        </div>

        <div className="flex items-center gap-2.5 bg-amber-955/20 border border-amber-900/40 px-3.5 py-1.5 rounded-lg select-none">
          <Flame className="w-4 h-4 text-amber-500 animate-bounce" />
          <span className="text-xs font-mono font-bold text-amber-500">{streak} Days Streak Active</span>
        </div>
      </div>

      {/* Recap blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 select-none animate-fade-in">
        <Card className="p-4 bg-zinc-90 w-full hover:border-zinc-800 transition-colors space-y-1.5 border-zinc-900">
          <span className="text-[9px] font-mono font-semibold text-zinc-500 uppercase tracking-widest block leading-none">High Priority Alerts</span>
          <h4 className="text-lg font-bold text-zinc-100 font-sans">{highPriorityCount} sequences awaiting prompt action</h4>
          <p className="text-xs text-zinc-500 font-sans leading-relaxed">
            These candidates have logged hot signals and carry higher probabilities of purchase conversion.
          </p>
        </Card>

        <Card className="p-4 bg-zinc-90 w-full hover:border-zinc-800 transition-colors space-y-1.5 border-zinc-900">
          <span className="text-[9px] font-mono font-semibold text-zinc-500 uppercase tracking-widest block leading-none">Follow-up Tactics</span>
          <div className="text-xs space-y-1 leading-relaxed text-zinc-400">
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
              <span>Share PDF service audits instead of checking in</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
              <span>Address deliverability and cold metrics validation head-on</span>
            </p>
          </div>
        </Card>
      </div>

      {/* Primary followup list cards layout */}
      <FollowupCenter />
    </div>
  );
};
export default Followups;
