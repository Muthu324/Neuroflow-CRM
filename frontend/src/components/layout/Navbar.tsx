import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppState } from '../../app/providers';
import { useRevenue } from '../../hooks/useRevenue';
import { formatCurrency } from '../../utils/formatCurrency';
import { 
  Search, 
  BrainCircuit, 
  Bell, 
  Menu, 
  Sun, 
  Moon, 
  Activity,
  Flame,
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  onToggleMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileMenu }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme, notifications, streak } = useAppState();
  const { getRevenueStats } = useRevenue();
  const [searchTerm, setSearchTerm] = useState('');
  
  const stats = getRevenueStats();
  const unreadNotifs = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 border-b border-zinc-800/50 bg-[#0c0c0e]/50 backdrop-blur-md px-6 md:px-8 flex items-center justify-between sticky top-0 z-40 select-none">
      {/* Search Bar / Left Side */}
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onToggleMobileMenu}
          className="md:hidden text-zinc-400 hover:text-zinc-200 cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-xs hidden sm:block">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Global system search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#161618] border border-zinc-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-250 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-505 transition-all duration-205"
          />
        </div>
      </div>

      {/* Stats summaries and Quick Controls */}
      <div className="flex items-center gap-6">
        {/* Dynamic MRR Widget */}
        <div className="hidden lg:flex items-center gap-2.5 bg-zinc-900/40 border border-zinc-850 px-3.5 py-1.5 rounded-lg select-none">
          <Activity className="w-3.5 h-3.5 text-emerald-500" />
          <div className="flex flex-col">
            <span className="text-[9px] font-mono font-semibold text-zinc-500 uppercase tracking-wider">Active MRR</span>
            <span className="text-xs font-sans font-extrabold text-emerald-400">{formatCurrency(stats.mrr)}</span>
          </div>
        </div>

        {/* AI Copilot shortcut */}
        <Link 
          to="/ai-agent"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-950/40 hover:bg-indigo-950/70 border border-indigo-900/50 hover:border-indigo-850 transition-all duration-200 group cursor-pointer"
        >
          <BrainCircuit className="w-3.5 h-3.5 text-indigo-400 group-hover:animate-pulse" />
          <span className="text-xs font-sans font-medium text-indigo-300 hidden md:block">AI Business Advisor</span>
        </Link>

        {/* Dark / Light Toggle */}
        <button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-lg bg-zinc-900/65 border border-zinc-850 flex items-center justify-center text-zinc-400 hover:text-zinc-200 cursor-pointer"
          title="Toggle system palette"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications alarm */}
        <Link 
          to="/notifications"
          className="relative w-8 h-8 rounded-lg bg-zinc-900/65 border border-zinc-850 flex items-center justify-center text-zinc-400 hover:text-zinc-200 cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          {unreadNotifs > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-mono font-bold text-[8px] h-4 w-4 rounded-full flex items-center justify-center border border-zinc-950 animate-bounce">
              {unreadNotifs}
            </span>
          )}
        </Link>

        {/* Client Profile Pill */}
        <div className="flex items-center gap-3 pl-2 border-l border-zinc-800/50">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 border border-indigo-500/25 flex items-center justify-center text-zinc-100 text-xs font-mono font-bold uppercase select-none">
            NF
          </div>
          <div className="hidden xl:flex flex-col">
            <span className="text-xs font-sans font-bold text-zinc-200">Solo Operator</span>
            <span className="text-[10px] font-mono text-zinc-500">Premium active tier</span>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
