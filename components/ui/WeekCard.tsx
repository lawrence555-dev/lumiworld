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
            whileHover={isUnlocked ? { scale: 1.03, y: -2, rotate: 0.5 } : {}}
            whileTap={isUnlocked ? { scale: 0.97 } : {}}
            className={`
                relative w-full h-full rounded-[2rem] overflow-hidden
                flex flex-col shadow-xl transition-all duration-300
                ${isUnlocked
                    ? 'glass-card cursor-pointer shadow-indigo-500/5'
                    : 'bg-white/5 opacity-40 cursor-not-allowed border border-white/5'
                }
            `}
        >
            {/* Image Container - Using flex-1 to occupy available space */}
            <div className="relative w-full flex-1 min-h-0 overflow-hidden bg-white">
                {!isUnlocked ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm">
                        <Lock size={32} className="text-white/40" />
                    </div>
                ) : (
                    <>
                        {thumbnail ? (
                            <img
                                src={thumbnail}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 flex items-center justify-center">
                                <span className="text-3xl text-white/20 font-black">L{weekNumber}</span>
                            </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
                    </>
                )}

                {/* Level Badge - Compact */}
                <div className={`
                    absolute top-3 left-3 px-3 py-1 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-black tracking-tighter shadow-xl backdrop-blur-md
                    ${isUnlocked
                        ? 'bg-indigo-500/90 text-white'
                        : 'bg-gray-800/80 text-white/40'}
                `}>
                    {t.ui.level} {weekNumber}
                </div>
            </div>

            {/* Content Area - Scalable for height */}
            <div className="shrink-0 p-3 sm:p-4 text-center bg-slate-900/60 backdrop-blur-xl border-t border-white/5">
                <div className="space-y-1 w-full">
                    <h3 className="text-sm sm:text-base font-black text-white leading-tight tracking-tight line-clamp-1">
                        {title}
                    </h3>

                    {isCompleted && (
                        <div className="flex justify-center gap-0.5">
                            {[1, 2, 3].map((i) => (
                                <Star
                                    key={i}
                                    size={12}
                                    className={i <= stars ? 'fill-yellow-400 text-yellow-400' : 'text-white/10'}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Compact Footer Button */}
                <div className="w-full mt-2">
                    {isUnlocked ? (
                        <div className={`
                            w-full py-1.5 sm:py-2 rounded-lg text-[8px] sm:text-[9px] font-black uppercase tracking-[0.15em] transition-all border
                            ${isCompleted
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : 'bg-white text-indigo-600 border-white shadow-lg'}
                        `}>
                            {isCompleted ? `✓ ${t.feedback.mastery_achieved}` : t.ui.begin_journey}
                        </div>
                    ) : (
                        <div className="w-full py-1.5 rounded-lg text-[8px] font-black uppercase tracking-[0.1em] bg-white/5 text-white/10 border border-white/5">
                            {t.ui.coming_soon}
                        </div>
                    )}
                </div>
            </div>
        </motion.button>
    );
}
