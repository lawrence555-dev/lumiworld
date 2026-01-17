'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DropZoneProps {
    id: string;
    label: string;
    icon: string;
    acceptTypes: string[];
    color: 'green' | 'blue' | 'purple' | 'emerald' | 'cyan' | 'gray';
    filled: boolean;
    selectionImage?: string;
    highlight?: boolean;
    onDrop?: (itemId: string) => void;
}

export function DropZone({
    id,
    label,
    icon,
    acceptTypes,
    color,
    filled,
    selectionImage,
    highlight,
    onDrop,
}: DropZoneProps) {
    const [isHovered, setIsHovered] = useState(false);
    const zoneRef = useRef<HTMLDivElement>(null);

    const getBgColor = () => {
        switch (color) {
            case 'green': return 'from-green-500/80 to-emerald-600/80';
            case 'blue': return 'from-blue-500/80 to-indigo-600/80';
            case 'purple': return 'from-purple-500/80 to-pink-600/80';
            case 'emerald': return 'from-emerald-500/80 to-teal-600/80';
            case 'cyan': return 'from-cyan-500/80 to-blue-600/80';
            default: return 'from-gray-500/80 to-slate-600/80';
        }
    };

    const bgColor = getBgColor();

    return (
        <motion.div
            ref={zoneRef}
            className={`
        relative rounded-[3rem] p-8
        flex flex-col items-center justify-center gap-6
        transition-all duration-500 overflow-hidden
        ${selectionImage ? 'bg-black/20' : `bg-gradient-to-br ${bgColor}`}
        ${isHovered ? 'scale-105 shadow-[0_0_50px_rgba(255,255,255,0.2)]' : 'shadow-2xl'}
        ${filled ? 'brightness-50' : 'brightness-100'}
        border border-white/10
      `}
            style={{
                width: '380px',
                height: '460px',
            }}
            animate={{
                scale: isHovered ? 1.05 : highlight ? [1, 1.05, 1] : 1,
                boxShadow: highlight ? [
                    '0 0 0px rgba(255,255,255,0)',
                    '0 0 60px rgba(255,255,255,0.4)',
                    '0 0 0px rgba(255,255,255,0)'
                ] : 'none'
            }}
            transition={{
                duration: highlight ? 1.5 : 0.3,
                repeat: highlight ? Infinity : 0,
                ease: "easeInOut"
            }}
        >
            {/* Background Selection Image */}
            {selectionImage && (
                <div className="absolute inset-0 z-0">
                    <img
                        src={selectionImage}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${bgColor.replace(/\/80/g, '/40')} via-transparent to-transparent opacity-60`} />
                </div>
            )}

            {/* Content Wrapper for Glassmorphism effect when image is present */}
            <div className={`
                relative z-10 flex flex-col items-center gap-6 
                ${selectionImage ? 'bg-black/20 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10' : ''}
            `}>
                {/* Icon */}
                <div className="text-9xl filter drop-shadow-2xl transform transition-transform hover:scale-110 duration-300">
                    {icon}
                </div>

                {/* Label */}
                <div className="text-4xl font-black text-white text-center tracking-tighter drop-shadow-lg">
                    {label}
                </div>
            </div>

            {/* Filled Indicator */}
            {filled && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-[3rem]">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-9xl text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                    >
                        ✓
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
}
