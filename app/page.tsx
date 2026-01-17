'use client';

import { useProgress } from '@/hooks/useProgress';
import { useLanguage } from '@/hooks/useLanguage';
import { WeekCard } from '@/components/ui/WeekCard';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from 'react';

import { Header } from "@/components/ui/Header";
import { WEEK_GAME_DATA } from '@/data/GameContent';

export default function Dashboard() {
  const { progress } = useProgress();
  const { t } = useLanguage();
  const router = useRouter();
  const [isPreloaded, setIsPreloaded] = useState(false);

  // Precision Image Preloading for Professional Entry
  useEffect(() => {
    const images = Object.values(WEEK_GAME_DATA)
      .map(config => config.thumbnail)
      .filter(Boolean) as string[];

    let loadedCount = 0;
    if (images.length === 0) {
      setIsPreloaded(true);
      return;
    }

    images.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          // Small delay for smooth transition
          setTimeout(() => setIsPreloaded(true), 100);
        }
      };
      img.onerror = () => {
        loadedCount++; // Count error as "done" to unblock
        if (loadedCount === images.length) setIsPreloaded(true);
      };
    });
  }, []);

  const weeks_data = [1, 2, 3, 4, 5, 6, 7, 8].map(num => {
    const weekIdStr = `w${num}`;
    const weekId = weekIdStr as keyof typeof t.weeks;
    const weekProgress = progress.weeks[weekId];
    const weekConfig = WEEK_GAME_DATA[weekIdStr];

    return {
      id: weekId,
      number: num,
      title: t.weeks[weekId]?.title || `Week ${num}`,
      isUnlocked: weekProgress?.isUnlocked || true,
      isCompleted: weekProgress?.isCompleted ?? false,
      stars: weekProgress?.stars ?? 0,
      thumbnail: weekConfig?.thumbnail,
    };
  });

  return (
    <AnimatePresence>
      {!isPreloaded ? (
        <div key="loader" className="fixed inset-0 bg-slate-950 z-[1000] flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-full h-full bg-slate-900/50 rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl backdrop-blur-xl">
                <img
                  src="/assets/brand/logo.png"
                  alt="LumiWorld"
                  className="w-[80%] h-[80%] object-contain drop-shadow-2xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const fallback = (e.target as HTMLImageElement).parentElement?.querySelector('.fallback-logo');
                    if (fallback) (fallback as HTMLElement).style.display = 'flex';
                  }}
                />
                <div className="fallback-logo hidden w-full h-full items-center justify-center text-5xl">
                  🌟
                </div>
              </div>
            </div>
            <div className="text-white/40 font-black tracking-[0.4em] uppercase text-xs">
              LumiWorld
            </div>
          </motion.div>
        </div>
      ) : (
        <div key="content" className="app-container h-screen overflow-hidden px-6 sm:px-12 flex flex-col items-center">
          {/* Unified Content Wrapper - Aligned with Homepage */}
          <div className="w-full max-w-[1280px] h-full flex flex-col pb-6 sm:pb-8 lg:pb-10">
            {/* Header Block - Compact for iPad height */}
            <div className="w-full mb-6 sm:mb-8 shrink-0">
              <Header />
            </div>

            {/* Main Grid Section - Zero-Scroll Strategy */}
            <main className="flex-1 w-full min-h-0 flex items-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full h-full max-h-[70vh] sm:max-h-[75vh]"
              >
                {weeks_data.map((week) => (
                  <motion.div
                    key={week.id}
                    variants={{
                      hidden: { opacity: 0, scale: 0.9, y: 20 },
                      visible: { opacity: 1, scale: 1, y: 0 }
                    }}
                    className="w-full h-full min-h-0"
                  >
                    <WeekCard
                      {...week}
                      weekId={week.id}
                      weekNumber={week.number}
                      onClick={() => router.push(`/week/${week.id}`)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </main>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
