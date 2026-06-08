import React, { useEffect } from 'react';
import { useAI } from '../../hooks/useAI';
import { useRevenue } from '../../hooks/useRevenue';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatCurrency } from '../../utils/formatCurrency';
import { 
  Bot, 
  HelpCircle, 
  TrendingUp, 
  AlertTriangle, 
  ShieldAlert, 
  Check, 
  Activity,
  Award,
  Sparkles,
  RefreshCw,
  Gauge
} from 'lucide-react';

export const CEOInsights: React.FC = () => {
  const { report, isGenerating, generateCEOReport } = useAI();
  const { getRevenueStats } = useRevenue();
  const stats = getRevenueStats();

  useEffect(() => {
    // Standard preload compilation
    if (!report) {
      generateCEOReport();
    }
  }, []);

  return (
    <Card className="p-5 border-zinc-900 select-none">
      {/* Header element */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900/60 pb-5 mb-5">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-violet-400" />
            <h3 className="text-sm font-sans font-bold uppercase tracking-wider text-zinc-100">CEO Executive Board</h3>
          </div>
          <p className="text-xs text-zinc-400">Deep strategic audits modeled across pipeline, delivery logs, and close rates</p>
        </div>

        <button
          onClick={generateCEOReport}
          disabled={isGenerating}
          className="px-4 py-2 bg-zinc-90 w-full sm:w-auto bg-zinc-900/80 hover:bg-zinc-900 text-zinc-300 hover:text-zinc-100 border border-zinc-800 rounded-lg text-xs font-sans font-semibold transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
          Recompiling Strategic Audit
        </button>
      </div>

      {/* Main Insights Panel */}
      {isGenerating && !report ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4 animate-pulse">
          <Bot className="w-10 h-10 text-violet-400 animate-bounce" />
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest animate-pulse">Recompiling Pipeline Metrics...</span>
        </div>
      ) : report ? (
        <div className="space-y-6">
          {/* Strategy Briefing (Linear look) */}
          <div className="bg-gradient-to-r from-violet-950/20 via-indigo-950/10 to-transparent border border-indigo-950 rounded-xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl" />
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-indigo-950 border border-indigo-900/60 flex items-center justify-center text-indigo-400 shrink-0 select-none">
                <Bot className="w-4.5 h-4.5 animate-pulse" />
              </div>
              <div className="space-y-1.5 min-w-0">
                <span className="text-[10px] font-sans font-semibold text-indigo-300 uppercase tracking-widest block">Strategic Executive Briefing</span>
                <p className="text-xs font-sans text-zinc-300 leading-relaxed font-sans select-text">
                  {report.strategy}
                </p>
              </div>
            </div>
          </div>

          {/* Forecast & Diagnostics Board */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 select-none">
            {/* Opportunities (Value Maximizer) */}
            <Card className="p-4 bg-zinc-950/40 border-zinc-900 hover:border-zinc-800 transition-colors space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>Value Opportunities</span>
              </div>
              <ul className="space-y-3">
                {report.topOpportunities.map((op, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start">
                    <div className="w-4.5 h-4.5 rounded bg-emerald-950 border border-emerald-900/55 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 select-none">
                      <Check className="w-3 h-3" />
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans select-text">{op}</p>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Blockages & Bottlenecks (Risk Auditer) */}
            <Card className="p-4 bg-zinc-950/40 border-zinc-900 hover:border-zinc-800 transition-colors space-y-3.5 animate-fade-in">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-450 uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>System Pipeline Bottlenecks</span>
              </div>
              <ul className="space-y-3">
                {report.bottlenecks.map((bot, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start">
                    <div className="w-4.5 h-4.5 rounded bg-rose-950 border border-rose-900/55 flex items-center justify-center text-rose-400 shrink-0 mt-0.5 select-none">
                      <AlertTriangle className="w-3 h-3" />
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans select-text">{bot}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* AI Projected summary alert banner */}
          <div className="bg-zinc-900/40 border border-zinc-850 rounded-xl px-4 py-3 text-xs font-sans text-zinc-400 flex items-center gap-2.5 select-none">
            <Activity className="w-3.5 h-3.5 text-indigo-400" />
            <span>
              <strong className="text-zinc-200">Revenue Forecast Action:</strong> {report.forecastMessage}
            </span>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center text-zinc-650 italic text-xs font-mono">
          Strategic report is unavailable. Request audit compilation.
        </div>
      )}
    </Card>
  );
};
export default CEOInsights;
