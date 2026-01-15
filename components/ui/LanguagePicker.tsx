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
    const { language, setLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const currentOption = languageOptions.find(opt => opt.code === language);

    const handleSelect = (lang: SupportedLanguage) => {
        setLanguage(lang);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xl flex items-center justify-between transition-all"
            >
                <div className="flex items-center gap-3">
                    <Globe size={24} />
                    <span>{currentOption?.flag} {currentOption?.name}</span>
                </div>
                <span className="text-2xl">{isOpen ? '▲' : '▼'}</span>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-slate-800 rounded-xl shadow-2xl overflow-hidden z-50"
                    >
                        {languageOptions.map((option) => (
                            <button
                                key={option.code}
                                onClick={() => handleSelect(option.code)}
                                className={`w-full px-6 py-4 text-left text-xl font-bold flex items-center gap-3 transition-all ${option.code === language
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-slate-800 text-white/70 hover:bg-slate-700'
                                    }`}
                            >
                                <span className="text-3xl">{option.flag}</span>
                                <span>{option.name}</span>
                                {option.code === language && (
                                    <span className="ml-auto text-2xl">✓</span>
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
