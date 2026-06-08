import { useCallback } from 'react';
import { useData } from '../app/dataContext';

export function useProjects() {
  const {
    projects,
    fetchProjects,
    updateProject,
    toggleProjectTask,
    isLoading,
    error,
    clearError,
  } = useData();

  const getSLAStatistics = useCallback(() => {
    const dangerZone = projects.filter(p => p.status === 'active' && p.remainingDays < 14).length;
    const completedCount = projects.filter(p => p.status === 'completed').length;
    const ongoingCount = projects.filter(p => p.status === 'active').length;

    return {
      dangerZone,
      completedCount,
      ongoingCount,
      totalPortfolioValue: projects.reduce((acc, curr) => acc + Number(curr.value), 0)
    };
  }, [projects]);

  const getSLAStatus = useCallback((dueDate: string): 'Overdue' | 'Danger Zone' | 'Warning' | 'On Track' => {
    const dueTime = new Date(dueDate).getTime();
    const currTime = Date.now();
    const diffDays = Math.ceil((dueTime - currTime) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Overdue';
    if (diffDays <= 3) return 'Danger Zone';
    if (diffDays <= 7) return 'Warning';
    return 'On Track';
  }, []);

  return {
    projects,
    isLoading,
    error,
    clearError,
    fetchProjects,
    updateProject,
    toggleProjectTask,
    getSLAStatistics,
    getSLAStatus
  };
}
