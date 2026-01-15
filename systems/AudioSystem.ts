/**
 * AudioSystem - Sound and Speech Management (Updated for Multi-Language)
 * Handles Web Speech API (TTS) and sound effects with language support
 * Includes iOS Safari audio unlock mechanism
 */

import { SupportedLanguage } from './SaveSystem';

class AudioSystemClass {
    private soundEnabled: boolean = true;
    private musicEnabled: boolean = true;
    private speechSynthesis: SpeechSynthesisUtterance | null = null;
    private currentUtterance: SpeechSynthesisUtterance | null = null;
    private currentLanguage: SupportedLanguage = 'en-US';
    private isAudioUnlocked: boolean = false;

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

        // Set up auto-unlock on first user interaction (required for iOS)
        if (typeof window !== 'undefined' && !this.isAudioUnlocked) {
            const unlockHandler = () => {
                this.unlockAudio();
                window.removeEventListener('touchstart', unlockHandler);
                window.removeEventListener('click', unlockHandler);
            };
            window.addEventListener('touchstart', unlockHandler, { once: true });
            window.addEventListener('click', unlockHandler, { once: true });
        }
    }

    /**
     * Unlock audio for iOS Safari (must be called from user gesture)
     */
    unlockAudio() {
        if (this.isAudioUnlocked) return;

        if (typeof window !== 'undefined' && window.speechSynthesis) {
            // Speak empty string to unlock iOS audio
            const utterance = new SpeechSynthesisUtterance('');
            utterance.volume = 0;
            window.speechSynthesis.speak(utterance);
            this.isAudioUnlocked = true;
            console.log('[AudioSystem] Audio unlocked for iOS');
        }
    }

    /**
     * Set current language for TTS
     */
    setLanguage(language: SupportedLanguage) {
        this.currentLanguage = language;
    }

    /**
     * Speak text using Web Speech API
     * Uses selected language for pronunciation with natural voice
     */
    speak(text: string): Promise<void> {
        return new Promise((resolve) => {
            if (!this.soundEnabled) {
                console.log('[AudioSystem] Sound disabled, skipping speech');
                resolve();
                return;
            }

            if (typeof window === 'undefined' || !window.speechSynthesis) {
                console.log('[AudioSystem] SpeechSynthesis not available');
                resolve();
                return;
            }

            // Cancel any ongoing speech
            this.stop();

            const utterance = new SpeechSynthesisUtterance(text);

            // Use the selected language for pronunciation
            utterance.lang = this.currentLanguage;

            // More natural speech settings
            utterance.rate = 0.85; // Slower for children
            utterance.pitch = 1.0; // Natural pitch
            utterance.volume = 1.0; // Full volume

            // Try to get a high-quality voice for this language
            const voices = window.speechSynthesis.getVoices();
            const langPrefix = this.currentLanguage.split('-')[0]; // e.g., 'en', 'zh', 'ja'

            // Prefer voices that match the language
            const matchingVoice = voices.find(v =>
                v.lang.startsWith(langPrefix) && !v.localService
            ) || voices.find(v =>
                v.lang.startsWith(langPrefix)
            );

            if (matchingVoice) {
                utterance.voice = matchingVoice;
                console.log(`[AudioSystem] Using voice: ${matchingVoice.name} for ${this.currentLanguage}`);
            }

            console.log(`[AudioSystem] Speaking "${text}" in ${this.currentLanguage}`);

            utterance.onend = () => {
                this.currentUtterance = null;
                resolve();
            };

            utterance.onerror = (event) => {
                if (event.error !== 'canceled') {
                    console.error('[AudioSystem] Speech error:', event.error);
                }
                this.currentUtterance = null;
                resolve();
            };

            this.currentUtterance = utterance;

            try {
                window.speechSynthesis.speak(utterance);
            } catch (e) {
                console.error('[AudioSystem] Speak failed:', e);
                this.currentUtterance = null;
                resolve();
            }
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
    async playSuccess(message: string = 'Great job!') {
        this.playSound('success');
        await this.speak(message);
    }

    /**
     * Play error sound with speech
     */
    async playError(message: string = 'Try again!') {
        this.playSound('error');
        await this.speak(message);
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
