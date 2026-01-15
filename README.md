# 🌟 LumiWorld - Pre-K Educational PWA

> **Version:** 2.1.0  
> **Type:** Pre-K Educational Progressive Web App  
> **Stack:** Next.js 15, Tailwind CSS, LocalStorage (No Backend)

---

## 📑 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [8-Week Curriculum](#-8-week-curriculum)
- [Multi-Language Support](#-multi-language-support)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [License](#-license)

---

## 🎯 Project Overview

LumiWorld is an interactive educational PWA designed for 4-year-old children, focusing on STEAM education through engaging drag-and-drop games and interactive activities. It is fully aligned with **US Pre-K STEAM & Early Literacy** standards (CCSS & NGSS).

**Live Demo:** [https://lumiworld.onrender.com](https://lumiworld.onrender.com)

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| **8-Week Curriculum** | Complete 8-level STEAM curriculum with 30 items per level (240 total) |
| **Multi-Language** | 5 languages: English, 繁體中文, 日本語, 한국어, ภาษาไทย |
| **Multi-Language TTS** | Voice reads items in selected language (Web Speech API) |
| **Learning Report** | Detailed mastery tracking (time spent, attempts, status) per skill |
| **iPad Optimized** | Responsive layout for all tablet resolutions + iOS audio unlock |
| **Drag-and-Drop** | Smooth drag-and-drop with 30px minimum distance check |
| **Progress Tracking** | Star rating system (1-3 stars) with LocalStorage persistence |
| **Offline-First** | No backend required, works without internet |
| **COPPA Compliant** | No data collection, no tracking, child-safe |

---

## 🏗 System Architecture

### Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Framework** | Next.js 15 (App Router) | Structure & routing |
| **Styling** | Tailwind CSS | Glassmorphism design |
| **Logic** | React 18 | State & component lifecycle |
| **Audio** | Web Speech API | Multi-language TTS engine |
| **Animation** | Framer Motion | Smooth transitions |
| **Effects** | canvas-confetti | Celebration animations |

### Data Schema

```typescript
interface UserProgress {
  studentName: string;
  settings: {
    isMuted: boolean;
    theme: 'default' | 'high-contrast';
    language: 'en-US' | 'zh-TW' | 'ja-JP' | 'ko-KR' | 'th-TH';
  };
  weeks: {
    [weekId: string]: {
      isUnlocked: boolean;
      isCompleted: boolean;
      stars: number;
    };
  };
  mastery: {
    [skillId: string]: {
      status: 'none' | 'in-progress' | 'mastered';
      attempts: number;
      totalTimeSeconds: number;
    };
  };
}
```

### Core Modules

| Module | File | Purpose |
|--------|------|---------|
| **SaveSystem** | `/systems/SaveSystem.ts` | LocalStorage persistence + Mastery tracking |
| **AudioSystem** | `/systems/AudioSystem.ts` | Multi-language TTS + iOS unlock |
| **GameLogic** | `/systems/GameLogic.ts` | Collision detection, scoring |
| **GameContent** | `/data/GameContent.ts` | 240 curriculum items (30 per level) |

---

## 📚 8-Week Curriculum

Each level contains **30 practice items** with drag-and-drop classification:

| Level | Theme | Categories | Standard |
|:-----:|-------|------------|----------|
| **1** | Scientific Classification | Living vs Non-Living | NGSS K-LS1-1 |
| **2** | Introduction to Anatomy | Sea Parts vs Land Parts | CCSS.ELA-LITERACY.RF.K.3.A |
| **3** | Number Sense & Needs | Small Group vs Big Group | CCSS.MATH.CONTENT.K.CC.B.4 |
| **4** | Comparative Measurement | Huge vs Tiny | CCSS.MATH.CONTENT.K.MD.A.2 |
| **5** | Habitat Exploration | Sky vs Earth | NGSS Spatial Logic |
| **6** | Botany Basics | Plant Needs vs Not Needed | NGSS Life Cycles |
| **7** | Environmental Science | Clean Ocean vs Trash | NGSS K-ESS3-3 + CASEL SEL |
| **8** | Ecosystem Management | Forest vs Ocean | STEAM Integration |

📖 **For Teachers:** See [docs/TEACHER_GUIDE_ZH.md](docs/TEACHER_GUIDE_ZH.md) for detailed curriculum guide.

---

## 🌐 Multi-Language Support

### Supported Languages

| Language | Code | Voice | UI |
|----------|------|-------|-----|
| 🇺🇸 English | en-US | ✅ | ✅ |
| 🇹🇼 繁體中文 | zh-TW | ✅ | ✅ |
| 🇯🇵 日本語 | ja-JP | ✅ | ✅ |
| 🇰🇷 한국어 | ko-KR | ✅ | ✅ |
| 🇹🇭 ภาษาไทย | th-TH | ✅ | ✅ |

### How It Works
- **Display:** Item names always shown in English
- **Voice:** Items spoken in the selected language
- **iOS Support:** Automatic audio unlock on first touch

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or navigate to project
cd lumiworld-persistent-system

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# http://localhost:3000
```

### Deploy to Render

1. Connect GitHub repository
2. **Build Command:** `npm run build`
3. **Start Command:** `npm run start`

---

## 📁 Project Structure

```
lumiworld-persistent-system/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Dashboard (Level Selection)
│   ├── week/[id]/           # Game Levels
│   └── settings/            # Settings Page
├── components/
│   ├── game/                # Draggable, DropZone
│   └── ui/                  # Header, WeekCard
├── systems/                 # Core Logic
│   ├── SaveSystem.ts        # LocalStorage
│   ├── AudioSystem.ts       # TTS + iOS Unlock
│   └── GameLogic.ts         # Collision Detection
├── data/
│   ├── Curriculum.json      # Level configurations
│   └── GameContent.ts       # 240 curriculum items
├── hooks/                   # useProgress, useLanguage
├── locales/                 # en.ts, zh.ts, ja.ts, ko.ts, th.ts
└── docs/
    └── TEACHER_GUIDE_ZH.md  # Teacher curriculum guide
```

---

## 🔒 Privacy & Security

- ✅ **No Data Collection:** All data stays on device
- ✅ **No Backend:** No server, no database
- ✅ **No Tracking:** No analytics, no cookies
- ✅ **COPPA Compliant:** Safe for children under 13

---

## 📝 License

MIT License - Free for educational use

---

**Made with ❤️ for curious 4-year-olds**
