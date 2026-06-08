import React from 'react';
import { useAppState } from '../../app/providers';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  Bell, 
  Check, 
  HelpCircle, 
  AlertTriangle, 
  Sparkles, 
  DollarSign, 
  Briefcase, 
  Clock, 
  Flame,
  CheckCircle2
} from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const { notifications, markNotificationsAsRead } = useAppState();

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'followup_reminder': return Clock;
      case 'deadline_alert': return Briefcase;
      case 'hot_activity': return Flame;
      case 'revenue_milestone': return DollarSign;
      case 'ai_recommendation': return Sparkles;
      default: return Bell;
    }
  };

  const getNotifIconColor = (severity: string) => {
    switch (severity) {
      case 'alert': return 'text-rose-455 bg-rose-950/20 border-rose-900/40';
      case 'warning': return 'text-amber-400 bg-amber-950/20 border-amber-900/40';
      case 'success': return 'text-emerald-400 bg-emerald-950/20 border-emerald-900/40';
      default: return 'text-indigo-400 bg-indigo-950/20 border-indigo-900/45';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="p-5 border-zinc-900 select-none">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900 pb-5 mb-5 select-none">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-sans font-bold uppercase tracking-wider text-zinc-100">Live Activity Stream</h3>
          </div>
          <p className="text-xs text-zinc-400 font-sans">Pipeline alarms, CRM logs, and business suggestions</p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markNotificationsAsRead}
            className="w-full sm:w-auto px-4 py-2 bg-indigo-950/40 hover:bg-indigo-950/70 border border-indigo-900/60 text-indigo-300 hover:text-indigo-200 rounded-lg text-xs font-sans font-semibold transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Mark all as read
          </button>
        )}
      </div>

      {/* List feed */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
        {notifications.length === 0 ? (
          <div className="py-12 border border-dashed border-zinc-900 text-center text-zinc-650 italic text-xs font-mono rounded-xl select-none">
            Stream is completely clear. No alerts logged.
          </div>
        ) : (
          notifications.map((item) => {
            const IconComponent = getNotifIcon(item.type);
            const badgeBgClass = getNotifIconColor(item.severity);

            return (
              <div 
                key={item.id}
                className={`p-4 rounded-xl border flex gap-4.5 items-start transition-colors relative ${
                  item.read 
                    ? 'bg-zinc-900/20 border-zinc-900/80' 
                    : 'bg-zinc-900/60 border-zinc-850/80'
                }`}
              >
                {/* Unread circle marker dot */}
                {!item.read && (
                  <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                )}

                {/* Category Icon */}
                <div className={`w-8.5 h-8.5 rounded-lg border flex items-center justify-center shrink-0 ${badgeBgClass}`}>
                  <IconComponent className="w-4 h-4" />
                </div>

                {/* Body paragraph */}
                <div className="space-y-1 select-text">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-sans font-bold text-zinc-100">{item.title}</span>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase">{item.timestamp}</span>
                  </div>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">{item.message}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};
export default NotificationCenter;
