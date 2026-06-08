import { Project } from '../types';
import { INITIAL_PROJECTS } from '../utils/constants';

const STORAGE_KEY = 'neuroflow_projects';

export const projectService = {
  async getProjects(): Promise<Project[]> {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    return JSON.parse(data) as Project[];
  },

  async saveProjects(projects: Project[]): Promise<void> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const projects = await this.getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');

    const updated = {
      ...projects[index],
      ...updates
    };
    projects[index] = updated;
    await this.saveProjects(projects);
    return updated;
  },

  async toggleTask(projectId: string, taskId: string): Promise<Project> {
    const projects = await this.getProjects();
    const projectIndex = projects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) throw new Error('Project not found');

    const project = projects[projectIndex];
    const updatedTasks = project.tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );

    // auto update progress
    const completedCount = updatedTasks.filter(t => t.completed).length;
    const progress = Math.round((completedCount / updatedTasks.length) * 100);

    const updated = {
      ...project,
      tasks: updatedTasks,
      progress
    };

    projects[projectIndex] = updated;
    await this.saveProjects(projects);
    return updated;
  }
};
