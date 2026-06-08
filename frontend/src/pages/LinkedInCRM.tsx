import React, { useState } from 'react';
import { useAppState } from '../app/providers';
import { useLeads } from '../hooks/useLeads';
import { useAI } from '../hooks/useAI';
import { LeadTable } from '../components/crm/LeadTable';
import { LeadForm } from '../components/crm/LeadForm';
import { TimelineView } from '../components/crm/TimelineView';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';
import { 
  Linkedin, 
  Sparkles, 
  Wand2, 
  Send, 
  Copy, 
  Check, 
  UserPlus2,
  Calendar,
  Flame,
  MessageSquare
} from 'lucide-react';

export const LinkedInCRM: React.FC = () => {
  const { leads, addLead } = useAppState();
  const { getLinkedinMetrics } = useLeads();
  const { isGenerating, generateOutreachScript } = useAI();

  const metrics = getLinkedinMetrics();
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  
  // Custom script template state creator
  const [nicheInput, setNicheInput] = useState('SaaS Founder');
  const [angleInput, setAngleInput] = useState('Pain point validation audit');
  const [generatedResult, setGeneratedResult] = useState('');

  const createScript = async () => {
    const res = await generateOutreachScript('Prospect', 'linkedin', nicheInput, 'Target Company', angleInput);
    setGeneratedResult(res);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Page header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 select-none">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Linkedin className="w-5 h-5 text-blue-500 animate-pulse" />
            <h2 className="text-xl font-sans font-black tracking-tight text-white uppercase">LinkedIn Hub</h2>
          </div>
          <p className="text-xs text-zinc-400 font-sans">
            Oversee LinkedIn business outreach, connections ratios, and generate custom hook-scripts
          </p>
        </div>

        {/* Connections quota stats badge */}
        <div className="flex items-center gap-2 bg-blue-950/20 border border-blue-900/40 px-3.5 py-1.5 rounded-lg">
          <Send className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-xs font-mono font-bold text-blue-300">Quota: {metrics.sent}/100 weekly DMs</span>
        </div>
      </div>

      {/* Stats counter panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 select-none">
        <Card className="p-5 border-zinc-900 space-y-1 relative">
          <span className="text-[9px] font-sans font-semibold text-zinc-500 uppercase tracking-widest block leading-none">Connections Sent</span>
          <h4 className="text-2xl font-bold font-mono text-zinc-100">{metrics.sent}</h4>
          <span className="text-[10px] text-zinc-400 font-sans block mt-1">+12 pending invitation acceptance</span>
        </Card>

        <Card className="p-5 border-zinc-900 space-y-1 relative animate-fade-in">
          <span className="text-[9px] font-sans font-semibold text-zinc-500 uppercase tracking-widest block leading-none">Response Rate</span>
          <h4 className="text-2xl font-bold font-mono text-indigo-400">{metrics.conversionRate}%</h4>
          <span className="text-[10px] text-zinc-400 font-sans block mt-1">Acceptance rate exceeding benchmark</span>
        </Card>

        <Card className="p-5 border-zinc-900 space-y-1 relative">
          <span className="text-[9px] font-sans font-semibold text-zinc-500 uppercase tracking-widest block leading-none">Hot Discussions</span>
          <h4 className="text-2xl font-bold font-mono text-amber-500">{metrics.hot} Active Warm chats</h4>
          <span className="text-[10px] text-zinc-400 font-sans block mt-1">Awaiting follow up prompts</span>
        </Card>
      </div>

      {/* Script Builder and Database block layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main lead databases */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-zinc-500 select-none">Active Candidates</h3>
          <LeadTable onSelectLead={(lead) => setSelectedLead(lead)} />
        </div>

        {/* AI Outreach scriptwriter sidebar */}
        <div className="space-y-5">
          <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-zinc-500 select-none">Outreach Copywriter</h3>
          <Card className="p-5 border-zinc-900 bg-zinc-950/40 select-none space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
              <Wand2 className="w-4 h-4 text-indigo-400" />
              <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-100">Hook Sequence Generator</h4>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-sans font-medium text-zinc-400 uppercase mb-1">Target Niche</label>
                <select
                  value={nicheInput}
                  onChange={(e) => setNicheInput(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-850 rounded p-2 text-xs text-zinc-300 focus:outline-none"
                >
                  <option value="SaaS Founder">SaaS Founders</option>
                  <option value="Agency Owner">Agency Owners</option>
                  <option value="Coach">Coaches</option>
                  <option value="AI Consultant">AI Consultants</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-sans font-medium text-zinc-400 uppercase mb-1">Outreach Angle</label>
                <select
                  value={angleInput}
                  onChange={(e) => setAngleInput(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-850 rounded p-2 text-xs text-zinc-300 focus:outline-none"
                >
                  <option value="Pain point validation audit">Pain point validation audit</option>
                  <option value="Case study value offer">Case study value offer</option>
                  <option value="Coffee chat collaboration">Coffee chat collaboration</option>
                </select>
              </div>

              <Button onClick={createScript} disabled={isGenerating} variant="primary" fullWidth className="cursor-pointer">
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                Generate Sequences Hook
              </Button>
            </div>

            {/* Generated results box */}
            {generatedResult && (
              <div className="border-t border-zinc-900/90 pt-4 space-y-3">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-zinc-500 uppercase">Sequences Preview:</span>
                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy copy'}</span>
                  </button>
                </div>
                <div className="bg-zinc-900/60 border border-zinc-850 p-4.5 rounded-lg select-text text-xs leading-relaxed max-h-[220px] overflow-y-auto scrollbar-thin text-zinc-300">
                  {generatedResult}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Selected Lead Profile Details Modal Drawer */}
      <Modal isOpen={selectedLead !== null} onClose={() => setSelectedLead(null)} title="Lead Prospect Profile Profile">
        {selectedLead && (
          <div className="grid grid-cols-1 gap-6 max-h-[80vh] overflow-y-auto scrollbar-thin">
            {/* Quick parameter updater form */}
            <LeadForm lead={selectedLead} onSaved={() => setSelectedLead(null)} />
            
            {/* Split Contacted Interaction historical milestones */}
            <TimelineView lead={selectedLead} />
          </div>
        )}
      </Modal>
    </div>
  );
};
export default LinkedInCRM;
