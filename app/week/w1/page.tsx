'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Draggable } from '@/components/game/Draggable';
import { DropZone } from '@/components/game/DropZone';
import { useProgress } from '@/hooks/useProgress';
import { AudioSystem } from '@/systems/AudioSystem';
import { GameLogic } from '@/systems/GameLogic';
import confetti from 'canvas-confetti';
import { Home } from 'lucide-react';

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

export default function Week1Page() {
    const router = useRouter();
    const { updateWeek } = useProgress();
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [livingFilled, setLivingFilled] = useState(false);
    const [nonLivingFilled, setNonLivingFilled] = useState(false);

    const currentItem = gameItems[currentItemIndex];
    const isGameComplete = currentItemIndex >= gameItems.length;

    useEffect(() => {
        // Speak item name when it appears
        if (currentItem && !isGameComplete) {
            AudioSystem.speak(currentItem.label);
        }
    }, [currentItemIndex, currentItem, isGameComplete]);

    const handleDragEnd = async (itemId: string, x: number, y: number) => {
        // Get drop zone positions (simplified - in real app, use refs)
        const livingZone = { x: 200, y: 300, width: 280, height: 320 };
        const nonLivingZone = { x: 700, y: 300, width: 280, height: 320 };

        const isInLivingZone =
            x >= livingZone.x && x <= livingZone.x + livingZone.width &&
            y >= livingZone.y && y <= livingZone.y + livingZone.height;

        const isInNonLivingZone =
            x >= nonLivingZone.x && x <= nonLivingZone.x + nonLivingZone.width &&
            y >= nonLivingZone.y && y <= nonLivingZone.y + nonLivingZone.height;

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
                    Week 1: Living vs Non-Living
                </div>

                <div className="text-2xl font-bold text-white">
                    {currentItemIndex + 1} / {gameItems.length}
                </div>
            </header>

            {/* Drop Zones */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-12">
                <DropZone
                    id="living"
                    label="Living"
                    icon="❤️"
                    acceptTypes={['living']}
                    color="green"
                    filled={livingFilled}
                />

                <DropZone
                    id="non-living"
                    label="Non-Living"
                    icon="🪨"
                    acceptTypes={['non-living']}
                    color="gray"
                    filled={nonLivingFilled}
                />
            </div>

            {/* Draggable Item */}
            {currentItem && (
                <Draggable
                    id={currentItem.id}
                    type={currentItem.type}
                    label={currentItem.label}
                    emoji={currentItem.emoji}
                    initialX={window.innerWidth / 2 - 70}
                    initialY={100}
                    onDragEnd={handleDragEnd}
                />
            )}
        </div>
    );
}
