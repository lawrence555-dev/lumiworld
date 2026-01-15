export const en = {
    // UI Common
    ui: {
        start_game: 'Start Game',
        settings: 'Settings',
        reset_data: 'Reset Data',
        back_home: 'Back Home',
        studentName: 'Student Name',
        theme: 'Theme',
        language: 'Language',
        default: 'Default',
        high_contrast: 'High Contrast',
        export_progress: 'Export Progress',
        reset_all: 'Reset All Progress',
        cancel: 'Cancel',
        reset: 'Reset',
        madeWith: 'Made with',
        forFourYearOlds: 'for curious 4-year-olds',
    },

    // Dashboard
    dashboard: {
        title: 'LumiWorld',
        greeting: 'Hello',
    },

    // Weeks
    weeks: {
        w1: { title: 'Living vs Non-Living' },
        w2: { title: 'Numbers 1-5' },
        w3: { title: 'Hungry Guppies' },
        w4: { title: 'Big & Small' },
        w5: { title: 'Patterns' },
        w6: { title: 'Opposites' },
        w7: { title: 'Ocean Rescue' },
        w8: { title: 'Story Time' },
    },

    // Week 1
    week1: {
        title: 'Living vs Non-Living',
        instruction: 'Drag the item to the correct bin!',
        living: 'Living',
        non_living: 'Non-Living',
        items: {
            cat: 'Cat',
            flower: 'Flower',
            tree: 'Tree',
            butterfly: 'Butterfly',
            rock: 'Rock',
            car: 'Car',
            robot: 'Robot',
            hat: 'Hat',
        },
    },

    // Feedback
    feedback: {
        great_job: 'Great job!',
        try_again: 'Try again!',
        amazing: 'Amazing! You completed Week',
        you_did_it: 'You Did It!',
        correct: 'Correct',
    },

    // Settings
    settings: {
        title: 'Settings',
        student_name_label: 'Student Name',
        student_name_placeholder: 'Enter name...',
        theme_label: 'Theme',
        language_label: 'Language',
        data_management: 'Data Management',
        reset_confirm_title: 'Reset All Progress?',
        reset_confirm_message: 'This will delete all stars and progress. This cannot be undone.',
    },

    // Languages
    languages: {
        'en-US': 'English',
        'zh-TW': '繁體中文',
        'ja-JP': '日本語',
        'ko-KR': '한국어',
        'th-TH': 'ไทย',
    },
};

export type TranslationKeys = typeof en;
