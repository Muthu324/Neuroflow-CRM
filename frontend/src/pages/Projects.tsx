import React, { useState } from 'react';
import { useAppState } from '../app/providers';
import { useProjects } from '../hooks/useProjects';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatDate } from '../utils/formatDate';
import { formatCurrency } from '../utils/formatCurrency';
import { 
  Briefcase, 
  CheckSquare, 
  Clock, 
  Sparkles, 
  Award, 
  ExternalLink,
  Flame,
  Plus
} from 'lucide-react';

export const Projects: React.FC = () => {
  const { projects, completeProjectTask, addNotification, addXP } = useAppState();
  const { getSLAStatus } = useProjects();

  const activeProjects = projects.filter(p => p.status === 'active' || p.status === 'planning');
  const completedProjects = projects.filter(p => p.status === 'completed');

  const totalValue = activeProjects.reduce((acc, curr) => acc + curr.value, 0);
  const activeTaskCount = activeProjects.reduce((acc, curr) => acc + curr.tasks.filter(t => !t.completed).length, 0);

  const getSLAStyleBadge = (sla: string) => {
    switch (sla) {
      case 'Overdue': return 'alert';
      case 'Warning': return 'warning';
      default: return 'success';
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-400 animate-pulse" />
            <h2 className="text-xl font-sans font-black tracking-tight text-white uppercase">Delivery Work</h2>
          </div>
          <p className="text-xs text-zinc-400 font-sans">
            Oversee active client contracts, deliverable tasks checklist, and monitor SLA status
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-950/25 border border-emerald-900/40 px-3.5 py-1.5 rounded-lg select-none">
          <Award className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-emerald-300">Live Value: {formatCurrency(totalValue)}</span>
        </div>
      </div>

      {/* Stats recap cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 select-none animate-fade-in">
        <Card className="p-5 border-zinc-900 space-y-1 relative">
          <span className="text-[10px] font-sans font-semibold text-zinc-500 uppercase tracking-widest block leading-none">Contracts Active</span>
          <h4 className="text-2xl font-bold font-mono text-zinc-100">{activeProjects.length} clients</h4>
          <span className="text-[11px] text-zinc-400 font-sans block mt-1">Pending delivery phase review</span>
        </Card>

        <Card className="p-5 border-zinc-900 space-y-1 relative">
          <span className="text-[10px] font-sans font-semibold text-[#848484] uppercase tracking-widest block leading-none">SLA Status Rate</span>
          <h4 className="text-2xl font-bold font-mono text-emerald-400">100% Adherence</h4>
          <span className="text-[11px] text-zinc-400 font-sans block mt-1">0 overdue milestones</span>
        </Card>

        <Card className="p-5 border-zinc-900 space-y-1 relative">
          <span className="text-[10px] font-sans font-semibold text-zinc-500 uppercase tracking-widest block leading-none">Remaining Tasks</span>
          <h4 className="text-2xl font-bold font-mono text-indigo-400">{activeTaskCount} deliverables</h4>
          <span className="text-[11px] text-zinc-400 font-sans block mt-1">AI prioritization active</span>
        </Card>
      </div>

      {/* Primary listings board */}
      <div className="space-y-4">
        <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-zinc-500 select-none">Client Work Boards</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {activeProjects.length === 0 ? (
            <div className="col-span-2 py-10 border border-dashed border-zinc-900 text-center text-zinc-500 font-mono italic rounded-xl select-none">
              All delivery work is concluded or archived! Use Leads board to draft wins.
            </div>
          ) : (
            activeProjects.map((proj) => {
              const completedTasksCount = proj.tasks.filter(t => t.completed).length;
              const totalTasksCount = proj.tasks.length;
              const ratio = totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;
              const sla = getSLAStatus(proj.dueDate);

              return (
                <Card 
                  key={proj.id} 
                  hoverEffect={true} 
                  className="p-5 border-zinc-90 w-full bg-zinc-950/40 relative flex flex-col justify-between space-y-4.5"
                >
                  {/* Title block */}
                  <div className="flex justify-between items-start select-none">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-sans font-extrabold text-zinc-100 uppercase tracking-wide">{proj.name}</h4>
                      <p className="text-[11px] font-mono text-zinc-500">Contract Value: {formatCurrency(proj.value)}</p>
                    </div>

                    <div className="text-right space-y-1.5">
                      <Badge variant={getSLAStyleBadge(sla)} className="text-[9px] scale-95 leading-none">
                        SLA: {sla}
                      </Badge>
                      <span className="text-[10px] font-mono font-semibold text-rose-400 block">
                        Due: {formatDate(proj.dueDate)}
                      </span>
                    </div>
                  </div>

                  {/* Progress state */}
                  <div className="space-y-1 select-none">
                    <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                      <span>Milestone Completion</span>
                      <span>{completedTasksCount}/{totalTasksCount} ({Math.round(ratio)}%)</span>
                    </div>
                    <div className="w-full bg-zinc-900 border border-zinc-850 h-2 rounded-full overflow-hidden p-px">
                      <div className="bg-emerald-500 h-full rounded-full transition-all duration-300" style={{ width: `${ratio}%` }} />
                    </div>
                  </div>

                  {/* Task checklist sequence (Interactive) */}
                  <div className="space-y-2 border-t border-zinc-900/65 pt-3.5">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-zinc-500 select-none block mb-1">
                      Deliverable Gantt-Checks
                    </span>

                    <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                      {proj.tasks.map((task) => (
                        <div 
                          key={task.id}
                          onClick={() => !task.completed && completeProjectTask(proj.id, task.id)}
                          className={`p-3 border rounded-xl flex items-center justify-between transition-colors ${
                            task.completed 
                              ? 'bg-zinc-900/10 border-zinc-900/50 text-zinc-500 cursor-not-allowed select-none' 
                              : 'bg-zinc-900/40 border-zinc-850/80 hover:border-zinc-800 text-zinc-350 cursor-pointer select-none group'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                              task.completed 
                                ? 'bg-emerald-950 border-emerald-900/50 text-emerald-400' 
                                : 'bg-zinc-950 border-zinc-800 group-hover:border-indigo-500'
                            }`}>
                              {task.completed && <CheckSquare className="w-3 h-3" />}
                            </div>
                            <span className={`text-xs font-sans truncate ${task.completed ? 'line-through text-zinc-600' : ''}`}>
                              {task.title}
                            </span>
                          </div>

                          {!task.completed && (
                            <span className="text-[9px] font-mono font-bold text-indigo-400 group-hover:animate-pulse bg-indigo-950/20 px-1.5 py-0.5 border border-indigo-900/30 rounded inline-block">
                              +100 XP
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
export default Projects;
