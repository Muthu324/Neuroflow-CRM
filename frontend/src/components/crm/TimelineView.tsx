import React from 'react';
import { Lead, TimelineEvent } from '../../types';
import { Card } from '../ui/Card';
import { formatDate } from '../../utils/formatDate';
import { 
  Send, 
  CheckSquare, 
  MessageCircle, 
  PhoneCall, 
  FileEdit, 
  BookOpen, 
  Sparkles,
  Link2
} from 'lucide-react';

interface TimelineViewProps {
  lead: Lead;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ lead }) => {
  const getEventIcon = (type: TimelineEvent['type']) => {
    switch(type) {
      case 'connection_sent': return Send;
      case 'connection_accepted': return CheckSquare;
      case 'message_sent': return MessageCircle;
      case 'reply_received': return MessageCircle;
      case 'call_booked': return PhoneCall;
      case 'proposal_sent': return BookOpen;
      default: return FileEdit;
    }
  };

  const getIconColor = (type: TimelineEvent['type']) => {
    switch(type) {
      case 'connection_sent': return 'text-sky-400 bg-sky-950/20 border-sky-900/45';
      case 'connection_accepted': return 'text-emerald-400 bg-emerald-950/20 border-emerald-900/40';
      case 'message_sent': return 'text-indigo-400 bg-indigo-950/20 border-indigo-900/40';
      case 'reply_received': return 'text-pink-400 bg-pink-950/20 border-pink-900/40';
      case 'call_booked': return 'text-amber-400 bg-amber-950/25 border-amber-900/40';
      case 'proposal_sent': return 'text-purple-400 bg-purple-950/20 border-purple-900/40';
      default: return 'text-zinc-400 bg-zinc-905/20 border-zinc-850/40';
    }
  };

  return (
    <div className="space-y-4 select-none">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
        <h4 className="text-[10px] font-sans font-bold uppercase tracking-widest text-zinc-400">Interaction History</h4>
      </div>

      <div className="relative border-l border-zinc-900/90 pl-6 ml-3 space-y-5">
        {lead.timeline && lead.timeline.length > 0 ? (
          lead.timeline.map((event, index) => {
            const IconComponent = getEventIcon(event.type);
            const iconBgClass = getIconColor(event.type);

            return (
              <div key={event.id || index} className="relative group">
                {/* Timeline node dot */}
                <div className={`absolute -left-[35px] top-1.5 w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${iconBgClass}`}>
                  <IconComponent className="w-3 h-3" />
                </div>

                {/* Event core box */}
                <div className="bg-zinc-900/45 border border-zinc-850 rounded-xl p-4.5 group-hover:border-zinc-800 transition-all">
                  <span className="text-[9px] font-mono text-zinc-500 block uppercase mb-1">
                    {formatDate(event.date)}
                  </span>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-xs font-mono text-zinc-650 italic py-4">
            No logged CRM interaction timelines found for {lead.name}.
          </div>
        )}
      </div>
    </div>
  );
};
export default TimelineView;
