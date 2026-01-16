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
            <div className="w-full max-w-[1160px] px-6 flex flex-col min-h-screen py-12 sm:py-16">

                {/* Header Block - Aligned with Homepage */}
                <div className="pb-8 sm:pb-12">
                    <Header showHome showCurriculumPath />
                </div>

                <main className="flex-1 w-full flex flex-col">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-10 w-full"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Student Name Section */}
                            <section className="glass-card rounded-[2.5rem] p-10 flex flex-col gap-8">
                                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                                    👤 {t.settings.student_name_label}
                                </h2>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        value={progress.studentName}
                                        onChange={(e) => updateName(e.target.value)}
                                        className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-5 text-2xl font-bold text-white outline-none focus:border-indigo-500/50 transition-all focus:bg-white/10"
                                        placeholder={t.settings.student_name_placeholder}
                                    />
                                </div>
                            </section>

                            {/* Language Picker Section */}
                            <section className="glass-card rounded-[2.5rem] p-10 flex flex-col gap-8">
                                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                                    🌍 {t.settings.language_label}
                                </h2>
                                <LanguagePicker />
                            </section>

                            {/* Theme Selection */}
                            <section className="glass-card rounded-[2.5rem] p-10 flex flex-col gap-8">
                                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                                    🎨 {t.settings.theme_label}
                                </h2>
                                <div className="flex bg-white/5 p-2 rounded-2xl border border-white/5">
                                    {(['default', 'high-contrast'] as const).map((tId) => (
                                        <button
                                            key={tId}
                                            onClick={() => updateSettings({ theme: tId })}
                                            className={`flex-1 py-4 px-6 rounded-xl font-black text-xl transition-all ${progress.settings.theme === tId
                                                ? 'bg-white text-indigo-950 shadow-xl scale-[1.02]'
                                                : 'text-white/40 hover:text-white/60'
                                                }`}
                                        >
                                            {tId === 'default' ? t.ui.default : t.ui.high_contrast}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            {/* Data Management */}
                            <section className="glass-card rounded-[2.5rem] p-10 flex flex-col gap-8">
                                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                                    🛡️ {t.settings.data_management}
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={handleExport}
                                        className="bg-emerald-500/10 hover:bg-emerald-500/20 border-2 border-emerald-500/20 text-emerald-400 py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 group"
                                    >
                                        <Download className="group-hover:bounce" /> {t.ui.export_progress}
                                    </button>
                                    <button
                                        onClick={() => setShowResetConfirm(true)}
                                        className="bg-rose-500/10 hover:bg-rose-500/20 border-2 border-rose-500/20 text-rose-400 py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 group"
                                    >
                                        <RotateCcw className="group-hover:rotate-180" /> {t.ui.reset_all}
                                    </button>
                                </div>
                            </section>
                        </div>

                        {/* Learning Report Section */}
                        <section className="glass-card rounded-[3rem] p-12 mt-4 mb-20">
                            <h2 className="text-4xl font-black text-white mb-10 flex items-center gap-4">
                                📊 {t.settings.learning_report}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {Object.entries(progress.mastery || {}).map(([skillId, data]) => {
                                    // Map skillId to week title
                                    const skillKeyMap: Record<string, string> = {
                                        'classification': 'w1',
                                        'anatomy': 'w2',
                                        'number-sense': 'w3',
                                        'measurement': 'w4',
                                        'habitats': 'w5',
                                        'botany': 'w6',
                                        'pollution': 'w7',
                                        'ecosystems': 'w8',
                                    };
                                    const weekKey = skillKeyMap[skillId] as keyof typeof t.weeks;
                                    const skillTitle = t.weeks[weekKey]?.title || skillId;

                                    const formatTime = (seconds: number) => {
                                        const m = Math.floor(seconds / 60);
                                        const s = seconds % 60;
                                        if (m > 0) return `${m}${t.settings.minutes_abbr}${s}${t.settings.seconds_abbr}`;
                                        return `${s}${t.settings.seconds_abbr}`;
                                    };

                                    const getStatusColor = (status: string) => {
                                        switch (status) {
                                            case 'mastered': return 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20';
                                            case 'in-progress': return 'bg-amber-500 text-white shadow-lg shadow-amber-500/20';
                                            default: return 'bg-white/10 text-white/40';
                                        }
                                    };

                                    const getStatusLabel = (status: string) => {
                                        switch (status) {
                                            case 'mastered': return t.settings.status_mastered;
                                            case 'in-progress': return t.settings.status_in_progress;
                                            default: return t.settings.status_needs_support;
                                        }
                                    };

                                    return (
                                        <motion.div
                                            key={skillId}
                                            whileHover={{ y: -5 }}
                                            className="bg-white/5 border border-white/10 rounded-[2rem] p-8 flex flex-col gap-6"
                                        >
                                            <div className="text-lg font-black text-white/60 uppercase tracking-widest line-clamp-1">
                                                {skillTitle}
                                            </div>
                                            <div className="flex flex-col gap-4">
                                                <div className="text-3xl font-mono font-black text-white">
                                                    {formatTime(data.totalTimeSeconds)}
                                                </div>
                                                <div className={`px-6 py-3 rounded-2xl text-sm font-black uppercase text-center tracking-wider ${getStatusColor(data.status)}`}>
                                                    {getStatusLabel(data.status)}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </section>
                    </motion.div>
                </main>

                {/* Reset Confirmation Modal */}
                <AnimatePresence>
                    {showResetConfirm && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowResetConfirm(false)}
                                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative w-full max-w-lg bg-[#1A1C1E] border-2 border-white/10 rounded-[2.5rem] p-10 overflow-hidden shadow-2xl"
                            >
                                <div className="absolute top-0 left-0 w-full h-2 bg-rose-500" />
                                <h3 className="text-3xl font-black text-white mb-4">
                                    {t.settings.reset_confirm_title}
                                </h3>
                                <p className="text-xl text-white/60 mb-10 leading-relaxed">
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
                                    <button
                                        onClick={() => setShowResetConfirm(false)}
                                        className="w-full py-5 rounded-2xl bg-white/5 text-white/60 font-black text-xl hover:bg-white/10 transition-all"
                                    >
                                        {t.ui.cancel}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
