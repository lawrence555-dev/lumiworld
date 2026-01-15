/**
 * GameLogic - Drag-and-Drop Interaction System
 * Handles collision detection and game mechanics
 */

export interface DraggableItem {
    id: string;
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface DropZone {
    id: string;
    acceptTypes: string[];
    x: number;
    y: number;
    width: number;
    height: number;
    filled: boolean;
}

class GameLogicClass {
    /**
     * Check if two rectangles overlap (collision detection)
     */
    checkCollision(
        item: DraggableItem,
        zone: DropZone
    ): boolean {
        return (
            item.x < zone.x + zone.width &&
            item.x + item.width > zone.x &&
            item.y < zone.y + zone.height &&
            item.y + item.height > zone.y
        );
    }

    /**
     * Check if item type matches drop zone requirements
     */
    isValidDrop(item: DraggableItem, zone: DropZone): boolean {
        return zone.acceptTypes.includes(item.type) && !zone.filled;
    }

    /**
     * Calculate star rating based on performance
     * @param correctAnswers Number of correct answers
     * @param totalQuestions Total number of questions
     * @param timeSpent Time spent in seconds
     * @param maxTime Maximum time allowed in seconds
     */
    calculateStars(
        correctAnswers: number,
        totalQuestions: number,
        timeSpent?: number,
        maxTime?: number
    ): number {
        const accuracy = correctAnswers / totalQuestions;

        // Base stars on accuracy
        if (accuracy >= 0.9) {
            // 90%+ = 3 stars (if within time limit)
            if (timeSpent && maxTime && timeSpent <= maxTime) {
                return 3;
            }
            return 2;
        } else if (accuracy >= 0.7) {
            // 70%+ = 2 stars
            return 2;
        } else if (accuracy >= 0.5) {
            // 50%+ = 1 star
            return 1;
        }

        return 0; // Less than 50% = 0 stars
    }

    /**
     * Shuffle array (for randomizing questions)
     */
    shuffle<T>(array: T[]): T[] {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /**
     * Get touch/mouse position relative to element
     */
    getRelativePosition(
        event: TouchEvent | MouseEvent,
        element: HTMLElement
    ): { x: number; y: number } {
        const rect = element.getBoundingClientRect();

        let clientX: number;
        let clientY: number;

        if ('touches' in event) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        } else {
            clientX = event.clientX;
            clientY = event.clientY;
        }

        return {
            x: clientX - rect.left,
            y: clientY - rect.top,
        };
    }

    /**
     * Check if device supports touch
     */
    isTouchDevice(): boolean {
        return (
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0
        );
    }
}

// Singleton instance
export const GameLogic = new GameLogicClass();
