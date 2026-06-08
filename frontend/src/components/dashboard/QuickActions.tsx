import React, { useState } from 'react';
import { useAppState } from '../../app/providers';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { 
  UserPlus, 
  Clock, 
  Wand2, 
  FileCheck, 
  ShieldAlert, 
  Briefcase,
  Layers,
  Check
} from 'lucide-react';

export const QuickActions: React.FC = () => {
  const { 
    addLead, 
    addFollowUp, 
    addNotification, 
    addXP,
    leads 
  } = useAppState();

  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isFollowupModalOpen, setIsFollowupModalOpen] = useState(false);

  // New Lead state
  const [leadName, setLeadName] = useState('');
  const [leadHandler, setLeadHandler] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadNiche, setLeadNiche] = useState('SaaS Founder');
  const [leadPlatform, setLeadPlatform] = useState<'linkedin' | 'instagram'>('linkedin');
  const [leadValue, setLeadValue] = useState(6000);
  const [leadPainPoints, setLeadPainPoints] = useState('');

  // New Followup state
  const [fLeadId, setFLeadId] = useState('');
  const [fSuggestion, setFSuggestion] = useState('');
  const [fDate, setFDate] = useState('');

  const submitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim()) return;

    addLead({
      name: leadName,
      handle: leadHandler || `${leadName.toLowerCase().replace(' ', '-')}`,
      company: leadCompany || 'Self Employed',
      niche: leadNiche,
      platform: leadPlatform,
      revenueEstimate: Number(leadValue),
      status: 'new',
      temperature: 'warm',
      lastContacted: new Date().toISOString().split('T')[0],
      nextFollowUp: new Date(Date.now() + 3*24*60*60*1000).toISOString().split('T')[0],
      notes: 'Discovered during quick outreach action tracker.',
      painPoints: leadPainPoints || 'Slow pipeline conversion speed.',
      offerInterested: 'Custom Automations Audit',
      probability: 30,
      tags: [leadNiche, 'Aesthetic Lead']
    });

    // Reset Lead states
    setLeadName('');
    setLeadHandler('');
    setLeadCompany('');
    setIsLeadModalOpen(false);
  };

  const submitFollowup = (e: React.FormEvent) => {
    e.preventDefault();
    const targetedLead = leads.find(l => l.id === fLeadId);
    if (!targetedLead) return;

    addFollowUp({
      leadId: targetedLead.id,
      leadName: targetedLead.name,
      platform: targetedLead.platform,
      dueDate: fDate || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'pending',
      priority: 'high',
      aiSuggestion: fSuggestion || 'Nurturing conversation follow-up to check deliverability SPF status.',
      streakValue: 1
    });

    addNotification(
      'Follow-up added', 
      `Follow-up task scheduled for ${targetedLead.name} successfully.`, 
      'info'
    );
    addXP(50);
    setIsFollowupModalOpen(false);
  };

  const triggerAudit = () => {
    addNotification(
      'AI Analysis Inbound 🧠',
      'NeuroFlow is auditing conversion leaks... Pipeline metrics looks stable, but average response late is 29 hours. Resolve overdue actions.',
      'warning',
      'ai_recommendation'
    );
    addXP(40);
  };

  const actions = [
    {
      title: 'Profile Lead',
      description: 'Log details of a newly contacted candidate',
      icon: UserPlus,
      color: 'bg-indigo-900/30 text-indigo-400 border-indigo-900/50 hover:bg-indigo-900/50',
      action: () => setIsLeadModalOpen(true)
    },
    {
      title: 'Schedule Follow-Up',
      description: 'Schedule a structured touchpoint sequence',
      icon: Clock,
      color: 'bg-rose-900/30 text-rose-400 border-rose-900/50 hover:bg-rose-900/50',
      action: () => setIsFollowupModalOpen(true)
    },
    {
      title: 'AI Audit Pipeline',
      description: 'Scan indices for response blockages',
      icon: Wand2,
      color: 'bg-violet-900/30 text-violet-400 border-violet-900/50 hover:bg-violet-900/50',
      action: triggerAudit
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 select-none">
        {actions.map((act, index) => (
          <Card 
            key={index} 
            hoverEffect={true} 
            className="p-5 border-zinc-900 flex justify-between items-center bg-zinc-950/40 relative group"
          >
            <div className="space-y-1 pr-4 min-w-0">
              <h4 className="text-sm font-sans font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors uppercase tracking-wider truncate">
                {act.title}
              </h4>
              <p className="text-xs text-zinc-400 truncate">{act.description}</p>
            </div>
            <button
              onClick={act.action}
              className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer ${act.color}`}
            >
              <act.icon className="w-4 h-4" />
            </button>
          </Card>
        ))}
      </div>

      {/* Profile Lead Modal */}
      <Modal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} title="Log New Lead Candidate">
        <form onSubmit={submitLead} className="space-y-4 font-sans text-xs">
          <Input 
            label="Full Name" 
            placeholder="John Doe" 
            value={leadName} 
            onChange={(e) => setLeadName(e.target.value)} 
            required 
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Social handle / URL" 
              placeholder="e.g. john-doe-marketing" 
              value={leadHandler} 
              onChange={(e) => setLeadHandler(e.target.value)} 
            />
            <Input 
              label="Company Name" 
              placeholder="Doe Consultants" 
              value={leadCompany} 
              onChange={(e) => setLeadCompany(e.target.value)} 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">Target Niche</label>
              <select 
                value={leadNiche}
                onChange={(e) => setLeadNiche(e.target.value)}
                className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-lg text-sm text-zinc-200 px-3 py-2 focus:outline-none focus:border-indigo-500"
              >
                <option value="SaaS Founder">SaaS Founder</option>
                <option value="Coach">Coach</option>
                <option value="Agency">Agency</option>
                <option value="Creator">Creator</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#c4c4c4] mb-1.5 uppercase tracking-wide">Platform Source</label>
              <select 
                value={leadPlatform}
                onChange={(e) => setLeadPlatform(e.target.value as any)}
                className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-lg text-sm text-zinc-200 px-3 py-2 focus:outline-none focus:border-indigo-500"
              >
                <option value="linkedin">LinkedIn</option>
                <option value="instagram">Instagram</option>
              </select>
            </div>
          </div>
          <Input 
            label="Estimated Value ($)" 
            type="number" 
            placeholder="8000" 
            value={leadValue} 
            onChange={(e) => setLeadValue(Number(e.target.value))} 
            required
          />
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">Main Pain Points</label>
            <textarea
              className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-lg text-sm text-zinc-100 p-3 h-20 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="e.g. Leads are falling through the cracks, manual CRM entry is clogging SDR time..."
              value={leadPainPoints}
              onChange={(e) => setLeadPainPoints(e.target.value)}
            />
          </div>
          <Button type="submit" variant="primary" fullWidth className="cursor-pointer">
            <Check className="w-4 h-4 mr-2" />
            Launch Lead Profile
          </Button>
        </form>
      </Modal>

      {/* Schedule Follow-up Modal */}
      <Modal isOpen={isFollowupModalOpen} onClose={() => setIsFollowupModalOpen(false)} title="Schedule Follow-Up Task">
        <form onSubmit={submitFollowup} className="space-y-4 font-sans text-xs">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">Target Lead</label>
            <select
              value={fLeadId}
              onChange={(e) => setFLeadId(e.target.value)}
              className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-lg text-sm text-zinc-200 px-3 py-2 focus:outline-none focus:border-indigo-500"
              required
            >
              <option value="">-- Choose lead --</option>
              {leads.map(lead => (
                <option key={lead.id} value={lead.id}>{lead.name} ({lead.company})</option>
              ))}
            </select>
          </div>
          <Input 
            label="Follow-up Due Date" 
            type="date" 
            value={fDate} 
            onChange={(e) => setFDate(e.target.value)} 
            required
          />
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">AI Recommendation Action (Optional)</label>
            <textarea
              className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-lg text-sm text-zinc-100 p-3 h-20 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="e.g. Share case study about DM bot response times to dismiss custom obections..."
              value={fSuggestion}
              onChange={(e) => setFSuggestion(e.target.value)}
            />
          </div>
          <Button type="submit" variant="primary" fullWidth className="cursor-pointer">
            <Check className="w-4 h-4 mr-2" />
            Secure Follow-up Sequence
          </Button>
        </form>
      </Modal>
    </>
  );
};
export default QuickActions;
