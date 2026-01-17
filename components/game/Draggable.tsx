'use client';

import { useState, useRef, TouchEvent, MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface DraggableProps {
    id: string;
    type: string;
    label: string;
    emoji: string;
    image?: string;
    onDragEnd: (id: string, x: number, y: number) => void;
    onDragStart?: (id: string) => void;
    initialX?: number;
    initialY?: number;
}

export function Draggable({
    id,
    type,
    label,
    emoji,
    image,
    onDragEnd,
    onDragStart,
    initialX = 0,
    initialY = 0,
}: DraggableProps) {
    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef<HTMLDivElement>(null);
    const startPosRef = useRef<{ x: number; y: number } | null>(null);

    const handleDragStart = (clientX: number, clientY: number) => {
        startPosRef.current = { x: clientX, y: clientY };
        setIsDragging(true);
        onDragStart?.(id);
    };

    const handleDragMove = (clientX: number, clientY: number) => {
        if (!isDragging || !dragRef.current) return;

        const rect = dragRef.current.getBoundingClientRect();
        setPosition({
            x: clientX - rect.width / 2,
            y: clientY - rect.height / 2,
        });
    };

    const handleDragEnd = (clientX: number, clientY: number) => {
        setIsDragging(false);

        // Only trigger callback if actually dragged (minimum 30px movement)
        if (startPosRef.current) {
            const dx = clientX - startPosRef.current.x;
            const dy = clientY - startPosRef.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 30) {
                onDragEnd(id, clientX, clientY);
            } else {
                // Reset position if not dragged far enough
                setPosition({ x: initialX, y: initialY });
            }
        }
        startPosRef.current = null;
    };

    // Touch Events
    const handleTouchStart = (e: TouchEvent) => {
        const touch = e.touches[0];
        handleDragStart(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        const touch = e.touches[0];
        handleDragMove(touch.clientX, touch.clientY);
    };

    const handleTouchEnd = (e: TouchEvent) => {
        const touch = e.changedTouches[0];
        handleDragEnd(touch.clientX, touch.clientY);
    };

    // Mouse Events
    const handleMouseDown = (e: MouseEvent) => {
        handleDragStart(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            handleDragMove(e.clientX, e.clientY);
        }
    };

    const handleMouseUp = (e: MouseEvent) => {
        if (isDragging) {
            handleDragEnd(e.clientX, e.clientY);
        }
    };

    return (
        <motion.div
            ref={dragRef}
            className={`
        absolute bg-white rounded-[2.5rem] shadow-2xl p-8
        flex flex-col items-center justify-center gap-4
        cursor-grab active:cursor-grabbing
        select-none touch-none
        border-4 border-white/50
        ${isDragging ? 'z-50 scale-110 shadow-[0_30px_60px_rgba(0,0,0,0.5)]' : 'z-10'}
      `}
            style={{
                left: position.x,
                top: position.y,
                width: '200px',
                height: '200px',
            }}
            animate={{
                scale: isDragging ? 1.1 : 1,
                rotate: isDragging ? 5 : 0,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {image ? (
                <div className="w-28 h-28 relative flex items-center justify-center">
                    <img
                        src={image}
                        alt={label}
                        className="w-full h-full object-contain pointer-events-none drop-shadow-xl"
                    />
                </div>
            ) : (
                <div className="text-8xl filter drop-shadow-lg">{emoji}</div>
            )}
            <div className="text-2xl font-black text-gray-800 text-center tracking-tight leading-tight">{label}</div>
        </motion.div>
    );
}
