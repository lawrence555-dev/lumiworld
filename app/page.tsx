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
      isUnlocked: weekProgress?.isUnlocked || true, // Force unlock all for simplicity
      isCompleted: weekProgress?.isCompleted ?? false,
      stars: weekProgress?.stars ?? 0,
    };
  });

  return (
    <div className="min-h-screen relative flex flex-col">
      <Header />

      {/* Scrollable Content Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-24 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
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
