'use client';

import { useProgress } from '@/hooks/useProgress';
import { useLanguage } from '@/hooks/useLanguage';
import { WeekCard } from '@/components/ui/WeekCard';
import { useRouter } from 'next/navigation';
import { Settings, Volume2, VolumeX } from 'lucide-react';

export default function Dashboard() {
  const { progress, updateSettings } = useProgress();
  const { t } = useLanguage();
  const router = useRouter();

  const handleWeekClick = (weekId: string) => {
    router.push(`/week/${weekId}`);
  };

  const toggleMute = () => {
    updateSettings({ isMuted: !progress.settings.isMuted });
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-8">
        <div>
          <h1 className="text-5xl font-black text-white">
            🌟 {t.dashboard.title}
          </h1>
          <p className="text-xl text-blue-200 mt-2">
            {t.dashboard.greeting}, {progress.studentName}!
          </p>
        </div>

        <div className="flex gap-4">
          {/* Mute Toggle */}
          <button
            onClick={toggleMute}
            className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
          >
            {progress.settings.isMuted ? (
              <VolumeX size={32} className="text-white" />
            ) : (
              <Volume2 size={32} className="text-white" />
            )}
          </button>

          {/* Settings */}
          <button
            onClick={() => router.push('/settings')}
            className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
          >
            <Settings size={32} className="text-white" />
          </button>
        </div>
      </header>

      {/* Week Grid */}
      <main className="px-8 pb-8">
        <div className="grid grid-cols-4 grid-rows-2 gap-6 max-w-7xl mx-auto">
          {Object.entries(progress.weeks).map(([weekId, weekData]) => {
            const weekNumber = parseInt(weekId.replace('w', ''));
            return (
              <WeekCard
                key={weekId}
                weekId={weekId}
                weekNumber={weekNumber}
                title={t.weeks[weekId as keyof typeof t.weeks]}
                isUnlocked={weekData.isUnlocked}
                isCompleted={weekData.isCompleted}
                stars={weekData.stars}
                onClick={() => handleWeekClick(weekId)}
              />
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center text-white/50 text-sm">
        {t.ui.made_with_love}
      </footer>
    </div>
  );
}
