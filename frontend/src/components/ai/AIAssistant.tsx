import React from 'react';
import { useAppState } from '../../app/providers';
import { calculateAverageAIQualityScore } from '../../utils/helpers';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { 
  Percent, 
  ShieldAlert, 
  Sparkles, 
  Flame, 
  Ghost,
  MessageSquare
} from 'lucide-react';

export const AIAssistant: React.FC = () => {
  const { leads } = useAppState();
  const qualityScore = calculateAverageAIQualityScore(leads);
  
  const ghostedLeads = leads.filter(l => l.temperature === 'ghosted');
  const hotLeads = leads.filter(l => l.temperature === 'hot');

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-950/20 border-emerald-900/60';
    if (score >= 60) return 'bg-amber-950/20 border-amber-900/40';
    return 'bg-rose-950/20 border-rose-900/40';
  };

  return (
    <Card className="p-5 border-zinc-900 select-none space-y-4">
      {/* Header section */}
      <div className="flex justify-between items-center border-b border-zinc-900/70 pb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-violet-400" />
          <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-100">AI Quality Center</h4>
        </div>
        <Badge variant="purple" className="text-[9px] scale-90">LIVE RADAR</Badge>
      </div>

      {/* Quality Score Meter */}
      <div className={`p-4 rounded-xl border flex items-center justify-between ${getScoreBg(qualityScore)}`}>
        <div className="space-y-0.5">
          <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-zinc-400 block">Outreach Quality Index</span>
          <span className={`text-2xl font-sans font-black tracking-tight ${getScoreColor(qualityScore)}`}>
            {qualityScore || 74}
            <span className="text-xs font-normal text-zinc-500">/100</span>
          </span>
        </div>
        <div className="text-xs font-mono font-bold text-zinc-400 flex items-center gap-1">
          <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
          <span>ICP Optimized</span>
        </div>
      </div>

      {/* Warning lists */}
      <div className="space-y-3 pt-1">
        <h5 className="text-[10px] font-sans font-bold uppercase tracking-widest text-zinc-500">Outreach Warnings</h5>

        {/* Hot Leads indicators */}
        {hotLeads.length > 0 && (
          <div className="bg-zinc-900/40 border border-zinc-850 rounded-xl p-3 flex gap-3">
            <Flame className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-xs space-y-0.5">
              <p className="font-bold text-zinc-300 font-sans block leading-none">Deal Acceleration Candidate</p>
              <p className="text-zinc-500 leading-normal font-sans">
                You have <strong className="text-indigo-400 font-mono">{hotLeads.length} hot lead(s)</strong> awaiting followup. Close chance exceeds 80%.
              </p>
            </div>
          </div>
        )}

        {/* Ghosted Alerts */}
        {ghostedLeads.length > 0 ? (
          <div className="bg-zinc-900/40 border border-zinc-850 rounded-xl p-3 flex gap-3">
            <Ghost className="w-4.5 h-4.5 text-rose-450 shrink-0 mt-0.5" />
            <div className="text-xs space-y-0.5">
              <p className="font-bold text-zinc-300 font-sans block leading-none">Ghosted Lead Recovery Needed</p>
              <p className="text-zinc-500 leading-normal font-sans">
                <span className="text-zinc-305 font-medium">{ghostedLeads[0].name}</span> is currently ghosting. Share an educational case study asset on cold delivery sequence audits to prompt revival.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-900/40 border border-zinc-850 rounded-xl p-3 flex gap-3">
            <ShieldAlert className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-0.5">
              <p className="font-bold text-zinc-350 font-sans block">Pipeline Fluidity Normal</p>
              <p className="text-zinc-500 font-sans">0 ghosted candidates. All channels in active, nurturing dialog.</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
export default AIAssistant;
