import React, { useState } from 'react';
import { useAppState } from '../../app/providers';
import { Lead } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';
import { Badge } from '../ui/Badge';
import { 
  Search, 
  Filter, 
  Trash2, 
  Linkedin, 
  Instagram, 
  ExternalLink,
  Flame,
  Award,
  Sparkles
} from 'lucide-react';

interface LeadTableProps {
  onSelectLead?: (lead: Lead) => void;
}

export const LeadTable: React.FC<LeadTableProps> = ({ onSelectLead }) => {
  const { leads, updateLead, deleteLead } = useAppState();
  
  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState<'all' | 'linkedin' | 'instagram'>('all');
  const [nicheFilter, setNicheFilter] = useState('all');

  // Filter sequences
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(search.toLowerCase()) || 
                          lead.company.toLowerCase().includes(search.toLowerCase()) ||
                          lead.handle.toLowerCase().includes(search.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || lead.platform === platformFilter;
    const matchesNiche = nicheFilter === 'all' || lead.niche === nicheFilter;
    
    return matchesSearch && matchesPlatform && matchesNiche;
  });

  const getTemperatureVariant = (temp: Lead['temperature']) => {
    switch(temp) {
      case 'hot': return 'alert';
      case 'warm': return 'warning';
      case 'cold': return 'primary';
      case 'ghosted': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusLabelColor = (status: Lead['status']) => {
    switch(status) {
      case 'closed_won': return 'success';
      case 'new': return 'primary';
      case 'contacted': return 'secondary';
      case 'nurturing': return 'purple';
      case 'proposal': return 'warning';
      case 'negotiation': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-4 select-none">
      {/* Controls row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search leads, niche, handles, tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900/40 border border-zinc-850 rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {/* Platform Filter */}
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value as any)}
            className="bg-zinc-900 border border-zinc-850/80 rounded-lg text-xs text-zinc-300 px-3 py-2 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">🌐 All Channels</option>
            <option value="linkedin">LinkedIn</option>
            <option value="instagram">Instagram</option>
          </select>

          {/* Niche Filter */}
          <select
            value={nicheFilter}
            onChange={(e) => setNicheFilter(e.target.value)}
            className="bg-zinc-900 border border-zinc-850/80 rounded-lg text-xs text-zinc-300 px-3 py-2 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">📂 All Niches</option>
            <option value="SaaS Founder">SaaS Founders</option>
            <option value="Coach">Coaches</option>
            <option value="Agency">Agencies</option>
            <option value="Creator">Creators</option>
          </select>
        </div>
      </div>

      {/* Table grid wrapper */}
      <div className="overflow-x-auto rounded-xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-md">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-zinc-900 bg-zinc-950/80 select-none text-[10px] font-sans font-semibold text-zinc-500 uppercase tracking-widest leading-3">
              <th className="px-6 py-4">Client Name</th>
              <th className="px-6 py-4">Platform / Niche</th>
              <th className="px-6 py-4">Est. Pipeline</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Closing %</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 text-zinc-300 font-sans">
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-zinc-500 font-mono italic">
                  No active lead candidates matched current criteria. Profiles are archived or empty.
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr 
                  key={lead.id} 
                  className="hover:bg-zinc-900/30 transition-colors group cursor-pointer"
                  onClick={() => onSelectLead?.(lead)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {lead.avatar ? (
                        <img 
                          src={lead.avatar} 
                          alt={lead.name} 
                          className="w-8 h-8 rounded-full border border-zinc-800 object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-indigo-950/60 border border-indigo-900/40 flex items-center justify-center text-indigo-300 font-mono font-bold shrink-0">
                          {lead.name[0]}
                        </div>
                      )}
                      <div>
                        <span className="font-sans font-semibold text-zinc-100 group-hover:text-indigo-400 transition-colors block leading-4">
                          {lead.name}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono block mt-1">{lead.company}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 leading-3">
                    <div className="flex flex-col gap-1.5 align-middle">
                      <div className="flex items-center gap-1.5">
                        {lead.platform === 'linkedin' ? (
                          <Linkedin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        ) : (
                          <Instagram className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                        )}
                        <span className="font-mono text-[11px] text-zinc-400">@{lead.handle}</span>
                      </div>
                      <Badge variant={lead.platform === 'linkedin' ? 'linkedin' : 'instagram'} className="w-fit">
                        {lead.niche}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-zinc-200">
                    {formatCurrency(lead.revenueEstimate)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <select
                        value={lead.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => updateLead(lead.id, { status: e.target.value as any })}
                        className="bg-zinc-900 border border-zinc-850/80 rounded px-1.5 py-1 text-[11px] text-zinc-200 focus:outline-none focus:border-indigo-500 uppercase tracking-wide cursor-pointer w-fit"
                      >
                        <option value="new">NEW INTENT</option>
                        <option value="contacted">CONTACTED</option>
                        <option value="nurturing">NURTURING</option>
                        <option value="proposal">PROPOSAL</option>
                        <option value="negotiation">NEGOTIATION</option>
                        <option value="closed_won">CLOSED WON</option>
                        <option value="closed_lost">LOST</option>
                      </select>
                      <Badge variant={getTemperatureVariant(lead.temperature)} className="w-fit text-[9px]">
                        {lead.temperature}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-zinc-900 border border-zinc-850 h-2 rounded-full overflow-hidden min-w-[50px] p-0.5">
                        <div 
                          className="bg-gradient-to-r from-violet-500 to-indigo-500 h-full rounded-full"
                          style={{ width: `${lead.probability}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-indigo-400">{lead.probability}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => deleteLead(lead.id)}
                      className="text-zinc-500 hover:text-rose-400 p-1.5 hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
                      title="Archive lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default LeadTable;
