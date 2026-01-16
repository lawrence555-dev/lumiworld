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
                relative w-full aspect-[4/5.4] rounded-[2.5rem] overflow-hidden
                flex flex-col shadow-2xl transition-all duration-500
                ${isUnlocked
                    ? 'glass-card cursor-pointer shadow-indigo-500/10'
                    : 'bg-white/5 opacity-40 cursor-not-allowed border border-white/5'
                }
            `}
        >
            {/* Image Container - Dominant Area */}
            <div className="relative w-full aspect-[4/4.5] overflow-hidden bg-white">
                {!isUnlocked ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm">
                        <Lock size={48} className="text-white/40" />
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
                                <span className="text-4xl text-white/20 font-black">L{weekNumber}</span>
                            </div>
                        )}
                        {/* Soft Bottom Fade */}
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
                    </>
                )}

                {/* Level Badge Overlay - Floating Style */}
                <div className={`
                    absolute top-5 left-5 px-4 py-1.5 rounded-full flex items-center justify-center text-sm font-black tracking-tighter shadow-2xl backdrop-blur-md
                    ${isUnlocked
                        ? 'bg-indigo-500/90 text-white'
                        : 'bg-gray-800/80 text-white/40'}
                `}>
                    {t.ui.level} {weekNumber}
                </div>
            </div>

            {/* Content Area - Compact & Minimalist */}
            <div className="flex-1 flex flex-col items-center justify-between p-4 sm:p-5 text-center bg-slate-900/40 backdrop-blur-xl border-t border-white/5">
                <div className="space-y-1.5 w-full">
                    <h3 className="text-lg sm:text-xl font-black text-white leading-tight tracking-tight line-clamp-2 drop-shadow-sm">
                        {title}
                    </h3>

                    {isCompleted && (
                        <div className="flex justify-center gap-1">
                            {[1, 2, 3].map((i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    className={i <= stars ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]' : 'text-white/10'}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Status Footer - Button Style */}
                <div className="w-full mt-3">
                    {isUnlocked ? (
                        <div className={`
                            w-full py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all border
                            ${isCompleted
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : 'bg-white text-indigo-600 border-white shadow-xl shadow-indigo-500/20 hover:bg-indigo-50 hover:scale-[1.02] active:scale-95'}
                        `}>
                            {isCompleted ? `✓ ${t.feedback.mastery_achieved}` : t.ui.begin_journey}
                        </div>
                    ) : (
                        <div className="w-full py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] bg-white/5 text-white/10 border border-white/5">
                            {t.ui.coming_soon}
                        </div>
                    )}
                </div>
            </div>
        </motion.button>
    );
}
