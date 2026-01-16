'use client';

import { useProgress } from '@/hooks/useProgress';
import { useLanguage } from '@/hooks/useLanguage';
import { WeekCard } from '@/components/ui/WeekCard';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";

import { Header } from "@/components/ui/Header";

import { WEEK_GAME_DATA } from '@/data/GameContent';

export default function Dashboard() {
  const { progress } = useProgress();
  const { t } = useLanguage();
  const router = useRouter();

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
    <div className="app-container items-center overflow-y-auto">
      {/* Unified Content Wrapper - Perfectly Centered and Balanced */}
      <div className="w-full max-w-[1160px] px-6 flex flex-col min-h-screen py-12 sm:py-16">

        {/* Header Block */}
        <div className="pb-8 sm:pb-12">
          <Header showCurriculumPath={true} />
        </div>

        {/* Main Grid Section - Balanced Vertical Spacing */}
        <main className="flex-1 flex items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16 w-full"
          >
            {weeks_data.map((week) => (
              <div key={week.id} className="w-full h-full">
                <WeekCard
                  {...week}
                  weekId={week.id}
                  weekNumber={week.number}
                  onClick={() => router.push(`/week/${week.id}`)}
                />
              </div>
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
