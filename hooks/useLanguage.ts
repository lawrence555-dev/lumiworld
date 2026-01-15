'use client';

import { createElement, createContext, useContext, ReactNode } from 'react';
import { useProgress } from './useProgress';
import { en } from '@/locales/en';
import { zh } from '@/locales/zh';
import { ja } from '@/locales/ja';
import { ko } from '@/locales/ko';
import { th } from '@/locales/th';
import { SupportedLanguage } from '@/systems/SaveSystem';
import type { TranslationKeys } from '@/locales/en';

const translations: Record<SupportedLanguage, TranslationKeys> = {
    'en-US': en,
    'zh-TW': zh,
    'ja-JP': ja,
    'ko-KR': ko,
    'th-TH': th,
};

interface LanguageContextType {
    language: SupportedLanguage;
    t: TranslationKeys;
    setLanguage: (lang: SupportedLanguage) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const { progress, updateSettings } = useProgress();
    const currentLanguage = progress.settings.language;

    const setLanguage = (lang: SupportedLanguage) => {
        updateSettings({ language: lang });
    };

    const contextValue: LanguageContextType = {
        language: currentLanguage,
        t: translations[currentLanguage],
        setLanguage,
    };

    return createElement(LanguageContext.Provider, { value: contextValue }, children);
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
}
