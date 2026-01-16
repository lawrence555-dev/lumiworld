'use client';

import { useProgress } from '@/hooks/useProgress';
import { useLanguage } from '@/hooks/useLanguage';
import { useRouter } from 'next/navigation';
import { RotateCcw, Download } from 'lucide-react';
import { useState } from 'react';
import { LanguagePicker } from '@/components/ui/LanguagePicker';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from "@/components/ui/Header";

export default function SettingsPage() {
    const { progress, updateSettings, updateName, resetProgress } = useProgress();
    const { t } = useLanguage();
    const router = useRouter();
    const [showResetConfirm, setShowResetConfirm] = useState(false);

    const handleReset = () => {
        resetProgress();
        setShowResetConfirm(false);
        router.push('/');
    };

    const handleExport = () => {
        const dataStr = JSON.stringify(progress, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `lumiworld-backup-${new Date().toISOString()}.json`;
        link.click();
    };

    return (
        <div className="app-container items-center overflow-y-auto">
            {/* Unified Content Wrapper - Aligned with Homepage */}
            <div className="w-full max-w-[1160px] px-6 flex flex-col min-h-screen py-10 sm:py-12">

                {/* Header Block - Aligned with Homepage */}
                <div className="pb-6 sm:pb-8">
                    <Header showHome />
                </div>

                {/* Settings Grid Section */}
                <main className="flex-1 w-full pb-16 sm:pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {/* Student Name Section */}
                        <section className="glass-card p-10 rounded-[2.5rem] flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-indigo-500 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
                                    <span className="text-2xl">👤</span>
                                </div>
                                <h2 className="text-2xl font-black text-white">
                                    {t.settings.student_name_label}
                                </h2>
                            </div>
                            <input
                                type="text"
                                value={progress.studentName}
                                onChange={(e) => updateName(e.target.value)}
                                className="w-full px-6 py-5 rounded-2xl text-2xl font-bold bg-white/5 text-white border-2 border-white/5 focus:border-indigo-400 focus:bg-white/10 outline-none transition-all placeholder:text-white/20"
                                placeholder={t.settings.student_name_placeholder}
                            />
                        </section>

                        {/* Language Section */}
                        <section className="glass-card p-10 rounded-[2.5rem] flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-purple-500 rounded-2xl text-white shadow-lg shadow-purple-500/20">
                                    <span className="text-2xl">🌍</span>
                                </div>
                                <h2 className="text-2xl font-black text-white">
                                    {t.settings.language_label}
                                </h2>
                            </div>
                            <LanguagePicker />
                        </section>

                        {/* Theme Section */}
                        <section className="glass-card p-10 rounded-[2.5rem] flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-pink-500 rounded-2xl text-white shadow-lg shadow-pink-500/20">
                                    <span className="text-2xl">🎨</span>
                                </div>
                                <h2 className="text-2xl font-black text-white">
                                    {t.settings.theme_label}
                                </h2>
                            </div>
                            <div className="flex gap-4">
                                {['default', 'high-contrast'].map((themeType) => (
                                    <motion.button
                                        key={themeType}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => updateSettings({ theme: themeType as any })}
                                        className={`flex-1 py-5 rounded-2xl font-bold text-xl transition-all border ${progress.settings.theme === themeType
                                            ? 'bg-white text-indigo-900 border-white shadow-xl shadow-white/10'
                                            : 'bg-white/5 text-white/40 border-white/5 hover:bg-white/10 hover:text-white'
                                            }`}
                                    >
                                        {themeType === 'default' ? t.ui.default : t.ui.high_contrast}
                                    </motion.button>
                                ))}
                            </div>
                        </section>

                        {/* Data Section */}
                        <section className="glass-card p-10 rounded-[2.5rem] flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-emerald-500 rounded-2xl text-white shadow-lg shadow-emerald-500/20">
                                    <span className="text-2xl">🛡️</span>
                                </div>
                                <h2 className="text-2xl font-black text-white">
                                    {t.settings.data_management}
                                </h2>
                            </div>
                            <div className="flex gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleExport}
                                    className="flex-1 py-5 rounded-2xl bg-white/5 hover:bg-emerald-500 hover:text-white text-emerald-400 font-bold text-xl transition-all border border-white/5 flex items-center justify-center gap-3"
                                >
                                    <Download size={24} />
                                    {t.ui.export_progress}
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setShowResetConfirm(true)}
                                    className="flex-1 py-5 rounded-2xl bg-white/5 hover:bg-rose-500 hover:text-white text-rose-400 font-bold text-xl transition-all border border-white/5 flex items-center justify-center gap-3"
                                >
                                    <RotateCcw size={24} />
                                    {t.ui.reset_all}
                                </motion.button>
                            </div>
                        </section>
                    </motion.div>
                </main>

                {/* Reset Confirmation Modal */}
                <AnimatePresence>
                    {showResetConfirm && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowResetConfirm(false)}
                                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                className="relative glass-card p-12 rounded-[3rem] max-w-md w-full shadow-2xl border border-white/10"
                            >
                                <div className="text-6xl text-center mb-6">⚠️</div>
                                <h3 className="text-3xl font-black text-white text-center mb-4 leading-tight">
                                    {t.settings.reset_confirm_title}
                                </h3>
                                <p className="text-white/60 text-center text-xl mb-10 leading-relaxed">
                                    {t.settings.reset_confirm_message}
                                </p>
                                <div className="flex flex-col gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleReset}
                                        className="w-full py-5 rounded-2xl bg-rose-500 text-white font-black text-xl shadow-xl shadow-rose-500/30"
                                    >
                                        {t.ui.reset}
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setShowResetConfirm(false)}
                                        className="w-full py-5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-xl transition-colors"
                                    >
                                        {t.ui.cancel}
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
