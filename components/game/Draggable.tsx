'use client';

import { useState, useRef, TouchEvent, MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface DraggableProps {
    id: string;
    type: string;
    label: string;
    emoji: string;
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
    onDragEnd,
    onDragStart,
    initialX = 0,
    initialY = 0,
}: DraggableProps) {
    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef<HTMLDivElement>(null);

    const handleDragStart = (clientX: number, clientY: number) => {
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
        onDragEnd(id, clientX, clientY);
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
        absolute bg-white rounded-3xl shadow-2xl p-6
        flex flex-col items-center justify-center gap-2
        cursor-grab active:cursor-grabbing
        select-none touch-none
        ${isDragging ? 'z-50 scale-110' : 'z-10'}
      `}
            style={{
                left: position.x,
                top: position.y,
                width: '140px',
                height: '140px',
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
            <div className="text-6xl">{emoji}</div>
            <div className="text-lg font-bold text-gray-800 text-center">{label}</div>
        </motion.div>
    );
}
