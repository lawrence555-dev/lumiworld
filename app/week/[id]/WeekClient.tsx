'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/hooks/useLanguage';
import { Draggable } from '@/components/game/Draggable';
import { DropZone } from '@/components/game/DropZone';
import { useProgress } from '@/hooks/useProgress';
import { AudioSystem } from '@/systems/AudioSystem';
import { GameLogic } from '@/systems/GameLogic';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Home } from 'lucide-react';
import { use } from 'react';
import { WEEK_GAME_DATA, GameItem } from '@/data/GameContent';
import { GAME_LABELS } from '@/data/GameLabels';
import { WEEK_SKILL_MAP } from '@/systems/SaveSystem';

export default function WeekClient({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const params = use(paramsPromise);
    const { id } = params;
    const router = useRouter();
    const { t, language } = useLanguage();
    const { updateWeek, updateMastery } = useProgress();

    // Game configuration for this week
    const config = WEEK_GAME_DATA[id as keyof typeof WEEK_GAME_DATA];

    // Randomized items for this session
    const randomizedItems = useMemo(() => {
        if (!config) return [];
        return [...config.items].sort(() => Math.random() - 0.5);
    }, [config]);

    // Game state
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [consecutiveErrors, setConsecutiveErrors] = useState(0);
    const [characterEmotion, setCharacterEmotion] = useState<'neutral' | 'happy' | 'sad'>('neutral');
    const [leftFilled, setLeftFilled] = useState(false);
    const [rightFilled, setRightFilled] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Refs for drop zones
    const leftZoneRef = useRef<HTMLDivElement>(null);
    const rightZoneRef = useRef<HTMLDivElement>(null);

    // If config doesn't exist, show Coming Soon
    if (!config) {
        return (
            <div className="w-screen h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex flex-col items-center justify-center p-8 text-white">
                <button
                    onClick={() => router.push('/')}
                    className="absolute top-8 left-8 w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"
                >
                    <Home size={32} />
                </button>
                <div className="text-9xl mb-8">🚀</div>
                <h1 className="text-5xl font-black mb-4">{t.ui.coming_soon}!</h1>
                <p className="text-2xl opacity-70">Level {id.replace('w', '')} is coming soon! ✨</p>
                <button
                    onClick={() => router.push('/')}
                    className="mt-12 px-10 py-4 bg-indigo-500 rounded-2xl font-bold text-xl shadow-lg hover:bg-indigo-400 transition-all"
                >
                    {t.ui.back_home}
                </button>
            </div>
        );
    }

    const currentItem = randomizedItems[currentItemIndex];
    const isGameComplete = currentItemIndex >= randomizedItems.length;

    useEffect(() => {
        if (currentItem && !isGameComplete && !isProcessing) {
            // Initialize start time on first item
            if (startTimeRef.current === 0) {
                startTimeRef.current = Date.now();
            }

            // Get localized label
            const localizedLabel = GAME_LABELS[currentItem.id]?.[language] || currentItem.label;

            // Phonics Reinforcement (Week 2): Add /f/ sound for Fish-related items
            let speechText = localizedLabel;
            if (id === 'w2' && (currentItem.id.startsWith('alpha_f') || currentItem.id.startsWith('fish'))) {
                // Prepend phonics sound (assuming 'f' or similar)
                speechText = language === 'en-US' ? `f, f, ${localizedLabel}` : `${localizedLabel}`;
            }

            // Small delay to ensure audio context is ready on iOS
            const timer = setTimeout(() => {
                console.log('[Game] Speaking item:', speechText);
                AudioSystem.speak(speechText);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [currentItemIndex, currentItem, isGameComplete, isProcessing, language]);

    const handleDragEnd = async (itemId: string, x: number, y: number) => {
        // Prevent double-trigger with processing lock
        if (isProcessing) return;
        if (!leftZoneRef.current || !rightZoneRef.current) return;

        const leftRect = leftZoneRef.current.getBoundingClientRect();
        const rightRect = rightZoneRef.current.getBoundingClientRect();

        const checkOverlap = (rect: DOMRect, cx: number, cy: number) => {
            const dragArea = 80;
            return (
                cx + dragArea / 2 >= rect.left &&
                cx - dragArea / 2 <= rect.right &&
                cy + dragArea / 2 >= rect.top &&
                cy - dragArea / 2 <= rect.bottom
            );
        };

        const isInLeftZone = checkOverlap(leftRect, x, y);
        const isInRightZone = checkOverlap(rightRect, x, y);

        const isCorrect =
            (currentItem.type === config.leftZone.id && isInLeftZone) ||
            (currentItem.type === config.rightZone.id && isInRightZone);

        if (isCorrect) {
            setIsProcessing(true);

            confetti({
                particleCount: 50,
                spread: 50,
                origin: { y: 0.7 }
            });
            AudioSystem.playSuccess(t.feedback.correct);
            setCorrectCount(prev => prev + 1);

            if (isInLeftZone) setLeftFilled(true);
            else setRightFilled(true);

            setTimeout(() => {
                setCurrentItemIndex(prev => prev + 1);
                setLeftFilled(false);
                setRightFilled(false);
                setIsProcessing(false);
                setConsecutiveErrors(0); // Reset scaffolding on success
                setCharacterEmotion('happy');
                setTimeout(() => setCharacterEmotion('neutral'), 1500);
            }, 800);
        } else if (isInLeftZone || isInRightZone) {
            AudioSystem.playError(t.feedback.try_again);
            setConsecutiveErrors(prev => prev + 1); // Trigger scaffolding on error

            // Week 7: SEL Emotions - Dolphin gets sad when dragging trash or error
            if (id === 'w7') {
                setCharacterEmotion('sad');
                setTimeout(() => setCharacterEmotion('neutral'), 2000);
            }
        }
    };

    // Ref to prevent double execution of victory effect
    const hasRedirectedRef = useRef(false);
    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        if (isGameComplete && randomizedItems.length > 0 && !hasRedirectedRef.current) {
            hasRedirectedRef.current = true;

            const stars = GameLogic.calculateStars(correctCount, randomizedItems.length);
            updateWeek(id as any, stars);

            // Update mastery time and status
            const timeSpent = (Date.now() - startTimeRef.current) / 1000;
            const skillId = WEEK_SKILL_MAP[id] || id;
            updateMastery(skillId, true, timeSpent);

            confetti({
                particleCount: 100,
                spread: 80,
                origin: { y: 0.5 }
            });
            AudioSystem.speak(`${t.feedback.amazing} ${t.weeks[id as keyof typeof t.weeks].title}`);

            setTimeout(() => {
                router.push('/');
            }, 2500);
        }
    }, [isGameComplete, correctCount, updateWeek, updateMastery, router, id, t.weeks, t.feedback.amazing, randomizedItems.length]);

    if (isGameComplete) {
        return (
            <div className="w-screen h-screen bg-gradient-to-br from-emerald-600 to-indigo-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-9xl mb-8">🏆</div>
                    <h1 className="text-7xl font-black text-white mb-4 tracking-tighter">{t.feedback.mastery_achieved}</h1>
                    <p className="text-3xl text-white/80 font-bold uppercase tracking-[0.2em] mb-8">
                        {correctCount} / {randomizedItems.length} {t.feedback.correct}
                    </p>
                    <button
                        onClick={() => router.push('/')}
                        className="px-8 py-4 bg-white/20 hover:bg-white/30 rounded-2xl text-white font-bold text-xl transition-all"
                    >
                        🏠 {t.ui.back_home}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-screen h-screen bg-[#0B0E14] relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/40 via-background to-purple-950/40 -z-10" />
            <div className="blob opacity-20 left-[10%] top-[10%]" />
            <div className="blob-secondary opacity-20 right-[10%] bottom-[10%]" />

            {/* Header */}
            <header className="absolute top-8 left-10 right-10 flex justify-between items-end z-20">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => router.push('/')}
                        className="w-16 h-16 rounded-3xl glass hover:bg-white/10 flex items-center justify-center transition-all active:scale-95 shadow-2xl"
                    >
                        <Home size={32} className="text-white" />
                    </button>
                    <div>
                        <h2 className="text-white/40 text-xs font-black uppercase tracking-[0.3em] mb-1">
                            {config.title}
                        </h2>
                        <div className="text-3xl font-black text-white tracking-tighter">
                            Level {id.replace('w', '')}
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 px-8 py-4 rounded-3xl border border-white/5 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                        <span className="text-white/40 font-black text-sm uppercase tracking-widest">Progress</span>
                        <div className="text-3xl font-black text-indigo-400 tabular-nums">
                            {currentItemIndex + 1} <span className="text-white/20 text-xl mx-1">/</span> {randomizedItems.length}
                        </div>
                    </div>
                </div>
            </header>

            {/* SEL Character (Week 7) */}
            {id === 'w7' && (
                <motion.div
                    animate={{
                        y: characterEmotion === 'sad' ? [0, 10, 0] : [0, -20, 0],
                        scale: characterEmotion === 'happy' ? 1.2 : 1
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[180%] text-9xl z-10"
                >
                    {characterEmotion === 'sad' ? '😢' : characterEmotion === 'happy' ? '🐬✨' : '🐬'}
                </motion.div>
            )}

            {/* Drop Zones */}
            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-12 sm:gap-20">
                <div ref={leftZoneRef} className="transition-transform hover:scale-105">
                    <DropZone
                        id={config.leftZone.id}
                        label={(t.zones as any)[config.leftZone.id] || config.leftZone.label}
                        icon={config.leftZone.icon}
                        acceptTypes={[config.leftZone.id]}
                        color={config.leftZone.color}
                        filled={leftFilled}
                        highlight={consecutiveErrors >= 2 && currentItem.type === config.leftZone.id}
                    />
                </div>

                <div ref={rightZoneRef} className="transition-transform hover:scale-105">
                    <DropZone
                        id={config.rightZone.id}
                        label={(t.zones as any)[config.rightZone.id] || config.rightZone.label}
                        icon={config.rightZone.icon}
                        acceptTypes={[config.rightZone.id]}
                        color={config.rightZone.color}
                        filled={rightFilled}
                        highlight={consecutiveErrors >= 2 && currentItem.type === config.rightZone.id}
                    />
                </div>
            </div>

            {/* Draggable Item */}
            {currentItem && !isGameComplete && (
                <div className="relative z-50">
                    <Draggable
                        key={currentItem.id}
                        id={currentItem.id}
                        type={currentItem.type}
                        label={GAME_LABELS[currentItem.id]?.[language as keyof typeof GAME_LABELS[string]] || currentItem.label}
                        emoji={currentItem.emoji}
                        initialX={typeof window !== 'undefined' ? window.innerWidth / 2 - 80 : 0}
                        initialY={150}
                        onDragEnd={handleDragEnd}
                    />
                </div>
            )}

            {/* Hint Overlay */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none">
                <p className="text-white/20 font-black uppercase tracking-[0.4em] text-xs">
                    {t.feedback.hint}
                </p>
            </div>
        </div>
    );
}
