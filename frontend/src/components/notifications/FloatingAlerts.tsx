import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppState } from '../../app/providers';
import { Sparkles, Bell, X } from 'lucide-react';

export const FloatingAlerts: React.FC = () => {
  const { notifications } = useAppState();
  const [activeToast, setActiveToast] = useState<typeof notifications[number] | null>(null);

  useEffect(() => {
    // Show the absolute latest unread alert as a slide indicator
    const unread = notifications.filter(n => !n.read);
    if (unread.length > 0) {
      const latest = unread[0];
      setActiveToast(latest);
      const t = setTimeout(() => {
        setActiveToast(null);
      }, 5000);
      return () => clearTimeout(t);
    } else {
      setActiveToast(null);
    }
  }, [notifications]);

  return (
    <AnimatePresence>
      {activeToast && (
        <div className="fixed top-6 right-6 z-50 w-full max-w-sm pointer-events-none select-none">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="pointer-events-auto bg-zinc-950/90 backdrop-blur-md border border-zinc-900/80 hover:border-zinc-800 shadow-2xl rounded-xl p-4.5 flex gap-3.5 select-none relative"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-950/60 border border-indigo-900/40 flex items-center justify-center text-indigo-400 shrink-0 select-none">
              <Sparkles className="w-4.5 h-4.5 animate-pulse" />
            </div>

            <div className="space-y-1 select-text flex-1 min-w-0 pr-6">
              <span className="text-xs font-sans font-bold text-zinc-100 block truncate">{activeToast.title}</span>
              <p className="text-[11px] text-zinc-400 font-sans leading-normal line-clamp-2 select-text">
                {activeToast.message}
              </p>
            </div>

            <button
              onClick={() => setActiveToast(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-200 transition-colors pointer-cursor"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default FloatingAlerts;
