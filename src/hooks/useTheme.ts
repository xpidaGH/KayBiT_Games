import { useState, useEffect, useCallback } from 'react';
import { UIThemeId } from '../types';

const THEME_STORAGE_KEY = 'kaybit_theme_preference';

export function useTheme() {
  const [theme, setThemeState] = useState<UIThemeId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as UIThemeId | null;
      if (saved && ['editorial', 'technical', 'warm', 'dark', 'vibrant'].includes(saved)) {
        return saved;
      }
    }
    return 'dark';
  });

  const applyTheme = useCallback((themeId: UIThemeId) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.setAttribute('data-theme', themeId);

    // Coordinate Tailwind's dark class for light vs dark schemes
    if (themeId === 'editorial' || themeId === 'warm') {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeId);
    } catch {
      // LocalStorage quota or access error handled gracefully
    }
  }, []);

  const setTheme = useCallback(
    (newTheme: UIThemeId) => {
      setThemeState(newTheme);
      applyTheme(newTheme);
    },
    [applyTheme]
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  return {
    theme,
    setTheme,
  };
}
