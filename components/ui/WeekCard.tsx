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
            whileHover={isUnlocked ? { scale: 1.05 } : {}}
            whileTap={isUnlocked ? { scale: 0.95 } : {}}
            className={`
        relative w-full aspect-square rounded-3xl p-6
        flex flex-col items-center justify-center gap-4
        transition-all duration-300
        ${isUnlocked
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 hover:shadow-2xl cursor-pointer'
                    : 'bg-gray-700 cursor-not-allowed opacity-50'
                }
      `}
        >
            {/* Lock Icon for Locked Weeks */}
            {!isUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Lock size={64} className="text-gray-400" />
                </div>
            )}

            {/* Week Content */}
            {isUnlocked && (
                <>
                    {/* Week Number */}
                    <div className="text-6xl font-black text-white">
                        {weekNumber}
                    </div>

                    {/* Week Title */}
                    <div className="text-xl font-bold text-white text-center">
                        {title}
                    </div>

                    {/* Stars Display */}
                    {isCompleted && (
                        <div className="flex gap-2">
                            {[1, 2, 3].map((i) => (
                                <Star
                                    key={i}
                                    size={32}
                                    className={i <= stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}
                                />
                            ))}
                        </div>
                    )}

                    {/* Completion Badge */}
                    {isCompleted && (
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            ✓ Done
                        </div>
                    )}
                </>
            )}
        </motion.button>
    );
}
