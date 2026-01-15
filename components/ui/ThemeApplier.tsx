'use client';

import { useEffect } from 'react';
import { useProgress } from '@/hooks/useProgress';

/**
 * ThemeApplier applies the selected theme as a data attribute on the html element.
 * This enables CSS theme switching without full page reload.
 */
export function ThemeApplier() {
    const { progress } = useProgress();

    useEffect(() => {
        const theme = progress.settings?.theme || 'default';
        console.log('[ThemeApplier] Applying theme:', theme);
        document.documentElement.setAttribute('data-theme', theme);

        // Also set a class for additional CSS targeting
        document.documentElement.classList.remove('theme-default', 'theme-high-contrast');
        document.documentElement.classList.add(`theme-${theme}`);
    }, [progress.settings?.theme]);

    // Also apply immediately on first render
    useEffect(() => {
        const theme = progress.settings?.theme || 'default';
        console.log('[ThemeApplier] Initial theme:', theme);
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.classList.remove('theme-default', 'theme-high-contrast');
        document.documentElement.classList.add(`theme-${theme}`);
    }, []);

    return null;
}
