'use client';

import React from 'react';
import { Settings, Volume2, VolumeX, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useProgress } from '@/hooks/useProgress';
import { useLanguage } from '@/hooks/useLanguage';

interface HeaderProps {
    showHome?: boolean;
    showCurriculumPath?: boolean;
}

export const Header = ({ showHome = false, showCurriculumPath = false }: HeaderProps) => {
    const { progress, updateSettings } = useProgress();
    const { t } = useLanguage();
    const isMuted = progress.settings.isMuted;

    return (
        <header className="relative w-full flex justify-center pt-2 z-[100]">
            <div className="glass px-5 py-2 rounded-xl flex items-center justify-between shadow-2xl border border-white/10 bg-slate-900/60 transition-colors w-[95%] max-w-4xl">
                <div className="flex items-center gap-4">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className="bg-indigo-500 w-10 h-10 rounded-xl shadow-lg shadow-indigo-500/20 flex items-center justify-center"
                    >
                        <span className="text-xl">🌟</span>
                    </motion.div>
                    <div>
                        <h1 className="text-xl font-black tracking-tighter text-white leading-none bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                            LumiWorld
                        </h1>
                        <p className="text-[10px] text-indigo-400/80 font-black uppercase tracking-[0.2em] mt-0.5">
                            {t.ui.studentName}: {progress.studentName}
                        </p>
                    </div>

                    {/* Curriculum Path - Fixed next to LumiWorld */}
                    {showCurriculumPath && (
                        <div className="hidden sm:block border-l border-white/10 pl-4 ml-2">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400">
                                {t.ui.curriculum_path}
                            </h2>
                            <p className="text-white/40 text-[9px] font-medium mt-0.5">
                                {t.ui.master_steam}
                            </p>
                        </div>
                    )}
                </div>

                <nav className="flex items-center gap-3">
                    {showHome && (
                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-11 h-11 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-white transition-colors flex items-center justify-center"
                            >
                                <Home size={22} />
                            </motion.button>
                        </Link>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateSettings({ isMuted: !isMuted })}
                        className={`w-11 h-11 rounded-2xl border transition-all flex items-center justify-center ${isMuted
                            ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                            : 'bg-white/5 border-white/5 text-white hover:bg-white/10'
                            }`}
                    >
                        {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                    </motion.button>

                    <Link href="/parent">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-11 h-11 rounded-2xl bg-purple-500 text-white shadow-lg shadow-purple-500/40 hover:bg-purple-600 transition-all border border-purple-400/20 flex items-center justify-center"
                        >
                            <span className="text-lg">📊</span>
                        </motion.button>
                    </Link>

                    <Link href="/settings">
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 45 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-11 h-11 rounded-2xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/40 hover:bg-indigo-600 transition-all border border-indigo-400/20 flex items-center justify-center"
                        >
                            <Settings size={22} />
                        </motion.button>
                    </Link>
                </nav>
            </div>
        </header>
    );
};
