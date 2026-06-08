import React, { useState } from 'react';
import { useAppState } from '../app/providers';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { 
  Settings as SettingsIcon, 
  Linkedin, 
  Instagram, 
  Trash2, 
  Save, 
  Wand2, 
  CheckCircle,
  RefreshCw,
  Bell,
  Sparkles
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { streak, xp, addNotification, addXP, resetState } = useAppState();

  const [operatorName, setOperatorName] = useState('Solo Operator');
  const [outboundLimit, setOutboundLimit] = useState(100);
  const [lnBotConnected, setLnBotConnected] = useState(true);
  const [igWebhookActive, setIgWebhookActive] = useState(true);

  const saveConfiguration = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification(
      'Settings Updated',
      'NeuroFlow custom CRM constraints saved successfully.',
      'success'
    );
    addXP(30);
  };

  const handleReset = () => {
    if (confirm('Are you absolutely sure you want to purge and reset all lead profiles and project history? This actions is irreversible.')) {
      resetState();
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-sans font-black tracking-tight text-white uppercase font-sans">System Configuration</h2>
          </div>
          <p className="text-xs text-zinc-400 font-sans">
            Adjust SDR outbound quotas, connect messaging webhooks, and modify client profile triggers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core settings form fields */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-5 border-zinc-90 w-full bg-zinc-950/40 select-none space-y-5">
            <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-zinc-400">Freelancer Profile Parameters</h3>
            
            <form onSubmit={saveConfiguration} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Operator Tag"
                  value={operatorName}
                  onChange={(e) => setOperatorName(e.target.value)}
                  placeholder="e.g. Solo Operator"
                  required
                />
                <Input
                  label="Weekly Outbound Quota"
                  type="number"
                  value={outboundLimit}
                  onChange={(e) => setOutboundLimit(Number(e.target.value))}
                  placeholder="100"
                  required
                />
              </div>

              <Button type="submit" variant="primary" className="cursor-pointer">
                <Save className="w-4 h-4 mr-1.5" />
                Save Core Constraints
              </Button>
            </form>
          </Card>

          {/* Webhook and channel configurations */}
          <Card className="p-5 border-zinc-90 w-full bg-zinc-950/40 select-none space-y-5">
            <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-[#787878]">Outbound Sync Channels</h3>

            <div className="space-y-3">
              {/* LinkedIn bot webhook */}
              <div className="p-4 bg-zinc-900/35 border border-zinc-850 rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-950/40 border border-blue-900/40 flex items-center justify-center text-blue-400">
                    <Linkedin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-xs font-sans font-bold text-zinc-205 block">LinkedIn outreach sync bot</span>
                    <span className="text-[10px] text-zinc-500 font-mono">Automate connections scraping and logging</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setLnBotConnected(!lnBotConnected);
                    addNotification('LinkedIn bot state updated', 'Websocket scraper configuration adjusted.', 'info');
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition-colors ${
                    lnBotConnected 
                      ? 'bg-emerald-950/20 text-emerald-400 border border-emerald-900/40' 
                      : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                  }`}
                >
                  {lnBotConnected ? '● Active' : 'Offline'}
                </button>
              </div>

              {/* Instagram webhook */}
              <div className="p-4 bg-zinc-900/35 border border-zinc-850 rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-pink-950/40 border border-pink-900/40 flex items-center justify-center text-pink-400">
                    <Instagram className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-xs font-sans font-bold text-zinc-205 block">Instagram DM Campaign API</span>
                    <span className="text-[10px] text-zinc-500 font-mono">Ingest responses and record story hook milestones</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIgWebhookActive(!igWebhookActive);
                    addNotification('Instagram webhook campaigns state updated', 'Metadata subscriptions adjusted.', 'info');
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition-colors ${
                    igWebhookActive 
                      ? 'bg-emerald-950/20 text-emerald-400 border border-emerald-900/40' 
                      : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                  }`}
                >
                  {igWebhookActive ? '● Inbound Listening' : 'Offline'}
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Diagnostic database controls sidebar */}
        <div className="space-y-5 select-none">
          <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-zinc-500">Diagnostic Board</h3>
          
          <Card className="p-5 border-zinc-90 bg-zinc-950/40 space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-90 pb-3">
              <RefreshCw className="w-4 h-4 text-violet-400" />
              <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-100">Database Purges</h4>
            </div>

            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              If you wish to wipe current CRM demo metrics and start profiling active custom candidates, reset state controls.
            </p>

            <button
              onClick={handleReset}
              className="w-full py-2 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/40 text-rose-300 hover:text-rose-250 rounded-lg text-xs font-sans font-semibold transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Reset CRM Sandbox
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Settings;
