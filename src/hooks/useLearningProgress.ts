import { useState, useEffect, useCallback } from 'react';
import { ProjectId, LearningProgressMap } from '../types';

const PROGRESS_STORAGE_KEY = 'kaybit_learning_progress_state';

const DEFAULT_PROGRESS: LearningProgressMap = {
  voxel: { completed: false },
  pipeline: { completed: false },
  procedural: { completed: false },
  kinematic: { completed: false },
  sandbox: { completed: false },
  economy: { completed: false },
};

export function useLearningProgress() {
  const [progress, setProgress] = useState<LearningProgressMap>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          return { ...DEFAULT_PROGRESS, ...parsed };
        }
      } catch (err) {
        console.warn('Failed to parse learning progress from localStorage:', err);
      }
    }
    return DEFAULT_PROGRESS;
  });

  const saveProgress = useCallback((newProgress: LearningProgressMap) => {
    setProgress(newProgress);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(newProgress));
      } catch (err) {
        console.warn('Failed to save learning progress to localStorage:', err);
      }
    }
  }, []);

  const toggleModuleCompletion = useCallback(
    (id: ProjectId) => {
      setProgress((prev) => {
        const currentStatus = prev[id]?.completed ?? false;
        const updated: LearningProgressMap = {
          ...prev,
          [id]: {
            ...prev[id],
            completed: !currentStatus,
            completedAt: !currentStatus ? new Date().toISOString() : undefined,
          },
        };
        saveProgress(updated);
        return updated;
      });
    },
    [saveProgress]
  );

  const setModuleCompletion = useCallback(
    (id: ProjectId, completed: boolean) => {
      setProgress((prev) => {
        const updated: LearningProgressMap = {
          ...prev,
          [id]: {
            ...prev[id],
            completed,
            completedAt: completed ? new Date().toISOString() : undefined,
          },
        };
        saveProgress(updated);
        return updated;
      });
    },
    [saveProgress]
  );

  const resetAllProgress = useCallback(() => {
    saveProgress(DEFAULT_PROGRESS);
  }, [saveProgress]);

  const moduleIds: ProjectId[] = ['voxel', 'pipeline', 'procedural', 'kinematic', 'sandbox', 'economy'];
  const completedCount = moduleIds.filter((id) => progress[id]?.completed).length;
  const totalCount = moduleIds.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return {
    progress,
    completedCount,
    totalCount,
    percentage,
    toggleModuleCompletion,
    setModuleCompletion,
    resetAllProgress,
  };
}
