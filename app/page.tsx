'use client';

import { useProgress } from '@/hooks/useProgress';
import { useLanguage } from '@/hooks/useLanguage';
import { WeekCard } from '@/components/ui/WeekCard';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";

import { Header } from "@/components/ui/Header";

export default function Dashboard() {
  const { progress } = useProgress();
  const { t } = useLanguage();
  const router = useRouter();

  const weeks_data = [1, 2, 3, 4, 5, 6, 7, 8].map(num => {
    const weekId = `w${num}` as keyof typeof t.weeks;
    const weekProgress = progress.weeks[weekId];
    return {
      id: weekId,
      number: num,
      title: t.weeks[weekId]?.title || `Week ${num}`,
      isUnlocked: weekProgress?.isUnlocked || true,
      isCompleted: weekProgress?.isCompleted ?? false,
      stars: weekProgress?.stars ?? 0,
    };
  });

  return (
    <div className="min-h-screen relative">
      {/* Sticky Header with Curriculum Path */}
      <div className="sticky top-0 z-50 bg-gradient-to-b from-[#0B0E14] via-[#0B0E14] to-transparent pb-8">
        <Header showCurriculumPath={true} />
      </div>

      {/* Cards Container */}
      <main className="w-full max-w-7xl mx-auto px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {weeks_data.map((week) => (
            <div key={week.id} className="w-full">
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

      {/* Discreet Footer */}
      <div className="fixed bottom-4 left-6 text-white/20 text-[10px] uppercase tracking-widest pointer-events-none">
        {t.ui.madeWith} ❤️ {t.ui.forFourYearOlds}
      </div>
    </div>
  );
}
