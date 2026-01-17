'use client';

import { useState, useEffect } from 'react';
import { LoadingScreen } from './LoadingScreen';
import { AnimatePresence } from 'framer-motion';

export function AppInitializer({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isFirstVisit, setIsFirstVisit] = useState(true);

    useEffect(() => {
        // Check if user has visited before
        const hasVisited = localStorage.getItem('hasVisited');

        if (hasVisited) {
            // Skip loading screen for returning users
            // Use a micro-task to avoid cascading renders warning in strict mode
            Promise.resolve().then(() => {
                setIsLoading(false);
                setIsFirstVisit(false);
            });
        } else {
            // Show loading screen for first-time users
            localStorage.setItem('hasVisited', 'true');
        }
    }, []);

    const handleLoadingComplete = () => {
        setIsLoading(false);
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && isFirstVisit && (
                    <LoadingScreen onComplete={handleLoadingComplete} />
                )}
            </AnimatePresence>
            {children}
        </>
    );
}
