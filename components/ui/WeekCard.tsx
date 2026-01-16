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
            whileHover={isUnlocked ? { scale: 1.02, y: -8 } : {}}
            whileTap={isUnlocked ? { scale: 0.96 } : {}}
            className={`
                relative w-full aspect-[4/6] sm:aspect-[4/5.5] rounded-[2.5rem] overflow-hidden
                flex flex-col
                transition-all duration-500
                ${isUnlocked
                    ? 'glass-card cursor-pointer shadow-2xl shadow-indigo-500/10'
                    : 'bg-white/5 opacity-40 cursor-not-allowed border border-white/5'
                }
            `}
        >
            {/* Image Container - Full Width Top */}
            <div className="relative w-full aspect-[4/3.5] overflow-hidden bg-white">
                {!isUnlocked ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm">
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
                        {/* Overlay Gradient for Text Readability at Bottom of Image */}
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
                    </>
                )}

                {/* Level Badge Overlay */}
                <div className={`
                    absolute top-4 left-4 px-4 py-1.5 rounded-full flex items-center justify-center text-sm font-black tracking-tighter shadow-lg
                    ${isUnlocked
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-800 text-white/40'}
                `}>
                    {t.ui.level} {weekNumber}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col items-center justify-between p-5 text-center">
                <div className="space-y-2 w-full">
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-[1.1] tracking-tight line-clamp-2">
                        {title}
                    </h3>

                    {isCompleted && (
                        <div className="flex justify-center gap-1.5">
                            {[1, 2, 3].map((i) => (
                                <Star
                                    key={i}
                                    size={18}
                                    className={i <= stars ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]' : 'text-white/10'}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Status Footer */}
                <div className="w-full mt-4">
                    {isUnlocked ? (
                        <div className={`
                            w-full py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border
                            ${isCompleted
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : 'bg-white text-indigo-600 border-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02]'}
                        `}>
                            {isCompleted ? `✓ ${t.feedback.mastery_achieved}` : t.ui.begin_journey}
                        </div>
                    ) : (
                        <div className="w-full py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] bg-white/5 text-white/10 border border-white/5">
                            {t.ui.coming_soon}
                        </div>
                    )}
                </div>
            </div>
        </motion.button>
    );
}
