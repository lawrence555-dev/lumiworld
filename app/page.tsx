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
    return {
      id: weekId,
      number: num,
      title: t.weeks[weekId].title,
      isUnlocked: progress.weeks[weekId]?.isUnlocked ?? false,
      isCompleted: progress.weeks[weekId]?.isCompleted ?? false,
      stars: progress.weeks[weekId]?.stars ?? 0,
    };
  });

  return (
    <main className="landscape-container">
      <Header />

      <div className="flex-1 mt-32 overflow-y-auto pb-12 px-4 scrollbar-hide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {weeks_data.map((week) => (
            <WeekCard
              key={week.id}
              weekId={week.id}
              weekNumber={week.number}
              title={week.title}
              isUnlocked={week.isUnlocked}
              isCompleted={week.isCompleted}
              stars={week.stars}
              onClick={() => router.push(`/week/${week.id}`)}
            />
          ))}
        </motion.div>
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 text-white/30 text-[10px] font-medium tracking-widest uppercase flex items-center gap-1">
        {t.ui.madeWith} <span className="text-rose-500/50">❤️</span> {t.ui.forFourYearOlds}
      </div>
    </main>
  );
}
