import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppState } from '../../app/providers';
import { calculateLevel } from '../../utils/helpers';
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
  Settings, 
  Flame, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { xp, streak } = useAppState();
  const { level, progressPercentage } = calculateLevel(xp);

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
    <aside className="w-64 h-screen bg-[#0c0c0e] border-r border-zinc-800/50 flex flex-col justify-between shrink-0 hidden md:flex sticky top-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-zinc-800/50 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center border border-indigo-500/20 shadow-lg shadow-indigo-500/10">
            <span className="text-sm font-sans font-black tracking-tight text-white italic">N</span>
          </div>
          <div>
            <h1 className="text-sm font-sans font-black tracking-widest text-zinc-100 uppercase flex items-center gap-0.5">
              NeuroFlow<span className="text-indigo-500 font-bold leading-none">.</span>
            </h1>
            <span className="text-[9px] font-mono font-medium text-zinc-500 uppercase tracking-widest">AI Operating System</span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1.5 scrollbar-thin">
        {navItems.map((item) => {
          const isAIAgent = item.path === '/ai-agent';
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => {
                if (isActive) {
                  return 'flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition-all duration-200 group relative cursor-pointer sidebar-active font-medium';
                }
                if (isAIAgent) {
                  return 'flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition-all duration-200 group relative cursor-pointer text-indigo-400 bg-indigo-500/5 hover:bg-indigo-500/10 font-medium border border-indigo-500/10';
                }
                return 'flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition-all duration-200 group relative cursor-pointer text-zinc-400 hover:text-white hover:bg-zinc-800/50';
              }}
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-4 h-4 transition-colors duration-200 ${
                    isActive ? 'text-white' : isAIAgent ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-200'
                  }`} />
                  <span>{item.name}</span>
                  {isActive && (
                    <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Dynamic Profile and XP Scorecard */}
      <div className="p-4 border-t border-zinc-800/50 bg-[#0c0c0e]/80 shrink-0 select-none space-y-3">
        {/* Streak Flame UI */}
        <div className="flex items-center justify-between bg-zinc-900/40 border border-zinc-800/50 rounded-lg px-3 py-2">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
            <span className="text-xs font-sans text-zinc-400">Outreach Streak</span>
          </div>
          <span className="text-xs font-mono font-bold text-amber-500">{streak} Days</span>
        </div>

        {/* Level XP bar */}
        <div className="space-y-1.5 p-3 rounded-xl bg-indigo-950/5 border border-indigo-500/10 ai-glow">
          <div className="flex justify-between items-center text-xs">
            <span className="font-sans text-zinc-400 text-[10px] uppercase font-bold tracking-wider">Agent Level</span>
            <span className="font-mono font-bold text-indigo-405 text-indigo-400">T-Tier {level}</span>
          </div>
          <div className="w-full bg-zinc-900 rounded-full h-1.5 border border-zinc-800/60 p-px">
            <div 
              className="bg-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] font-mono text-zinc-500">
            <span>{Math.round(xp % 1000)} XP</span>
            <span>1000 XP</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
