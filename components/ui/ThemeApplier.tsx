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
        const theme = progress.settings.theme;
        document.documentElement.setAttribute('data-theme', theme);
    }, [progress.settings.theme]);

    return null;
}
