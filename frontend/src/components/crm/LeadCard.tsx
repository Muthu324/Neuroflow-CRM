import React from 'react';
import { Lead } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatCurrency } from '../../utils/formatCurrency';
import { 
  Linkedin, 
  Instagram, 
  Sparkles, 
  MapPin, 
  TrendingUp, 
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

interface LeadCardProps {
  lead: Lead;
  onClick?: () => void;
}

export const LeadCard: React.FC<LeadCardProps> = ({ lead, onClick }) => {
  return (
    <Card 
      onClick={onClick}
      hoverEffect={true} 
      className="p-5 border-zinc-900 bg-zinc-950/60 flex flex-col justify-between h-52 relative overflow-hidden group cursor-pointer"
    >
      {/* Background radial glow */}
      <div className="absolute -right-12 -top-12 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors" />

      {/* Profile identification */}
      <div className="flex justify-between items-start select-none">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 object-cover overflow-hidden">
            {lead.avatar ? (
              <img src={lead.avatar} alt={lead.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <span className="text-indigo-400 font-mono font-bold text-sm uppercase">{lead.name[0]}</span>
            )}
          </div>
          <div className="min-w-0 truncate">
            <h4 className="text-sm font-sans font-bold text-zinc-100 group-hover:text-indigo-450 transition-colors truncate">
              {lead.name}
            </h4>
            <div className="flex items-center gap-1.5 mt-0.5 truncate">
              {lead.platform === 'linkedin' ? (
                <Linkedin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              ) : (
                <Instagram className="w-3.5 h-3.5 text-pink-500 shrink-0" />
              )}
              <span className="text-[10px] text-zinc-500 font-mono truncate">@{lead.handle}</span>
            </div>
          </div>
        </div>

        <Badge variant={lead.platform === 'linkedin' ? 'linkedin' : 'instagram'} className="text-[9px] shrink-0 scale-90">
          {lead.niche}
        </Badge>
      </div>

      {/* Main Metadata section */}
      <div className="space-y-2 select-none">
        <p className="text-xs text-zinc-400 line-clamp-2 h-8 font-sans">
          {lead.notes || 'No custom notes logged yet.'}
        </p>

        {/* Tags line */}
        <div className="flex flex-wrap gap-1.5 min-h-[22px]">
          {lead.tags.map((tag, i) => (
            <span key={i} className="px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-850/65 text-[10px] font-sans font-medium text-zinc-400">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer statistics */}
      <div className="border-t border-zinc-900/50 pt-3 flex justify-between items-center select-none font-sans">
        <div className="space-y-0.5">
          <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-semibold block">SLA Rate Est.</span>
          <span className="font-mono font-bold text-sm text-indigo-400">{formatCurrency(lead.revenueEstimate)}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-zinc-500 font-bold bg-zinc-900 border border-zinc-850 px-2 py-1 rounded inline-flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-indigo-400" />
            {lead.probability}%
          </span>
          <div className="w-6 h-6 rounded-md bg-zinc-900 border border-zinc-850 group-hover:bg-indigo-500 group-hover:border-indigo-400 flex items-center justify-center transition-all">
            <ArrowRight className="w-3 h-3 text-zinc-500 group-hover:text-zinc-100" />
          </div>
        </div>
      </div>
    </Card>
  );
};
export default LeadCard;
