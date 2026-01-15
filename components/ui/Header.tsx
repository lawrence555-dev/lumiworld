'use client';

import React from 'react';
import { Settings, Volume2, VolumeX, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useProgress } from '@/hooks/useProgress';
import { useLanguage } from '@/hooks/useLanguage';

interface HeaderProps {
    showHome?: boolean;
}

export const Header = ({ showHome = false }: HeaderProps) => {
    const { progress, updateSettings } = useProgress();
    const { t } = useLanguage();
    const isMuted = progress.settings.isMuted;

    return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
            <div className="glass px-6 py-4 rounded-3xl flex items-center justify-between shadow-2xl border border-white/10">
                <div className="flex items-center gap-4">
                    <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className="bg-indigo-500 p-2 rounded-2xl shadow-lg shadow-indigo-500/20"
                    >
                        <span className="text-2xl">🌟</span>
                    </motion.div>
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-white drop-shadow-sm">
                            LumiWorld
                        </h1>
                        <p className="text-xs text-white/60 font-medium">
                            {t.ui.studentName}: {progress.studentName}
                        </p>
                    </div>
                </div>

                <nav className="flex items-center gap-3">
                    {showHome && (
                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-white transition-colors"
                            >
                                <Home size={24} />
                            </motion.button>
                        </Link>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateSettings({ isMuted: !isMuted })}
                        className={`p-3 rounded-2xl border transition-all ${isMuted
                                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                                : 'bg-white/5 border-white/5 text-white hover:bg-white/10'
                            }`}
                    >
                        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </motion.button>

                    <Link href="/settings">
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 45 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 rounded-2xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/40 hover:bg-indigo-600 transition-all border border-indigo-400/20"
                        >
                            <Settings size={24} />
                        </motion.button>
                    </Link>
                </nav>
            </div>
        </header>
    );
};
