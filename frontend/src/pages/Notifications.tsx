import React from 'react';
import { NotificationCenter } from '../components/notifications/NotificationCenter';
import { Bell, ShieldCheck } from 'lucide-react';

export const Notifications: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-sans font-black tracking-tight text-white uppercase font-sans">System Logs & Activities</h2>
          </div>
          <p className="text-xs text-zinc-400 font-sans">
            Review audit compliance trails, pipeline warning alarms, and direct diagnostic suggestions
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-950/20 border border-emerald-900/40 px-3.5 py-1.5 rounded-lg select-none">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-bold text-emerald-300">Auditing Active</span>
        </div>
      </div>

      {/* Main Alert stream component */}
      <NotificationCenter />
    </div>
  );
};
export default Notifications;
