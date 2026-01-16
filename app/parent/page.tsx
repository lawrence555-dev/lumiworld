'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { useProgress } from '@/hooks/useProgress';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { WEEK_GAME_DATA } from '@/data/GameContent';

import { Header } from "@/components/ui/Header";

export default function ParentDashboard() {
    const { t } = useLanguage();
    const { progress } = useProgress();
    const router = useRouter();

    // Calculate statistics
    const totalWeeks = 8;
    const completedWeeks = Object.values(progress.weeks).filter(w => w.isCompleted).length;
    const totalStars = Object.values(progress.weeks).reduce((sum, w) => sum + (w.stars || 0), 0);
    const maxStars = totalWeeks * 3;

    // Calculate estimated time (rough estimate based on mastery data)
    const totalTimeMinutes = Object.values(progress.mastery || {}).reduce(
        (sum, m) => sum + Math.floor(m.totalTimeSeconds / 60),
        0
    );

    const weeks = [1, 2, 3, 4, 5, 6, 7, 8].map(num => {
        const weekId = `w${num}` as keyof typeof t.weeks;
        const weekData = progress.weeks[weekId];
        return {
            id: weekId,
            number: num,
            title: t.weeks[weekId]?.title || `Week ${num}`,
            isCompleted: weekData?.isCompleted || false,
            stars: weekData?.stars || 0,
        };
    });

    return (
        <div className="app-container items-center overflow-y-auto">
            {/* Unified Content Wrapper - Aligned with Homepage */}
            <div className="w-full max-w-[1160px] px-6 flex flex-col min-h-screen py-10 sm:py-12">

                {/* Header Block - Aligned with Homepage */}
                <div className="pb-6 sm:pb-8">
                    <Header showHome />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-8 w-full pb-20"
                >
                    {/* Progress Overview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Levels Completed */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="glass-card rounded-[2rem] p-8 relative overflow-hidden group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-5xl">✅</span>
                                <span className="text-4xl font-black text-white">
                                    {completedWeeks}<span className="text-white/30 text-2xl font-bold">/{totalWeeks}</span>
                                </span>
                            </div>
                            <h3 className="text-xl font-black text-white/90">{t.parent.levels_completed}</h3>
                            <div className="mt-4 h-3 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(completedWeeks / totalWeeks) * 100}%` }}
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                                />
                            </div>
                        </motion.div>

                        {/* Stars Earned */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="glass-card rounded-[2rem] p-8 relative overflow-hidden group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-5xl">⭐</span>
                                <span className="text-4xl font-black text-white">
                                    {totalStars}<span className="text-white/30 text-2xl font-bold">/{maxStars}</span>
                                </span>
                            </div>
                            <h3 className="text-xl font-black text-white/90">{t.parent.stars_earned}</h3>
                            <div className="mt-4 h-3 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(totalStars / maxStars) * 100}%` }}
                                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                                />
                            </div>
                        </motion.div>

                        {/* Total Time */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="glass-card rounded-[2rem] p-8 relative overflow-hidden group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-5xl">⏱️</span>
                                <span className="text-4xl font-black text-white">
                                    {totalTimeMinutes}
                                </span>
                            </div>
                            <h3 className="text-xl font-black text-white/90">{t.parent.total_time}</h3>
                            <p className="text-white/40 font-bold mt-1 uppercase tracking-wider text-sm">
                                {t.settings.minutes_abbr}
                            </p>
                        </motion.div>
                    </div>

                    {/* Weekly Breakdown */}
                    <div className="glass-card rounded-[2.5rem] p-10">
                        <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
                            📅 {t.parent.weekly_breakdown}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {weeks.map((week, index) => (
                                <motion.div
                                    key={week.id}
                                    whileHover={{ scale: 1.02 }}
                                    className={`p-6 rounded-3xl border-2 transition-all flex flex-col gap-4 ${week.isCompleted
                                        ? 'border-emerald-500/30 bg-emerald-500/5'
                                        : week.stars > 0
                                            ? 'border-yellow-500/30 bg-yellow-500/5'
                                            : 'border-white/5 bg-white/3'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-black text-white/40 uppercase tracking-widest">
                                            {t.ui.level} {week.number}
                                        </span>
                                        <div className="flex gap-1">
                                            {[1, 2, 3].map((star) => (
                                                <span
                                                    key={star}
                                                    className={`text-xl ${star <= week.stars ? 'drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'opacity-10 grayscale'
                                                        }`}
                                                >
                                                    ⭐
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-bold text-white leading-tight flex-1">
                                        {week.title}
                                    </h4>
                                    <div className={`text-xs font-black px-4 py-2 rounded-full text-center uppercase tracking-wider ${week.isCompleted
                                        ? 'bg-emerald-500 text-white'
                                        : week.stars > 0
                                            ? 'bg-yellow-500 text-black'
                                            : 'bg-white/10 text-white/40'
                                        }`}>
                                        {week.isCompleted
                                            ? t.parent.completed
                                            : week.stars > 0
                                                ? t.parent.in_progress
                                                : t.parent.not_started
                                        }
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Detailed Mastery Report */}
                    <div className="glass-card rounded-[2.5rem] p-10">
                        <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
                            📝 {t.settings.learning_report}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                                    <div key={skillId} className="bg-white/3 border border-white/5 rounded-[1.5rem] p-6 flex flex-col gap-4">
                                        <div className="text-base font-black text-white/60 uppercase tracking-widest line-clamp-1">
                                            {skillTitle}
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <div className="text-2xl font-mono font-black text-white">
                                                {formatTime(data.totalTimeSeconds)}
                                            </div>
                                            <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase text-center tracking-tighter ${getStatusColor(data.status)}`}>
                                                {getStatusLabel(data.status)}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
