'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DropZoneProps {
    id: string;
    label: string;
    icon: string;
    acceptTypes: string[];
    color: 'green' | 'gray';
    filled: boolean;
    onDrop?: (itemId: string) => void;
}

export function DropZone({
    id,
    label,
    icon,
    acceptTypes,
    color,
    filled,
    onDrop,
}: DropZoneProps) {
    const [isHovered, setIsHovered] = useState(false);
    const zoneRef = useRef<HTMLDivElement>(null);

    const bgColor = color === 'green'
        ? 'bg-gradient-to-br from-green-500 to-emerald-600'
        : 'bg-gradient-to-br from-gray-500 to-slate-600';

    return (
        <motion.div
            ref={zoneRef}
            className={`
        relative rounded-3xl p-8
        flex flex-col items-center justify-center gap-4
        transition-all duration-300
        ${bgColor}
        ${isHovered ? 'scale-105 shadow-2xl' : 'shadow-xl'}
        ${filled ? 'opacity-50' : 'opacity-100'}
      `}
            style={{
                width: '280px',
                height: '320px',
            }}
            animate={{
                scale: isHovered ? 1.05 : 1,
            }}
        >
            {/* Icon */}
            <div className="text-8xl">{icon}</div>

            {/* Label */}
            <div className="text-3xl font-black text-white text-center">
                {label}
            </div>

            {/* Filled Indicator */}
            {filled && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl">
                    <div className="text-6xl">✓</div>
                </div>
            )}
        </motion.div>
    );
}
