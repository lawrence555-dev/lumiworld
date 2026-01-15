'use client';

import { useProgress } from '@/hooks/useProgress';
import { useLanguage } from '@/hooks/useLanguage';
import { useRouter } from 'next/navigation';
import { Home, RotateCcw, Download } from 'lucide-react';
import { useState } from 'react';
import { LanguagePicker } from '@/components/ui/LanguagePicker';

export default function SettingsPage() {
    const { progress, updateSettings, updateName, resetProgress } = useProgress();
    const { t } = useLanguage();
    const router = useRouter();
    const [showResetConfirm, setShowResetConfirm] = useState(false);

    const handleReset = () => {
        resetProgress();
        setShowResetConfirm(false);
        router.push('/');
    };

    const handleExport = () => {
        const dataStr = JSON.stringify(progress, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `lumiworld-backup-${new Date().toISOString()}.json`;
        link.click();
    };

    return (
        <div className="w-screen h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 overflow-auto">
            <div className="max-w-4xl mx-auto p-8">
                {/* Header */}
                <header className="flex items-center justify-between mb-12">
                    <h1 className="text-5xl font-black text-white">⚙️ {t.settings.title}</h1>
                    <button
                        onClick={() => router.push('/')}
                        className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"
                    >
                        <Home size={32} className="text-white" />
                    </button>
                </header>

                {/* Settings Cards */}
                <div className="space-y-6">
                    {/* Student Name */}
                    <div className="bg-white/10 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">{t.settings.student_name_label}</h2>
                        <input
                            type="text"
                            value={progress.studentName}
                            onChange={(e) => updateName(e.target.value)}
                            className="w-full px-6 py-4 rounded-xl text-2xl font-bold bg-white/20 text-white placeholder-white/50 border-2 border-white/30 focus:border-blue-400 outline-none"
                            placeholder={t.settings.student_name_placeholder}
                        />
                    </div>

                    {/* Language */}
                    <div className="bg-white/10 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">{t.settings.language_label}</h2>
                        <LanguagePicker />
                    </div>

                    {/* Theme */}
                    <div className="bg-white/10 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">{t.settings.theme_label}</h2>
                        <div className="flex gap-4">
                            <button
                                onClick={() => updateSettings({ theme: 'default' })}
                                className={`flex-1 py-6 rounded-xl font-bold text-xl transition-all ${progress.settings.theme === 'default'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white/20 text-white/70'
                                    }`}
                            >
                                {t.ui.default}
                            </button>
                            <button
                                onClick={() => updateSettings({ theme: 'high-contrast' })}
                                className={`flex-1 py-6 rounded-xl font-bold text-xl transition-all ${progress.settings.theme === 'high-contrast'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white/20 text-white/70'
                                    }`}
                            >
                                {t.ui.high_contrast}
                            </button>
                        </div>
                    </div>

                    {/* Data Management */}
                    <div className="bg-white/10 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">{t.settings.data_management}</h2>
                        <div className="space-y-4">
                            <button
                                onClick={handleExport}
                                className="w-full py-6 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-xl flex items-center justify-center gap-3"
                            >
                                <Download size={24} />
                                {t.ui.export_progress}
                            </button>

                            <button
                                onClick={() => setShowResetConfirm(true)}
                                className="w-full py-6 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xl flex items-center justify-center gap-3"
                            >
                                <RotateCcw size={24} />
                                {t.ui.reset_all}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reset Confirmation Modal */}
                {showResetConfirm && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                        <div className="bg-white rounded-3xl p-8 max-w-md">
                            <h3 className="text-3xl font-black text-gray-800 mb-4">
                                {t.settings.reset_confirm_title}
                            </h3>
                            <p className="text-xl text-gray-600 mb-8">
                                {t.settings.reset_confirm_message}
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowResetConfirm(false)}
                                    className="flex-1 py-4 rounded-xl bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold text-xl"
                                >
                                    {t.ui.cancel}
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="flex-1 py-4 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xl"
                                >
                                    {t.ui.reset}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
