/**
 * SaveSystem - LocalStorage Persistence Layer (Updated with Language Support)
 * Handles all data persistence with UserProgress interface
 */

export type SupportedLanguage = 'en-US' | 'zh-TW' | 'ja-JP' | 'ko-KR' | 'th-TH';

export interface WeekProgress {
    isUnlocked: boolean;
    isCompleted: boolean;
    stars: number; // 0-3
    lastPlayed: string; // ISO Date string
}

export interface UserProgress {
    studentName: string;
    settings: {
        isMuted: boolean;
        theme: 'default' | 'high-contrast';
        language: SupportedLanguage; // NEW: Language preference
    };
    weeks: {
        [weekId: string]: WeekProgress; // e.g., "w1", "w2"
    };
    mastery: {
        [skillId: string]: {
            status: 'mastered' | 'in-progress' | 'needs-support';
            attempts: number;
            totalTimeSeconds: number;
        };
    };
}

const STORAGE_KEY = 'LUMI_WORLD_DATA_V1';

class SaveSystemClass {
    /**
     * Get default user progress (safe for SSR)
     */
    getDefaultProgress(): UserProgress {
        const weeks: { [key: string]: WeekProgress } = {};

        // Initialize 8 weeks
        for (let i = 1; i <= 8; i++) {
            const weekId = `w${i}`;
            weeks[weekId] = {
                isUnlocked: true, // All weeks unlocked by default as requested
                isCompleted: false,
                stars: 0,
                lastPlayed: '',
            };
        }

        return {
            studentName: 'Student',
            settings: {
                isMuted: false,
                theme: 'default',
                language: 'en-US', // Default language
            },
            weeks,
            mastery: {
                'classification': { status: 'in-progress', attempts: 0, totalTimeSeconds: 0 },
                'anatomy': { status: 'needs-support', attempts: 0, totalTimeSeconds: 0 },
                'number-sense': { status: 'needs-support', attempts: 0, totalTimeSeconds: 0 },
                'measurement': { status: 'needs-support', attempts: 0, totalTimeSeconds: 0 },
                'habitats': { status: 'needs-support', attempts: 0, totalTimeSeconds: 0 },
                'botany': { status: 'needs-support', attempts: 0, totalTimeSeconds: 0 },
                'pollution': { status: 'needs-support', attempts: 0, totalTimeSeconds: 0 },
                'ecosystems': { status: 'needs-support', attempts: 0, totalTimeSeconds: 0 },
            }
        };
    }

    /**
     * Load user progress from LocalStorage
     */
    load(): UserProgress {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) {
                return this.getDefaultProgress();
            }

            const data = JSON.parse(saved) as UserProgress;

            // Validate data structure
            if (!data.weeks || typeof data.weeks !== 'object') {
                console.warn('[SaveSystem] Invalid data structure, resetting...');
                return this.getDefaultProgress();
            }

            // Ensure language field exists (for backwards compatibility)
            if (!data.settings.language) {
                data.settings.language = 'en-US';
            }

            // Migration: Ensure all 8 weeks exist and are unlocked
            const defaultWeeks = this.getDefaultProgress().weeks;
            for (let i = 1; i <= 8; i++) {
                const weekId = `w${i}`;
                if (!data.weeks[weekId]) {
                    data.weeks[weekId] = defaultWeeks[weekId];
                }
                // Force unlock for all weeks as per new requirement
                data.weeks[weekId].isUnlocked = true;
            }

            // Migration: Ensure mastery object exists
            if (!data.mastery) {
                data.mastery = this.getDefaultProgress().mastery;
            }

            return data;
        } catch (error) {
            console.error('[SaveSystem] Load failed:', error);
            return this.getDefaultProgress();
        }
    }

    /**
     * Save user progress to LocalStorage
     */
    save(state: UserProgress): boolean {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            console.log('[SaveSystem] Data saved successfully');
            return true;
        } catch (error) {
            console.error('[SaveSystem] Save failed:', error);
            return false;
        }
    }

    /**
     * Unlock next week after completing current week
     */
    unlockNext(currentWeekId: string): UserProgress {
        const data = this.load();
        const currentNum = parseInt(currentWeekId.replace('w', ''));

        if (currentNum < 8) {
            const nextWeekId = `w${currentNum + 1}`;
            data.weeks[nextWeekId].isUnlocked = true;
            this.save(data);
            console.log(`[SaveSystem] Unlocked ${nextWeekId}`);
        }

        return data;
    }

    /**
     * Update week progress (stars and completion)
     */
    updateWeekProgress(weekId: string, stars: number): UserProgress {
        const data = this.load();

        if (!data.weeks[weekId]) {
            console.error(`[SaveSystem] Invalid week ID: ${weekId}`);
            return data;
        }

        data.weeks[weekId].isCompleted = true;
        data.weeks[weekId].stars = Math.max(data.weeks[weekId].stars, stars);
        data.weeks[weekId].lastPlayed = new Date().toISOString();

        this.save(data);

        // Auto-unlock next week
        this.unlockNext(weekId);

        return data;
    }

    /**
     * Reset all progress (Parental control)
     */
    reset(): UserProgress {
        const defaultData = this.getDefaultProgress();
        this.save(defaultData);
        console.log('[SaveSystem] All progress reset');
        return defaultData;
    }

    /**
     * Update settings
     */
    updateSettings(settings: Partial<UserProgress['settings']>): UserProgress {
        const data = this.load();
        data.settings = { ...data.settings, ...settings };
        this.save(data);
        return data;
    }

    /**
     * Update mastery for a specific skill
     */
    updateMastery(skillId: string, success: boolean, timeSeconds: number): UserProgress {
        const data = this.load();
        if (!data.mastery[skillId]) {
            data.mastery[skillId] = { status: 'in-progress', attempts: 0, totalTimeSeconds: 0 };
        }

        const m = data.mastery[skillId];
        m.attempts += 1;
        m.totalTimeSeconds += timeSeconds;

        if (success && m.attempts >= 1) {
            m.status = 'mastered';
        } else if (m.attempts > 0) {
            if (m.status !== 'mastered') {
                m.status = 'in-progress';
            }
        }

        this.save(data);
        return data;
    }

    /**
     * Update student name
     */
    updateStudentName(name: string): UserProgress {
        const data = this.load();
        data.studentName = name;
        this.save(data);
        return data;
    }
}

// Singleton instance
export const SaveSystem = new SaveSystemClass();
