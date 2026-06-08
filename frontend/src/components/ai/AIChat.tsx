import React, { useRef, useEffect, useState } from 'react';
import { useAI } from '../../hooks/useAI';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Loader } from '../ui/Loader';
import { 
  Send, 
  BrainCircuit, 
  Bot, 
  Terminal, 
  Sparkles,
  Command,
  ArrowRight
} from 'lucide-react';

export const AIChat: React.FC = () => {
  const { messages, isGenerating, sendMessage } = useAI();
  const [input, setInput] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const chips = [
    'How should I price custom AI engines?',
    'Give me a 5-step LinkedIn follow-up sequence.',
    'Analyze my pipeline bottlenecks.'
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;
    sendMessage(input);
    setInput('');
  };

  const handleChipClick = (chip: string) => {
    if (isGenerating) return;
    sendMessage(chip);
  };

  return (
    <Card className="p-5 border-zinc-900 bg-zinc-950/40 flex flex-col justify-between h-[480px] select-none">
      {/* Advisor Header block */}
      <div className="flex justify-between items-center border-b border-zinc-900 pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center border border-indigo-500/20">
            <BrainCircuit className="w-4.5 h-4.5 text-zinc-100" />
          </div>
          <div>
            <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-100">AI Command Advisor</h4>
            <div className="flex items-center gap-1.5 mt-0.5 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">NeuroFlow Live Sandbox Connected</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-850 px-2.5 py-1 rounded-lg">
          <Terminal className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-[9px] font-mono text-zinc-300">CEO MODE</span>
        </div>
      </div>

      {/* Message Feed lists */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 scrollbar-thin flex flex-col min-h-0 select-text">
        {messages.map((m) => {
          const isBot = m.role === 'assistant';
          return (
            <div 
              key={m.id}
              className={`flex gap-3 max-w-[85%] ${isBot ? 'self-start' : 'self-end flex-row-reverse'}`}
            >
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${
                isBot 
                  ? 'bg-zinc-900 border-zinc-850 text-indigo-400' 
                  : 'bg-indigo-950/60 border-indigo-900/50 text-indigo-300'
              }`}>
                {isBot ? <Bot className="w-4 h-4" /> : <Command className="w-4 h-4" />}
              </div>
              <div className={`rounded-xl p-3.5 border ${
                isBot 
                  ? 'bg-zinc-900/40 border-zinc-900/80 text-zinc-300' 
                  : 'bg-indigo-950/20 border-indigo-900/30 text-indigo-100'
              }`}>
                <p className="text-xs leading-relaxed font-sans whitespace-pre-wrap">{m.content}</p>
                <span className="text-[9px] font-mono text-zinc-500 text-right block mt-1 uppercase">
                  {m.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isGenerating && (
          <div className="flex gap-3 max-w-[85%] self-start select-none">
            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-850 text-indigo-400 flex items-center justify-center animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-zinc-900/40 border border-zinc-900/80 rounded-xl p-4 flex items-center gap-3">
              <Loader size="sm" />
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest animate-pulse">AI is thinking...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested chips row (scrollable) */}
      <div className="shrink-0 flex gap-2 overflow-x-auto py-2 shrink-0 scrollbar-none select-none">
        {chips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleChipClick(chip)}
            disabled={isGenerating}
            className="px-3.5 py-1.5 bg-zinc-900/70 hover:bg-zinc-900 border border-zinc-850 rounded-full text-[10px] font-sans font-semibold text-zinc-400 hover:text-indigo-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input box */}
      <form onSubmit={handleSubmit} className="border-t border-zinc-900/55 pt-3 flex gap-2.5 shrink-0 select-none">
        <input
          type="text"
          placeholder="Ask NeuroFlow anything (e.g. objection handling, pricing models)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isGenerating}
          className="flex-1 bg-zinc-900/60 border border-zinc-850 rounded-lg px-3 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        <Button type="submit" variant="primary" disabled={isGenerating || !input.trim()} className="cursor-pointer">
          <Send className="w-3.5 h-3.5" />
        </Button>
      </form>
    </Card>
  );
};
export default AIChat;
