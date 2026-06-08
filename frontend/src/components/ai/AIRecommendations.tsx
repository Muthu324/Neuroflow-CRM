import React from 'react';
import { useAppState } from '../../app/providers';
import { Card } from '../ui/Card';
import { CheckSquare, Star, BrainCircuit, Sparkles, TrendingUp } from 'lucide-react';

export const AIRecommendations: React.FC = () => {
  const { trackers, toggleDailyTracker } = useAppState();

  const unresolvedRecommendations = trackers.filter(t => !t.completed);

  return (
    <Card className="p-5 border-zinc-900 select-none">
      <div className="flex justify-between items-center border-b border-zinc-900 pb-4 mb-4 select-none">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-indigo-400" />
          <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-100">Tactical Recommendations</h4>
        </div>
        <div className="flex items-center gap-1 bg-indigo-950/20 border border-indigo-900/50 px-2 py-0.5 rounded text-[9px] font-mono font-bold text-indigo-300">
          <Sparkles className="w-3 h-3 animate-pulse" />
          <span>Active suggestions AI prioritized</span>
        </div>
      </div>

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
        {unresolvedRecommendations.length === 0 ? (
          <div className="text-center py-6 text-zinc-650 italic text-xs font-mono">
            🎉 All strategic recommendation checkoffs are complete! High leverage pipeline maintained.
          </div>
        ) : (
          unresolvedRecommendations.map((rec) => (
            <div 
              key={rec.id}
              onClick={() => toggleDailyTracker(rec.id)}
              className="bg-zinc-900/40 hover:bg-zinc-900/90 border border-zinc-850/80 hover:border-zinc-800 rounded-xl p-3.5 flex items-start gap-3 cursor-pointer group transition-all"
            >
              <div className="w-5 h-5 rounded border border-zinc-850 bg-zinc-950/80 group-hover:border-indigo-500 group-hover:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 text-zinc-600 transition-colors">
                <CheckSquare className="w-3 h-3" />
              </div>
              <div className="space-y-1 flex-1 min-w-0">
                <p className="text-xs font-sans text-zinc-300 group-hover:text-zinc-100 transition-colors leading-4 select-none truncate">
                  {rec.action}
                </p>
                <div className="flex items-center gap-1.5 select-none font-mono text-[9px]">
                  <span className="text-emerald-500 font-bold block">+{rec.xpPoints} XP</span>
                  <span className="text-zinc-650">•</span>
                  <span className="text-zinc-500 uppercase">Category: {rec.category}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
export default AIRecommendations;
