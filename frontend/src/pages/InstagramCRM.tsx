import React, { useState } from 'react';
import { useAppState } from '../app/providers';
import { useLeads } from '../hooks/useLeads';
import { LeadTable } from '../components/crm/LeadTable';
import { LeadCard } from '../components/crm/LeadCard';
import { LeadForm } from '../components/crm/LeadForm';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatCurrency } from '../utils/formatCurrency';
import { 
  Instagram, 
  Send, 
  MessageSquare, 
  CheckCircle, 
  Video,
  Flame,
  AlertOctagon,
  Sparkles
} from 'lucide-react';

export const InstagramCRM: React.FC = () => {
  const { leads } = useAppState();
  const { getInstagramMetrics } = useLeads();
  const metrics = getInstagramMetrics();

  const [selectedLead, setSelectedLead] = useState<any>(null);

  // Filter ONLY instagram candidates
  const igLeads = leads.filter(l => l.platform === 'instagram');

  const checklist = [
    { text: 'Record custom 60-second Loom video audits for hot leads', points: 150 },
    { text: 'Respond to IG story mentions with pre-qualifying audits', points: 120 },
    { text: 'Review SDR outreach volume indexes weekly', points: 90 }
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 select-none">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Instagram className="w-5 h-5 text-pink-500 animate-pulse" />
            <h2 className="text-xl font-sans font-black tracking-tight text-white uppercase">Instagram Hub</h2>
          </div>
          <p className="text-xs text-zinc-400 font-sans">
            Oversee Instagram direct response campaigns, video interactions, and booked discovery audits
          </p>
        </div>

        {/* Quota tracker */}
        <div className="flex items-center gap-2 bg-pink-950/20 border border-pink-900/40 px-3.5 py-1.5 rounded-lg">
          <MessageSquare className="w-4 h-4 text-pink-400" />
          <span className="text-xs font-mono font-bold text-pink-300">Resonance Rate: {metrics.booked} booked audits</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 select-none animate-fade-in">
        <Card className="p-5 border-zinc-900 space-y-1 relative">
          <span className="text-[9px] font-sans font-semibold text-zinc-500 uppercase tracking-widest block leading-none">DMs Pushed</span>
          <h4 className="text-2xl font-bold font-mono text-zinc-100">{metrics.dms} DMs</h4>
          <span className="text-[10px] text-zinc-400 font-sans block mt-1">+10.2% week-on-week volume speed</span>
        </Card>

        <Card className="p-5 border-zinc-900 space-y-1 relative">
          <span className="text-[9px] font-sans font-semibold text-zinc-500 uppercase tracking-widest block leading-none">Audits Scheduled</span>
          <h4 className="text-2xl font-bold font-mono text-indigo-400">{metrics.booked} Calls</h4>
          <span className="text-[10px] text-zinc-400 font-sans block mt-1">SLA meeting hook rate is sound</span>
        </Card>

        <Card className="p-5 border-zinc-900 space-y-1 relative">
          <span className="text-[10px] font-sans font-semibold text-zinc-500 uppercase tracking-widest block leading-none">Contracts Secured</span>
          <h4 className="text-2xl font-bold font-mono text-emerald-400">{formatCurrency(metrics.revenueWon)}</h4>
          <span className="text-[10px] text-zinc-400 font-sans block mt-1">Value closed is growing</span>
        </Card>
      </div>

      {/* Main dashboard content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Instagram list cards */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-zinc-500 select-none">Instagram Accounts Directory</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {igLeads.length === 0 ? (
              <div className="col-span-2 py-10 text-center text-zinc-500 font-mono italic">
                No active Instagram candidates profiled yet. Use "Profile Lead" shortcut to add.
              </div>
            ) : (
              igLeads.map((lead) => (
                <LeadCard 
                  key={lead.id} 
                  lead={lead} 
                  onClick={() => setSelectedLead(lead)} 
                />
              ))
            )}
          </div>
        </div>

        {/* Dynamic task checklist widgets */}
        <div className="space-y-5">
          <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-zinc-500 select-none">Tactical Priorities</h3>
          
          <Card className="p-5 border-zinc-900 bg-zinc-950/40 select-none space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
              <Video className="w-4.5 h-4.5 text-pink-400" />
              <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-100">Video Audit Checklist</h4>
            </div>

            <div className="space-y-4">
              {checklist.map((item, id) => (
                <div key={id} className="p-3 bg-zinc-900/50 border border-zinc-850 rounded-xl flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded border border-zinc-800 bg-zinc-950 flex items-center justify-center shrink-0 text-emerald-500 mt-0.5">
                    <CheckCircle className="w-2.5 h-2.5" />
                  </div>
                  <div className="text-xs space-y-1 font-sans">
                    <p className="text-zinc-300 leading-normal">{item.text}</p>
                    <span className="text-[9px] font-mono font-bold text-indigo-400">+{item.points} XP rewards</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Selected Instagram Lead Details Modal */}
      <Modal isOpen={selectedLead !== null} onClose={() => setSelectedLead(null)} title="Instagram Member Details">
        {selectedLead && (
          <div className="grid grid-cols-1 gap-6 max-h-[80vh] overflow-y-auto">
            <LeadForm lead={selectedLead} onSaved={() => setSelectedLead(null)} />
          </div>
        )}
      </Modal>
    </div>
  );
};
export default InstagramCRM;
