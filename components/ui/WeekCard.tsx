'use client';

import { Lock, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { AudioSystem } from '@/systems/AudioSystem';
import { useLanguage } from '@/hooks/useLanguage';

interface WeekCardProps {
    weekId: string;
    weekNumber: number;
    title: string;
    isUnlocked: boolean;
    isCompleted: boolean;
    stars: number;
    thumbnail?: string;
    onClick: () => void;
}

export function WeekCard({
    weekId,
    weekNumber,
    title,
    isUnlocked,
    isCompleted,
    stars,
    thumbnail,
    onClick,
}: WeekCardProps) {
    const { t } = useLanguage();
    const handleClick = () => {
        // Unlock audio for iOS on user gesture before navigating
        AudioSystem.unlockAudio();
        onClick();
    };

    return (
        <motion.button
            onClick={isUnlocked ? handleClick : undefined}
            disabled={!isUnlocked}
            whileHover={isUnlocked ? { scale: 1.02, y: -4 } : {}}
            whileTap={isUnlocked ? { scale: 0.96 } : {}}
            className={`
                relative w-full aspect-[4/5] rounded-[2rem] p-3 sm:p-5
                flex flex-col items-center
                transition-all duration-500
                ${isUnlocked
                    ? 'glass-card cursor-pointer'
                    : 'bg-white/5 opacity-40 cursor-not-allowed border border-white/5'
                }
            `}
        >
            {/* Background Accent for Unlocked */}
            {isUnlocked && (
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-600/5 rounded-[2.5rem] -z-10" />
            )}

            {/* Week Number Indicator - Professional Pill Shape */}
            <div className="mb-3">
                <div className={`
                    px-4 py-1.5 rounded-full flex items-center justify-center text-xl font-black tracking-tighter
                    ${isUnlocked
                        ? 'bg-indigo-500 text-white shadow-xl shadow-indigo-500/40 ring-4 ring-indigo-500/20'
                        : 'bg-white/10 text-white/20 ring-1 ring-white/5'}
                `}>
                    <span className="opacity-50 text-[10px] mr-1 font-bold uppercase tracking-widest">{t.ui.level}</span> {weekNumber}
                </div>
            </div>

            {/* Week Content */}
            <div className="flex-1 flex flex-col items-center justify-center w-full px-2">
                {!isUnlocked ? (
                    <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5">
                        <Lock size={48} className="text-white/20" />
                    </div>
                ) : (
                    <div className="space-y-4 w-full flex flex-col items-center">
                        {/* Thumbnail Image */}
                        {thumbnail && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/10 border-4 border-white/10"
                            >
                                <img
                                    src={thumbnail}
                                    alt={title}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        )}

                        <div className="flex flex-col items-center gap-2">
                            <h3 className="text-xl sm:text-2xl font-black text-white text-center leading-[1.1] tracking-tight">
                                {title}
                            </h3>
                            {isCompleted && (
                                <div className="flex gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/5 backdrop-blur-sm">
                                    {[1, 2, 3].map((i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className={i <= stars ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'text-white/10'}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Status Badge - Commercial Style */}
            <div className="w-full mt-6">
                {isUnlocked ? (
                    <div className={`
                        w-full py-4 rounded-3xl text-xs font-black uppercase tracking-[0.2em] transition-all
                        ${isCompleted
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-600'}
                    `}>
                        {isCompleted ? `✓ ${t.feedback.mastery_achieved}` : t.ui.begin_journey}
                    </div>
                ) : (
                    <div className="w-full py-4 rounded-3xl text-xs font-black uppercase tracking-[0.2em] bg-white/5 text-white/20 border border-white/5">
                        {t.ui.coming_soon}
                    </div>
                )}
            </div>
        </motion.button>
    );
}
