'use client';

import { Lock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface WeekCardProps {
    weekId: string;
    weekNumber: number;
    title: string;
    isUnlocked: boolean;
    isCompleted: boolean;
    stars: number;
    onClick: () => void;
}

export function WeekCard({
    weekId,
    weekNumber,
    title,
    isUnlocked,
    isCompleted,
    stars,
    onClick,
}: WeekCardProps) {
    return (
        <motion.button
            onClick={isUnlocked ? onClick : undefined}
            disabled={!isUnlocked}
            whileHover={isUnlocked ? { scale: 1.05, y: -5 } : {}}
            whileTap={isUnlocked ? { scale: 0.95 } : {}}
            className={`
                relative w-full aspect-square md:aspect-[4/5] rounded-[2.5rem] p-4 sm:p-6
                flex flex-col items-center justify-between
                transition-all duration-500
                ${isUnlocked
                    ? 'glass-card cursor-pointer shadow-indigo-500/10'
                    : 'bg-white/5 opacity-40 cursor-not-allowed border border-white/5'
                }
            `}
        >
            {/* Background Accent for Unlocked */}
            {isUnlocked && (
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-[2.5rem] -z-10" />
            )}

            {/* Week Number Indicator */}
            <div className={`
                w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black
                ${isUnlocked ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-white/10 text-white/20'}
            `}>
                {weekNumber}
            </div>

            {/* Week Content */}
            <div className="flex-1 flex flex-col items-center justify-center gap-2">
                {!isUnlocked ? (
                    <div className="bg-white/10 p-4 rounded-full">
                        <Lock size={32} className="text-white/40" />
                    </div>
                ) : (
                    <>
                        <h3 className="text-xl font-extrabold text-white text-center leading-tight">
                            {title}
                        </h3>
                        {isCompleted && (
                            <div className="flex gap-1.5 px-3 py-1.5 bg-white/5 rounded-2xl">
                                {[1, 2, 3].map((i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        className={i <= stars ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Status Badge */}
            <div className="w-full">
                {isUnlocked ? (
                    <div className={`
                        w-full py-3 rounded-2xl text-sm font-bold transition-colors
                        ${isCompleted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'}
                    `}>
                        {isCompleted ? '✓ Completed' : 'Let\'s Play!'}
                    </div>
                ) : (
                    <div className="w-full py-3 rounded-2xl text-sm font-bold bg-white/5 text-white/20 border border-white/5">
                        Locked
                    </div>
                )}
            </div>
        </motion.button>
    );
}
