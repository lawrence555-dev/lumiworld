'use client';

import { Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { SupportedLanguage } from '@/systems/SaveSystem';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const languageOptions: { code: SupportedLanguage; flag: string; name: string }[] = [
    { code: 'en-US', flag: '🇺🇸', name: 'English' },
    { code: 'zh-TW', flag: '🇹🇼', name: '繁體中文' },
    { code: 'ja-JP', flag: '🇯🇵', name: '日本語' },
    { code: 'ko-KR', flag: '🇰🇷', name: '한국어' },
    { code: 'th-TH', flag: '🇹🇭', name: 'ไทย' },
];

export function LanguagePicker() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
            {languageOptions.map((option) => (
                <button
                    key={option.code}
                    onClick={() => setLanguage(option.code)}
                    className={`
                        relative flex flex-col items-center justify-center p-4 rounded-2xl
                        transition-all duration-300 border-2
                        ${option.code === language
                            ? 'bg-indigo-500/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                            : 'bg-white/5 border-transparent text-white/40 hover:bg-white/10 hover:text-white/60'
                        }
                    `}
                >
                    <span className="text-3xl mb-1">{option.flag}</span>
                    <span className="text-xs font-bold tracking-tight uppercase">{option.name}</span>
                    {option.code === language && (
                        <motion.div
                            layoutId="lang-active"
                            className="absolute inset-0 rounded-2xl border-2 border-indigo-500 z-10 pointer-events-none"
                        />
                    )}
                </button>
            ))}
        </div>
    );
}
