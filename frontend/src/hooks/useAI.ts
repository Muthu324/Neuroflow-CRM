import { useState } from 'react';
import { aiService } from '../services/aiService';
import { useData } from '../app/dataContext';
import { AIInsightMessage } from '../types';

export function useAI() {
  const { leads, projects } = useData();
  const [messages, setMessages] = useState<AIInsightMessage[]>([
    {
      id: 'init',
      role: 'assistant',
      content: 'Welcome to NeuroFlow CEO Mode. I am your automated business advisor. I have full read access to your active outreach campaigns, client deliverables, and payment pipeline. How can I optimize your metrics today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState<{
    strategy: string;
    bottlenecks: string[];
    topOpportunities: string[];
    forecastMessage: string;
  } | null>(null);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: AIInsightMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsGenerating(true);

    try {
      const history = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content
      }));
      const reply = await aiService.chatWithAdvisor(history);

      const assistantMsg: AIInsightMessage = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [
        ...prev,
        {
          id: `msg-err-${Date.now()}`,
          role: 'assistant',
          content: 'Sorry, I hit an exception while building that response. Please retry.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateCEOReport = async () => {
    setIsGenerating(true);
    try {
      const result = await aiService.generateCEOReport(leads, projects);
      setReport(result);
      // Could integrate with notifications API if needed
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateOutreachScript = async (
    leadName: string,
    platform: 'linkedin' | 'instagram',
    niche: string,
    company: string,
    painPoints: string
  ) => {
    setIsGenerating(true);
    try {
      const script = await aiService.generateOutreachScript(leadName, platform, niche, company, painPoints);
      return script;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    messages,
    isGenerating,
    report,
    sendMessage,
    generateCEOReport,
    generateOutreachScript
  };
}
