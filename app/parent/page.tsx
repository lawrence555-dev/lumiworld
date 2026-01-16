'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { useProgress } from '@/hooks/useProgress';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { WEEK_GAME_DATA } from '@/data/GameContent';

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
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => router.push('/')}
                        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="font-medium">{t.parent.back_to_game}</span>
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                        📊 {t.parent.title}
                    </h1>
                    <div className="w-32" /> {/* Spacer */}
                </div>

                {/* Progress Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Levels Completed */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl shadow-lg p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-4xl">✅</span>
                            <span className="text-3xl font-black text-purple-600">
                                {completedWeeks}/{totalWeeks}
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">{t.parent.levels_completed}</h3>
                        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-purple-500 rounded-full transition-all"
                                style={{ width: `${(completedWeeks / totalWeeks) * 100}%` }}
                            />
                        </div>
                    </motion.div>

                    {/* Stars Earned */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-lg p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-4xl">⭐</span>
                            <span className="text-3xl font-black text-yellow-600">
                                {totalStars}/{maxStars}
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">{t.parent.stars_earned}</h3>
                        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-yellow-500 rounded-full transition-all"
                                style={{ width: `${(totalStars / maxStars) * 100}%` }}
                            />
                        </div>
                    </motion.div>

                    {/* Total Time */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl shadow-lg p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-4xl">⏱️</span>
                            <span className="text-3xl font-black text-blue-600">
                                {totalTimeMinutes}
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">{t.parent.total_time}</h3>
                        <p className="text-sm text-gray-600 mt-2">{t.settings.minutes_abbr}</p>
                    </motion.div>
                </div>

                {/* Weekly Breakdown */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl shadow-lg p-6"
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.parent.weekly_breakdown}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {weeks.map((week, index) => (
                            <motion.div
                                key={week.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + index * 0.05 }}
                                className={`p-4 rounded-xl border-2 transition-all ${week.isCompleted
                                    ? 'border-green-500 bg-green-50'
                                    : week.stars > 0
                                        ? 'border-yellow-500 bg-yellow-50'
                                        : 'border-gray-200 bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold text-gray-600">
                                        {t.ui.level} {week.number}
                                    </span>
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3].map((star) => (
                                            <span
                                                key={star}
                                                className={`text-lg ${star <= week.stars ? 'opacity-100' : 'opacity-20'
                                                    }`}
                                            >
                                                ⭐
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <h4 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
                                    {week.title}
                                </h4>
                                <div className={`text-xs font-bold px-2 py-1 rounded-full inline-block ${week.isCompleted
                                    ? 'bg-green-500 text-white'
                                    : week.stars > 0
                                        ? 'bg-yellow-500 text-white'
                                        : 'bg-gray-300 text-gray-600'
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
                </motion.div>

                {/* Detailed Mastery Report */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-2xl shadow-lg p-6 mt-8"
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.settings.learning_report}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                                if (m > 0) return `${m}${t.settings.minutes_abbr} ${s}${t.settings.seconds_abbr}`;
                                return `${s}${t.settings.seconds_abbr}`;
                            };

                            const getStatusColor = (status: string) => {
                                switch (status) {
                                    case 'mastered': return 'bg-emerald-100 text-emerald-700 border-emerald-300';
                                    case 'in-progress': return 'bg-amber-100 text-amber-700 border-amber-300';
                                    default: return 'bg-gray-100 text-gray-600 border-gray-300';
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
                                <div key={skillId} className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col gap-2">
                                    <div className="text-sm font-bold text-gray-700 truncate uppercase tracking-wider">
                                        {skillTitle}
                                    </div>
                                    <div className="flex justify-between items-end mt-1">
                                        <div className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase border ${getStatusColor(data.status)}`}>
                                            {getStatusLabel(data.status)}
                                        </div>
                                        <div className="text-xs font-mono text-gray-500">
                                            ⏱️ {formatTime(data.totalTimeSeconds)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
