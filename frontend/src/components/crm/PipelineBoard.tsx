import React from 'react';
import { useAppState } from '../../app/providers';
import { Lead } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { 
  ArrowLeft, 
  ArrowRight, 
  Flame, 
  Sparkles, 
  Trash2,
  Linkedin,
  Instagram
} from 'lucide-react';

interface PipelineBoardProps {
  onSelectLead?: (lead: Lead) => void;
}

export const PipelineBoard: React.FC<PipelineBoardProps> = ({ onSelectLead }) => {
  const { leads, updateLead, deleteLead } = useAppState();

  const stages: { val: Lead['status']; title: string; color: string }[] = [
    { val: 'new', title: 'New Leads', color: 'border-t-sky-500' },
    { val: 'contacted', title: 'Contacted', color: 'border-t-indigo-500' },
    { val: 'nurturing', title: 'Nurturing', color: 'border-t-purple-500' },
    { val: 'proposal', title: 'Proposals', color: 'border-t-pink-500' },
    { val: 'closed_won', title: 'Closed Won 🏆', color: 'border-t-emerald-500' }
  ];

  const getNextStatus = (curr: Lead['status']): Lead['status'] | null => {
    switch(curr) {
      case 'new': return 'contacted';
      case 'contacted': return 'nurturing';
      case 'nurturing': return 'proposal';
      case 'proposal': return 'closed_won';
      default: return null;
    }
  };

  const getPrevStatus = (curr: Lead['status']): Lead['status'] | null => {
    switch(curr) {
      case 'contacted': return 'new';
      case 'nurturing': return 'contacted';
      case 'proposal': return 'nurturing';
      case 'closed_won': return 'proposal';
      default: return null;
    }
  };

  const shiftLeadStatus = (id: string, current: Lead['status'], direction: 'prev' | 'next') => {
    const nextStatus = direction === 'next' ? getNextStatus(current) : getPrevStatus(current);
    if (nextStatus) {
      updateLead(id, { status: nextStatus });
    }
  };

  const getTemperatureBg = (t: Lead['temperature']) => {
    switch(t) {
      case 'hot': return 'bg-rose-950/20 text-rose-300 border-rose-900/40';
      case 'warm': return 'bg-amber-950/20 text-amber-300 border-amber-900/40';
      case 'cold': return 'bg-sky-950/20 text-sky-300 border-sky-950/40';
      default: return 'bg-zinc-900/40 text-zinc-400 border-zinc-800/40';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto select-none min-h-[500px] scrollbar-thin">
      {stages.map((stage) => {
        const stageLeads = leads.filter(l => l.status === stage.val);
        const stageValueSum = stageLeads.reduce((acc, curr) => acc + curr.revenueEstimate, 0);

        return (
          <div 
            key={stage.val} 
            className={`flex flex-col gap-4 bg-zinc-950/40 border border-zinc-900 rounded-xl px-2.5 py-4 min-w-[240px] border-t-2 ${stage.color}`}
          >
            {/* Header portion */}
            <div className="flex justify-between items-center px-1">
              <div>
                <h4 className="text-xs font-sans font-bold text-zinc-200 uppercase tracking-widest leading-4">{stage.title}</h4>
                <span className="text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-wider">{formatCurrency(stageValueSum)}</span>
              </div>
              <span className="text-xs font-mono font-bold text-zinc-400 bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded-md">
                {stageLeads.length}
              </span>
            </div>

            {/* List area */}
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto max-h-[600px] pr-1">
              {stageLeads.length === 0 ? (
                <div className="border border-dashed border-zinc-900 rounded-xl p-6 text-center text-zinc-600 italic text-[11px] font-mono my-2 select-none">
                  Drop pipeline indicators here
                </div>
              ) : (
                stageLeads.map((lead) => (
                  <Card 
                    key={lead.id} 
                    hoverEffect={true} 
                    className="p-4 border-zinc-900 bg-zinc-900/40 cursor-pointer select-none space-y-3.5 relative"
                    onClick={() => onSelectLead?.(lead)}
                  >
                    {/* User identifier */}
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <h5 className="text-xs font-sans font-bold text-zinc-100 group-hover:text-indigo-400 line-clamp-1">{lead.name}</h5>
                        <div className="flex items-center gap-1">
                          {lead.platform === 'linkedin' ? (
                            <Linkedin className="w-3 h-3 text-blue-500" />
                          ) : (
                            <Instagram className="w-3 h-3 text-pink-500" />
                          )}
                          <span className="text-[10px] text-zinc-500 font-mono">@{lead.handle}</span>
                        </div>
                      </div>
                      <Badge variant={lead.platform === 'linkedin' ? 'linkedin' : 'instagram'} className="text-[8px] px-1.5 leading-none shrink-0 scale-90">
                        {lead.niche}
                      </Badge>
                    </div>

                    {/* Meta values */}
                    <div className="flex justify-between items-center text-[11px] font-mono">
                      <span className="text-indigo-400 font-bold">{formatCurrency(lead.revenueEstimate)}</span>
                      <span className={`px-1.5 py-0.5 rounded border text-[9px] font-bold ${getTemperatureBg(lead.temperature)}`}>
                        {lead.temperature}
                      </span>
                    </div>

                    {/* Progress slider bar representation */}
                    <div className="w-full bg-zinc-950/80 border border-zinc-900 rounded-full h-1 p-px">
                      <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${lead.probability}%` }} />
                    </div>

                    {/* Movement handlers */}
                    <div className="flex justify-between items-center border-t border-zinc-900/55 pt-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => shiftLeadStatus(lead.id, lead.status, 'prev')}
                        disabled={!getPrevStatus(lead.status)}
                        className="p-1 text-zinc-500 hover:text-zinc-200 disabled:opacity-20 cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                      
                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="text-zinc-650 hover:text-rose-500 p-1 rounded transition-colors scale-90 cursor-pointer"
                        title="Archive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => shiftLeadStatus(lead.id, lead.status, 'next')}
                        disabled={!getNextStatus(lead.status)}
                        className="p-1 text-zinc-500 hover:text-zinc-200 disabled:opacity-20 cursor-pointer"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default PipelineBoard;
