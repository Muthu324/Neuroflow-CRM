import { Lead, Project } from '../types';

export const aiService = {
  /**
   * Generates a hyper-personalized outreach script template
   */
  async generateOutreachScript(
    leadName: string,
    platform: 'linkedin' | 'instagram',
    niche: string,
    company: string,
    painPoints: string
  ): Promise<string> {
    // Delay to simulate network processing
    await new Promise(resolve => setTimeout(resolve, 800));

    if (platform === 'linkedin') {
      return `Hey ${leadName.split(' ')[0]},

Loved your recent insight on automation bottlenecks of ${company}. It is a massive friction point, especially in the ${niche} domain where team energy should be spent on leverage rather than manual client operations.

We recently automated onboarding tracking for Elena Rostova over at NexusMedia Studio and saved them around 14 hours of PM labor per week while raising their first-week client conversion by 22%.

We built a custom DNS mapping script specifically tailored for high-ticket service pipelines. Would love to run over a quick 3-minute screen-recording of the exact architecture blocks we deployed. 

No sales pressure whatsoever—let me know if it’s okay to drop the Loom link over!

Best,
[Your Name]`;
    } else {
      return `Hey ${leadName.split(' ')[0]}! 🙌

Your recent piece about high-level scaling friction really hit home. 

In the high-ticket ${niche} model, losing speed on warm leads because of late-night response latency is a painful ceiling. We engineered an InstaFlow DM triage system specifically for this. It qualifies high-intent creators instantly without sounding robotic, and hands over to you only when they book.

DM me the word "COMMAND" and my sandbox agent will instantly show you how we manage our own intake on autopilot. 

Let's scale! 🚀`;
    }
  },

  /**
   * Generates customizable strategic business audits inside our advisor interface
   */
  async generateCEOReport(leads: Lead[], projects: Project[]): Promise<{
    strategy: string;
    bottlenecks: string[];
    topOpportunities: string[];
    forecastMessage: string;
  }> {
    await new Promise(resolve => setTimeout(resolve, 1200));

    const totalLeads = leads.length;
    const closedWon = leads.filter(l => l.status === 'closed_won').length;
    const activeProjects = projects.filter(p => p.status === 'active').length;
    const hotLeadsCount = leads.filter(l => l.temperature === 'hot').length;

    // Smart recommendations based on current lists
    const opportunities = [];
    if (hotLeadsCount > 0) {
      opportunities.push(`We found ${hotLeadsCount} high-intent lead(s) resting in the 'Hot' bracket of your LinkedIn pipeline. Closing probability is over 80%. Initiate an SPF/DKIM deliverability audit checkoff.`);
    } else {
      opportunities.push("Outreach volume is dipping. Create highly tailored custom Loom videos pointing out CRM checkouts bugs on high-ticket niches to wake up your pipeline.");
    }
    
    opportunities.push("Focus on automated system creation for Agencies. Agency leads close 3.2x faster than direct business coaches in your dataset.");

    return {
      strategy: `Based on your database representing ${totalLeads} active leads and ${activeProjects} projects, NeuroFlow recommends focusing efforts on high-ticket workflow productization. Standardizing setup templates from NexusMedia Studio will allow you to command higher margins while slashing delivery workload by 35%.`,
      bottlenecks: [
        "LinkedIn response latency: Your average response time to accepted connections is currently 29 hours.",
        "Niche dispersion: You are messaging SaaS Founders, Coaches, and Agencies at once. Focusing strictly on Agency checkout leaks will compound outreach power."
      ],
      topOpportunities: opportunities,
      forecastMessage: "Monthly Recurring Revenue (MRR) is forecasted to increase by 24% over the next 30 days if Sarah Jenkins (ScribeFlow AI - $14.5k setup) or Tina Alvarez ($9.5k pipeline contract) are transitioned to Closed-Won."
    };
  },

  /**
   * Solves direct client objections and advises on sales conversations
   */
  async chatWithAdvisor(chatHistory: { role: 'user' | 'assistant'; content: string }[]): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lastUserQuery = chatHistory[chatHistory.length - 1].content.toLowerCase();

    // Responsive intelligent answers to support freelancer queries
    if (lastUserQuery.includes('pricing') || lastUserQuery.includes('charge')) {
      return `Pricing high-ticket AI delivery requires decoupling your hours from your output. 

For solo operators scaling outreach, NeuroFlow recommends using **Value-Based Retainers + Setup Fees**:
1. **Setup Fee ($8k - $15k)**: Covers auditing their workflows, building the custom central integrations, and training.
2. **Growth Retainer ($2k - $4.5k/mo)**: Flat monthly recurring revenue for maintaining the bots, adjusting prompt weights, and running analytics.

If a client hesitates, pitch a low-ticket, high-impact first step: *"Let me do a complete 15-minute diagnostic audit of your domain deliverability for $500. If we do not find 3 major leaks, I'll refund you instantly. If you choose to deploy our complete CRM with us, we'll apply that $500 directly toward your setup fee."* This eliminates 100% of sales friction.`;
    }

    if (lastUserQuery.includes('linkedin') || lastUserQuery.includes('outreach')) {
      return `Your LinkedIn outreach metrics indicate high connection acceptance but lower DM reply rates. To raise your conversion from 12% to 30%+:

1. **Leverage Outbound Assets**: Stop sending plain text pitches. Send a hyper-specific 2-page infographic or a 90-second Loom demonstrating a checklist error.
2. **Target High-Leverage Triggers**: Target founders who recently raised funding, hired SDRs, or launched something new.
3. **Follow-Up Sequence**: The average deal closed on NeuroFlow took **5 touchpoints**. A warm follower is lost purely from a lack of low-pressure follow-up. 

Would you like me to map out a precise 4-step message sequence for your SaaS Founder leads?`;
    }

    return `Welcome to NeuroFlow CEO Command Hub. I have analyzed your CRM database.

**NeuroFlow Strategic Audit Summary:**
- **Pipeline Health**: Outstanding high-conversion pipeline ($18,000 recently closed).
- **Ideal Client Profile (ICP)**: High-ticket marketing & visual production agencies. They have immediate budget and severe systemic leaks.
- **Immediate Task**: Reach out to Tina Alvarez with a diagnostic SPF deliverability checkoff.

Ask me about:
- *"How should I handle pricing objections for custom AI engines?"*
- *"Give me a 5-step LinkedIn follow-up sequence for agency managers."*
- *"Analyze my current pipeline bottlenecks."*`;
  }
};
