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
        level: 'Level',
        begin_journey: 'Begin Journey',
        coming_soon: 'Coming Soon',
        curriculum_path: 'Curriculum Path',
        master_steam: 'Complete each level to master STEAM',
    },

    // Dashboard
    dashboard: {
        title: 'LumiWorld',
        greeting: 'Hello',
    },

    // Weeks
    weeks: {
        w1: { title: 'Scientific Classification' },
        w2: { title: 'Introduction to Anatomy' },
        w3: { title: 'Number Sense & Needs' },
        w4: { title: 'Comparative Measurement' },
        w5: { title: 'Habitat Exploration' },
        w6: { title: 'Botany Basics' },
        w7: { title: 'Environmental Science' },
        w8: { title: 'Capstone Project' },
    },

    // Week 1
    week1: {
        title: 'Living vs Non-Living',
        instruction: 'Drag the item to the correct bin!',
        living: 'Living',
        non_living: 'Non-Living',
    },

    // All Zones (Normalized for lookup)
    zones: {
        living: 'Living',
        'non-living': 'Non-Living',
        'fish-parts': 'Fish Parts',
        'other-parts': 'Other Parts',
        'n-low': 'Group 1-10',
        'n-high': 'Group 11-20',
        huge: 'Huge (Heavy)',
        tiny: 'Tiny (Light)',
        sky: 'Sky',
        earth: 'Earth',
        need: 'Growth Needs',
        not_need: 'Not Needed',
        clean: 'Clean Ocean',
        trash: 'Trash',
        forest: 'Forest',
        ocean: 'Ocean',
    },

    // Feedback
    feedback: {
        great_job: 'Great job!',
        try_again: 'Try again!',
        amazing: 'Amazing! You mastered',
        you_did_it: 'You Did It!',
        correct: 'Correct',
        hint: 'Drag the item to the correct category',
        mastery_achieved: 'Mastery Achieved!',
    },

    // Settings
    settings: {
        title: 'Settings',
        student_name_label: 'Student Name',
        student_name_placeholder: 'Enter name...',
        theme_label: 'Theme',
        language_label: 'Language',
        data_management: 'Data Management',
        learning_report: 'Learning Report',
        mastery_level: 'Mastery Level',
        time_spent: 'Time Spent',
        status_mastered: 'Mastered',
        status_in_progress: 'In Progress',
        status_needs_support: 'Needs Support',
        seconds_abbr: 's',
        minutes_abbr: 'm',
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
