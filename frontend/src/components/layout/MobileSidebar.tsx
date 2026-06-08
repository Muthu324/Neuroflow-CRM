import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { 
  BarChart3, 
  Linkedin, 
  Instagram, 
  Users, 
  Briefcase, 
  Clock, 
  DollarSign, 
  BrainCircuit, 
  Bell, 
  Settings 
} from 'lucide-react';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: BarChart3 },
    { name: 'LinkedIn CRM', path: '/linkedin', icon: Linkedin },
    { name: 'Instagram CRM', path: '/instagram', icon: Instagram },
    { name: 'Leads', path: '/leads', icon: Users },
    { name: 'Projects', path: '/projects', icon: Briefcase },
    { name: 'Follow Ups', path: '/followups', icon: Clock },
    { name: 'Revenue', path: '/revenue', icon: DollarSign },
    { name: 'AI Agent', path: '/ai-agent', icon: BrainCircuit },
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'Settings', path: '/settings', icon: Settings }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm"
          />

          {/* Drawer content */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="fixed inset-y-0 left-0 w-64 bg-zinc-950 border-r border-zinc-900 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center border border-indigo-500/20">
                    <Sparkles className="w-4 h-4 text-zinc-100" />
                  </div>
                  <div>
                    <h1 className="text-xs font-sans font-bold tracking-widest text-zinc-100 uppercase">NeuroFlow</h1>
                    <span className="text-[8px] font-mono font-medium text-zinc-500 uppercase tracking-widest">AI OS</span>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 rounded-lg p-1 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="px-4 py-6 space-y-1.5 overflow-y-auto max-h-[70vh]">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2 rounded-lg text-xs tracking-wider transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-zinc-900 text-zinc-100 border border-zinc-850 font-medium'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
                      }`
                    }
                  >
                    <item.icon className="w-4 h-4 text-zinc-500" />
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Version Stamp */}
            <div className="p-6 border-t border-zinc-900 bg-zinc-950/40 select-none">
              <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">NeuroFlow v1.4.0-Stable</span>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
export default MobileSidebar;
