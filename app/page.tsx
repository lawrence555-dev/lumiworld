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
    {/* Optimized wrapper for scroll stability and centering */ }
    < div className = "w-full max-w-[1240px] px-8 sm:px-12 flex flex-col items-center py-10 sm:py-16" >

      {/* Header Block - Massive spacing to ensure no overlap */ }
      < div className = "w-full mb-16 sm:mb-24 shrink-0 px-4" >
        <Header />
        </div >

    {/* Main Grid Section - Ensure bottom padding is visible on all iPads */ }
    < main className = "w-full pb-32" >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12"
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
        </main >
      </div >
    </div >
  );
}
