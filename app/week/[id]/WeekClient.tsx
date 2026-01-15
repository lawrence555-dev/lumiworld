'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/hooks/useLanguage';
import { Draggable } from '@/components/game/Draggable';
import { DropZone } from '@/components/game/DropZone';
import { useProgress } from '@/hooks/useProgress';
import { AudioSystem } from '@/systems/AudioSystem';
import { GameLogic } from '@/systems/GameLogic';
import confetti from 'canvas-confetti';
import { Home } from 'lucide-react';
import { use } from 'react';

interface GameItem {
    id: string;
    type: 'living' | 'non-living';
    label: string;
    emoji: string;
}

const gameItems: GameItem[] = [
    { id: 'cat', type: 'living', label: 'Cat', emoji: '🐱' },
    { id: 'flower', type: 'living', label: 'Flower', emoji: '🌻' },
    { id: 'tree', type: 'living', label: 'Tree', emoji: '🌳' },
    { id: 'butterfly', type: 'living', label: 'Butterfly', emoji: '🦋' },
    { id: 'rock', type: 'non-living', label: 'Rock', emoji: '🪨' },
    { id: 'car', type: 'non-living', label: 'Car', emoji: '🚗' },
    { id: 'robot', type: 'non-living', label: 'Robot', emoji: '🤖' },
    { id: 'hat', type: 'non-living', label: 'Hat', emoji: '🎩' },
];

export default function WeekClient({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const params = use(paramsPromise);
    const { id } = params;
    const router = useRouter();
    const { t } = useLanguage();
    const { updateWeek } = useProgress();

    // Game state
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [livingFilled, setLivingFilled] = useState(false);
    const [nonLivingFilled, setNonLivingFilled] = useState(false);

    // Refs for drop zones to get dynamic positions
    const livingZoneRef = useRef<HTMLDivElement>(null);
    const nonLivingZoneRef = useRef<HTMLDivElement>(null);

    const isWeek1 = id === 'w1';

    // Fallback for non-w1 weeks (Coming Soon)
    if (!isWeek1) {
        return (
            <div className="w-screen h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex flex-col items-center justify-center p-8 text-white">
                <button
                    onClick={() => router.push('/')}
                    className="absolute top-8 left-8 w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"
                >
                    <Home size={32} />
                </button>
                <div className="text-9xl mb-8">🚀</div>
                <h1 className="text-5xl font-black mb-4">Week {id.replace('w', '')}: {t.weeks[id as keyof typeof t.weeks]?.title}</h1>
                <p className="text-2xl opacity-70">Coming very soon! Let's play Week 1 first! ✨</p>
                <button
                    onClick={() => router.push('/')}
                    className="mt-12 px-10 py-4 bg-indigo-500 rounded-2xl font-bold text-xl shadow-lg hover:bg-indigo-400 transition-all"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    const currentItem = gameItems[currentItemIndex];
    const isGameComplete = currentItemIndex >= gameItems.length;

    useEffect(() => {
        // Speak item name when it appears
        if (currentItem && !isGameComplete) {
            AudioSystem.speak(currentItem.label);
        }
    }, [currentItemIndex, currentItem, isGameComplete]);

    const handleDragEnd = async (itemId: string, x: number, y: number) => {
        if (!livingZoneRef.current || !nonLivingZoneRef.current) return;

        // Get actual positions of drop zones
        const livingRect = livingZoneRef.current.getBoundingClientRect();
        const nonLivingRect = nonLivingZoneRef.current.getBoundingClientRect();

        // Helper function to check if a rect overlaps with another rect
        const checkOverlap = (rect: DOMRect, cx: number, cy: number) => {
            const dragArea = 60; // Forgiving area around the touch/mouse point
            return (
                cx + dragArea / 2 >= rect.left &&
                cx - dragArea / 2 <= rect.right &&
                cy + dragArea / 2 >= rect.top &&
                cy - dragArea / 2 <= rect.bottom
            );
        };

        const isInLivingZone = checkOverlap(livingRect, x, y);
        const isInNonLivingZone = checkOverlap(nonLivingRect, x, y);

        const isCorrect =
            (currentItem.type === 'living' && isInLivingZone) ||
            (currentItem.type === 'non-living' && isInNonLivingZone);

        if (isCorrect) {
            // Success!
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            await AudioSystem.playSuccess('Great job!');
            setCorrectCount(prev => prev + 1);

            // Mark zone as filled
            if (currentItem.type === 'living') {
                setLivingFilled(true);
            } else {
                setNonLivingFilled(true);
            }

            // Move to next item
            setTimeout(() => {
                setCurrentItemIndex(prev => prev + 1);
                setLivingFilled(false);
                setNonLivingFilled(false);
            }, 1500);
        } else if (isInLivingZone || isInNonLivingZone) {
            // Wrong zone
            await AudioSystem.playError('Try again!');
        }
    };

    useEffect(() => {
        if (isGameComplete) {
            // Calculate stars
            const stars = GameLogic.calculateStars(correctCount, gameItems.length);
            updateWeek('w1', stars);

            // Victory celebration
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.5 }
            });
            AudioSystem.speak('Amazing! You completed Week 1!');

            // Return to dashboard after 3 seconds
            setTimeout(() => {
                router.push('/');
            }, 3000);
        }
    }, [isGameComplete, correctCount, updateWeek, router]);

    if (isGameComplete) {
        return (
            <div className="w-screen h-screen bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-9xl mb-8">🎉</div>
                    <h1 className="text-6xl font-black text-white mb-4">You Did It!</h1>
                    <p className="text-3xl text-white">
                        {correctCount} / {gameItems.length} Correct
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-screen h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden">
            {/* Header */}
            <header className="absolute top-8 left-8 right-8 flex justify-between items-center z-20">
                <button
                    onClick={() => router.push('/')}
                    className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"
                >
                    <Home size={32} className="text-white" />
                </button>

                <div className="text-3xl font-bold text-white">
                    Week 1: {t.weeks.w1.title}
                </div>

                <div className="text-2xl font-bold text-white">
                    {currentItemIndex + 1} / {gameItems.length}
                </div>
            </header>

            {/* Drop Zones */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-12">
                <div ref={livingZoneRef}>
                    <DropZone
                        id="living"
                        label="Living"
                        icon="❤️"
                        acceptTypes={['living']}
                        color="green"
                        filled={livingFilled}
                    />
                </div>

                <div ref={nonLivingZoneRef}>
                    <DropZone
                        id="non-living"
                        label="Non-Living"
                        icon="🪨"
                        acceptTypes={['non-living']}
                        color="gray"
                        filled={nonLivingFilled}
                    />
                </div>
            </div>

            {/* Draggable Item */}
            {currentItem && (
                <Draggable
                    id={currentItem.id}
                    type={currentItem.type}
                    label={currentItem.label}
                    emoji={currentItem.emoji}
                    initialX={typeof window !== 'undefined' ? window.innerWidth / 2 - 70 : 0}
                    initialY={100}
                    onDragEnd={handleDragEnd}
                />
            )}
        </div>
    );
}
