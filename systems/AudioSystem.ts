/**
 * AudioSystem - Sound and Speech Management (Updated for Multi-Language)
 * Handles Web Speech API (TTS) and sound effects with language support
 */

import { SupportedLanguage } from './SaveSystem';

class AudioSystemClass {
    private soundEnabled: boolean = true;
    private musicEnabled: boolean = true;
    private speechSynthesis: SpeechSynthesisUtterance | null = null;
    private currentUtterance: SpeechSynthesisUtterance | null = null;
    private currentLanguage: SupportedLanguage = 'en-US';

    constructor() {
        if (typeof window !== 'undefined') {
            this.speechSynthesis = window.speechSynthesis as any;
        }
    }

    /**
     * Initialize audio system with saved settings
     */
    init(soundEnabled: boolean, musicEnabled: boolean, language: SupportedLanguage) {
        this.soundEnabled = soundEnabled;
        this.musicEnabled = musicEnabled;
        this.currentLanguage = language;
    }

    /**
     * Set current language for TTS
     */
    setLanguage(language: SupportedLanguage) {
        this.currentLanguage = language;
    }

    /**
     * Speak text using Web Speech API
     * @param text - Text to speak
     * @param isInstruction - If true, use selected language. If false, always use English (for teaching)
     */
    speak(text: string, isInstruction: boolean = false): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.soundEnabled || !window.speechSynthesis) {
                resolve();
                return;
            }

            // Cancel any ongoing speech
            this.stop();

            const utterance = new SpeechSynthesisUtterance(text);

            // Teaching content (item names) always in English
            // Instructions use selected language
            utterance.lang = isInstruction ? this.currentLanguage : 'en-US';
            utterance.rate = 0.9; // Slightly slower for children
            utterance.pitch = 1.1; // Slightly higher pitch for friendliness

            utterance.onend = () => {
                this.currentUtterance = null;
                resolve();
            };

            utterance.onerror = (error) => {
                console.error('[AudioSystem] Speech error:', error);
                this.currentUtterance = null;
                reject(error);
            };

            this.currentUtterance = utterance;
            window.speechSynthesis.speak(utterance);
        });
    }

    /**
     * Stop current speech
     */
    stop() {
        if (window.speechSynthesis && this.currentUtterance) {
            window.speechSynthesis.cancel();
            this.currentUtterance = null;
        }
    }

    /**
     * Play sound effect
     */
    playSound(soundName: string) {
        if (!this.soundEnabled) return;

        const audio = new Audio(`/audio/${soundName}.mp3`);
        audio.volume = 0.5;
        audio.play().catch((error) => {
            console.warn('[AudioSystem] Sound play failed:', error);
        });
    }

    /**
     * Play success sound with speech
     */
    async playSuccess(message: string = 'Great job!', isInstruction: boolean = true) {
        this.playSound('success');
        await this.speak(message, isInstruction);
    }

    /**
     * Play error sound with speech
     */
    async playError(message: string = 'Try again!', isInstruction: boolean = true) {
        this.playSound('error');
        await this.speak(message, isInstruction);
    }

    /**
     * Toggle sound on/off
     */
    toggleSound(): boolean {
        this.soundEnabled = !this.soundEnabled;
        if (!this.soundEnabled) {
            this.stop();
        }
        return this.soundEnabled;
    }

    /**
     * Toggle music on/off
     */
    toggleMusic(): boolean {
        this.musicEnabled = !this.musicEnabled;
        return this.musicEnabled;
    }

    /**
     * Get current settings
     */
    getSettings() {
        return {
            soundEnabled: this.soundEnabled,
            musicEnabled: this.musicEnabled,
            language: this.currentLanguage,
        };
    }
}

// Singleton instance
export const AudioSystem = new AudioSystemClass();
