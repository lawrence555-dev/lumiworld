'use client';

import { createElement, createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { SaveSystem, UserProgress } from '@/systems/SaveSystem';
import { AudioSystem } from '@/systems/AudioSystem';

type ProgressAction =
  | { type: 'LOAD_PROGRESS'; payload: UserProgress }
  | { type: 'UPDATE_WEEK'; payload: { weekId: string; stars: number } }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<UserProgress['settings']> }
  | { type: 'UPDATE_NAME'; payload: string }
  | { type: 'RESET_PROGRESS' };

function progressReducer(state: UserProgress, action: ProgressAction): UserProgress {
  switch (action.type) {
    case 'LOAD_PROGRESS':
      return action.payload;
    case 'UPDATE_WEEK':
      return SaveSystem.updateWeekProgress(action.payload.weekId, action.payload.stars);
    case 'UPDATE_SETTINGS':
      return SaveSystem.updateSettings(action.payload);
    case 'UPDATE_NAME':
      return SaveSystem.updateStudentName(action.payload);
    case 'RESET_PROGRESS':
      return SaveSystem.reset();
    default:
      return state;
  }
}

interface ProgressContextType {
  progress: UserProgress;
  updateWeek: (weekId: string, stars: number) => void;
  updateSettings: (settings: Partial<UserProgress['settings']>) => void;
  updateName: (name: string) => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  // Use default progress for initial render to ensure hydration matching
  const [progress, dispatch] = useReducer(progressReducer, SaveSystem.getDefaultProgress());

  useEffect(() => {
    // Load actual progress on client-side only
    const loadedProgress = SaveSystem.load();
    dispatch({ type: 'LOAD_PROGRESS', payload: loadedProgress });

    // Initialize AudioSystem with user settings
    AudioSystem.init(
      !loadedProgress.settings.isMuted,
      true,
      loadedProgress.settings.language
    );
  }, []);

  // Sync AudioSystem when settings change
  useEffect(() => {
    AudioSystem.init(
      !progress.settings.isMuted,
      true,
      progress.settings.language
    );
  }, [progress.settings.isMuted, progress.settings.language]);

  const contextValue: ProgressContextType = {
    progress,
    updateWeek: (weekId, stars) => dispatch({ type: 'UPDATE_WEEK', payload: { weekId, stars } }),
    updateSettings: (settings) => dispatch({ type: 'UPDATE_SETTINGS', payload: settings }),
    updateName: (name) => dispatch({ type: 'UPDATE_NAME', payload: name }),
    resetProgress: () => dispatch({ type: 'RESET_PROGRESS' }),
  };

  return createElement(ProgressContext.Provider, { value: contextValue }, children);
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
}
