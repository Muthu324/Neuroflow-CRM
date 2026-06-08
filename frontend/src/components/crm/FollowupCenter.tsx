import React from 'react';
import { useAppState } from '../../app/providers';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatDate } from '../../utils/formatDate';
import { 
  CheckCircle, 
  Linkedin, 
  Instagram, 
  Clock, 
  Brain,
  Flame,
  UserCheck
} from 'lucide-react';

export const FollowupCenter: React.FC = () => {
  const { followups, completeFollowUp } = useAppState();

  const getPriorityColor = (p: string) => {
    switch(p) {
      case 'high': return 'alert';
      case 'medium': return 'warning';
      default: return 'primary';
    }
  };

  const pendingCount = followups.filter(f => f.status === 'pending').length;

  return (
    <Card className="p-5 border-zinc-900 select-none">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900/60 pb-5 mb-5">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-rose-400" />
            <h3 className="text-sm font-sans font-bold uppercase tracking-wider text-zinc-100">Smart Follow-Ups</h3>
          </div>
          <p className="text-xs text-zinc-400">AI-routed sales nudges derived from target prospect activity</p>
        </div>
        <div className="flex items-center gap-2.5 bg-rose-950/20 border border-rose-900/30 px-3.5 py-1.5 rounded-lg">
          <Flame className="w-4 h-4 text-rose-450 animate-pulse" />
          <span className="text-xs font-mono font-bold text-rose-300">{pendingCount} Active Sequence Targets</span>
        </div>
      </div>

      {/* List items */}
      <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
        {followups.length === 0 ? (
          <div className="border border-dashed border-zinc-900 rounded-xl py-12 text-center text-zinc-500 font-mono italic">
            🎉 Maximum Resonance achieved! All client follow-ups are closed or scheduled.
          </div>
        ) : (
          followups.map((item) => (
            <div 
              key={item.id}
              className="bg-zinc-900/40 border border-zinc-850/80 p-4.5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-zinc-800 transition-colors"
            >
              <div className="space-y-2.5 flex-1 min-w-0">
                {/* Meta details row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-sans font-bold text-zinc-100">{item.leadName}</span>
                  <span className="text-zinc-650">•</span>
                  <div className="flex items-center gap-1">
                    {item.platform === 'linkedin' ? (
                      <Linkedin className="w-3.5 h-3.5 text-blue-500" />
                    ) : (
                      <Instagram className="w-3.5 h-3.5 text-pink-500" />
                    )}
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">outbound</span>
                  </div>
                  <span className="text-zinc-650">•</span>
                  <Badge variant={getPriorityColor(item.priority)} className="text-[8px] scale-90 px-1 py-0">
                    {item.priority}
                  </Badge>
                  <span className="text-zinc-650">•</span>
                  <span className="text-[10px] font-mono font-bold text-rose-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Due: {formatDate(item.dueDate)}
                  </span>
                </div>

                {/* AI Advice block */}
                <div className="bg-zinc-950/70 border border-zinc-900/80 rounded-lg p-3.5 flex gap-2.5 items-start">
                  <div className="w-7 h-7 rounded-full bg-indigo-950 border border-indigo-900/60 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                    <Brain className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    <span className="font-semibold text-indigo-300">NeuroFlow Recommendation: </span>
                    {item.aiSuggestion}
                  </p>
                </div>
              </div>

              {/* Complete Action Button */}
              <button
                onClick={() => completeFollowUp(item.id)}
                className="w-full md:w-auto px-4 py-2 bg-emerald-950/30 hover:bg-emerald-950/60 border border-emerald-900/50 hover:border-emerald-800 text-emerald-300 hover:text-emerald-250 rounded-lg text-xs font-sans font-semibold transition-all inline-flex items-center justify-center gap-1.5 shrink-0 self-stretch md:self-center cursor-pointer"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                Done (Outreach Match)
              </button>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
export default FollowupCenter;
