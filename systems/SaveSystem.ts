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
                isUnlocked: i === 1, // Only Week 1 unlocked by default
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
