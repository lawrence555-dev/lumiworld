'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
    onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const { t } = useLanguage();
    const [progress, setProgress] = useState(0);
    const [tipIndex, setTipIndex] = useState(0);

    const tips = [
        t.loading.tip1,
        t.loading.tip2,
        t.loading.tip3,
        t.loading.tip4,
    ];

    useEffect(() => {
        // Simulate loading progress
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(onComplete, 300);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        // Rotate tips
        const tipInterval = setInterval(() => {
            setTipIndex((prev) => (prev + 1) % tips.length);
        }, 2000);

        return () => {
            clearInterval(progressInterval);
            clearInterval(tipInterval);
        };
    }, [onComplete, tips.length]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"
        >
            {/* Logo Animation */}
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="text-white text-center"
                >
                    <h1 className="text-6xl md:text-8xl font-black mb-4">
                        🌟 LumiWorld
                    </h1>
                    <p className="text-xl md:text-2xl font-medium opacity-90">
                        {t.ui.master_steam}
                    </p>
                </motion.div>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-full max-w-md px-8 mb-8">
                <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                    <motion.div
                        className="h-full bg-white rounded-full shadow-lg"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <div className="text-center mt-3 text-white font-bold text-lg">
                    {progress}%
                </div>
            </div>

            {/* Loading Tips */}
            <motion.div
                key={tipIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-white text-center px-8 max-w-lg"
            >
                <p className="text-lg md:text-xl font-medium opacity-90">
                    💡 {tips[tipIndex]}
                </p>
            </motion.div>

            {/* Loading Text */}
            <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute bottom-12 text-white text-sm font-medium"
            >
                {t.loading.loading}...
            </motion.div>
        </motion.div>
    );
}
