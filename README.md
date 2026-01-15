# 🌟 LumiWorld - Pre-K Educational PWA

> **Version:** 1.0.0  
> **Type:** Pre-K Educational Progressive Web App  
> **Stack:** Next.js, Tailwind CSS, LocalStorage (No Backend)

---

## 📑 Table of Contents

- [Project Overview](#-project-overview)
- [System Architecture](#-system-architecture)
  - [Tech Stack](#tech-stack)
  - [Data Schema](#data-schema)
  - [Core Modules](#core-modules)
- [Level Design](#-level-design)
  - [Week 1: Living vs. Non-Living](#week-1-living-vs-non-living)
  - [Week 3: Hungry Guppies](#week-3-hungry-guppies)
  - [Week 7: Ocean Rescue](#week-7-ocean-rescue)
- [Development Roadmap](#-development-roadmap)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [License](#-license)

---

## 🎯 Project Overview

LumiWorld is an interactive educational PWA designed for 4rd-year-old children, focusing on STEAM education through engaging drag-and-drop games and interactive activities. It is fully aligned with **US Pre-K STEAM & Early Literacy** standards (CCSS & NGSS).

**Key Features:**
- ✅ **8-Week Curriculum:** Interactive dashboard for all 12 weeks.
- ✅ **Smart Interaction:** Area-based collision detection for forgiving drag-and-drop.
- ✅ **Grid Language Selector:** Stable, touch-friendly UI for 5 languages.
- ✅ **Next.js 15 Prepared:** Async `params` handling with `React.use()`.
- ✅ **Audio Support:** Web Speech API (TTS) for multi-language learning.
- ✅ **Local-First:** No backend, 100% private and offline-capable.
- ✅ **Professional Proposals:** Dedicated [Chinese](file:///Users/lawrence/.gemini/lumiworld-persistent-system/PROPOSAL_ZH.md) and [English](file:///Users/lawrence/.gemini/lumiworld-persistent-system/PROPOSAL_EN.md) curriculum proposals included.

---

## 🏗 System Architecture

### Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Framework** | Next.js 15 (App Router) | Structure & routing |
| **Styling** | Vanilla CSS + Tailwind | Premium glassmorphism design |
| **Logic** | React 18 / Next 15 | Asynchronous state & component lifecycle |
| **Audio** | Web Speech API | Multi-language TTS engine |

### Data Schema

The application stores a single JSON object under the key `LUMI_WORLD_DATA_V1`.

```typescript
interface UserProgress {
  studentName: string;
  settings: {
    isMuted: boolean;
    theme: 'default' | 'high-contrast';
  };
  weeks: {
    [weekId: string]: { // e.g., "w1", "w2"
      isUnlocked: boolean;
      isCompleted: boolean;
      stars: number; // 0-3
      lastPlayed: string; // ISO Date string
    };
  };
}
```

### Core Modules

#### A. SaveSystem (`/systems/SaveSystem.ts`)

**Responsibility:** Handle read/write operations to LocalStorage safely.

**Methods:**
- `load()`: Returns UserProgress or default state
- `save(state)`: Serializes state to JSON string
- `unlockNext(currentWeekId)`: Logic to set isUnlocked = true for next week
- `reset()`: Clears data (Parental control)

#### B. AudioSystem (`/systems/AudioSystem.ts`)

**Responsibility:** Centralize all sound outputs.

**Methods:**
- `speak(text: string)`: Triggers TTS for English learning (e.g., "Cat", "Feed the fish")
- `playSFX(type: 'success' | 'error' | 'pop')`: Plays feedback sounds

#### C. GameEngine (`/components/game/Engine.tsx`)

**Responsibility:** Wrapper component for Drag-and-Drop logic and Collision Detection.

**Features:**
- Touch Events (iPad) + Mouse Events support
- **Snap-to-Zone:** If item dropped near valid target, snap into place
- **Rebound:** If dropped in invalid zone, animate back to start

---

## 🎮 Level Design

### Week 1: Living vs. Non-Living (Sorting)

**Goal:** Categorize objects into two bins.

**UI Layout:**
- **Left Bin:** Green, labeled "Living" (Icon: Heart ❤️)
- **Right Bin:** Gray, labeled "Non-Living" (Icon: Rock 🪨)
- **Center:** Spawn area for draggable items

**Mechanics:**
1. Item appears (e.g., "Cat")
2. Text label + Audio plays: "Cat"
3. User drags item to a bin

**Logic:**
- ✅ **Correct:** Item disappears into bin, positive SFX, confetti
- ❌ **Incorrect:** Item shakes, plays "Boing" sound, voice says "Try again"

**Assets:**
- **Living:** Cat 🐱, Flower 🌻, Tree 🌳, Butterfly 🦋
- **Non-Living:** Rock 🪨, Car 🚗, Robot 🤖, Hat 🎩

---

### Week 3: Hungry Guppies (Counting & Needs)

**Goal:** Feed the fish the exact number of food pellets requested.

**UI Layout:**
- **Center:** Fish tank with 3-5 moving fish
- **Bottom:** Food dispenser (infinite draggable pellets)

**Mechanics:**
1. Instruction: Text & Audio says "Feed 3 pellets"
2. Fish have a counter (visual bubbles or simple logic)
3. User drags food to any fish

**Logic:**
- On drop: Counter increments. Voice counts "One!", "Two!", "Three!"
- **Win Condition:** When count equals target (3), fish turns happy and swims away

**Assets:**
- Fish Animation (Idle / Eat / Happy)
- Food Pellet Icon 🟤

---

### Week 7: Ocean Rescue (Reaction & Logic)

**Goal:** Clean the ocean by tapping trash, but avoid tapping animals.

**UI Layout:**
- **Background:** Underwater scene
- **Objects:** Floating items moving left to right

**Mechanics:**
1. Items float across the screen
2. User Action: Tap on items

**Logic:**
- ✅ **Tap Trash:** Item vanishes, "Clean!" sound, progress bar fills
- ❌ **Tap Dolphin:** Dolphin turns sad 😢, "Oh no!" sound, progress bar decreases
- **Win Condition:** Clear 5 pieces of trash

**Assets:**
- **Trash:** Bottle 🧴, Bag 🛍️, Can 🥫
- **Animals:** Dolphin 🐬, Turtle 🐢

---

## 📅 Development Roadmap

### Phase 1: Foundation (Days 1-2) ✅ IN PROGRESS

- [x] Initialize Next.js project
- [x] Configure Tailwind CSS for landscape mode
- [ ] Implement SaveSystem and UserProgress context
- [ ] Create Dashboard (Menu) UI with locked/unlocked states

### Phase 2: Core Gameplay (Days 3-5)

- [ ] Build Draggable and DropZone components
- [ ] Implement Week 1 (Sorting) logic
- [ ] Connect Week 1 completion to SaveSystem (Unlock Week 2)
- [ ] Test on iPad / Mobile browser

### Phase 3: Content Expansion (Days 6-10)

- [ ] Implement Week 3 (Counting) logic
- [ ] Implement Week 7 (Reaction) logic
- [ ] Add AudioSystem (TTS integration)
- [ ] Add "Parent Gate" reset button

### Phase 4: Polish (Days 11-14)

- [ ] Add "Victory Modal" with star animations
- [ ] Create manifest.json for PWA installation
- [ ] Final testing for accessibility and edge cases

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to project
cd /Users/lawrence/.gemini/lumiworld-persistent-system

# Install dependencies
npm install

# Install additional packages
npm install framer-motion lucide-react canvas-confetti

# Run development server
npm run dev

# Open browser
# http://localhost:3000
```

### Build for Production

```bash
# Build static site
npm run build

# Start production server
npm start

# Export static files (for deployment)
npm run export
```

---

## 📁 Project Structure

```
lumiworld-persistent-system/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Dashboard (Week Selection)
│   ├── week/[id]/           # Individual Week Pages
│   │   └── page.tsx
│   ├── settings/            # Settings Page
│   │   └── page.tsx
│   └── layout.tsx           # Root Layout
├── components/
│   ├── game/                # Game Components
│   │   ├── Engine.tsx       # Drag-and-Drop Engine
│   │   ├── Draggable.tsx    # Draggable Item Component
│   │   ├── DropZone.tsx     # Drop Target Component
│   │   └── GameCanvas.tsx   # Game Container
│   └── ui/                  # UI Components
│       ├── WeekCard.tsx     # Week Selection Card
│       ├── StarDisplay.tsx  # Star Rating Display
│       ├── ProgressBar.tsx  # Progress Indicator
│       └── VictoryModal.tsx # Completion Modal
├── systems/                 # Core Logic (⭐ CRITICAL)
│   ├── SaveSystem.ts        # LocalStorage Management
│   ├── AudioSystem.ts       # Web Speech API + Sound
│   └── GameLogic.ts         # Collision Detection
├── hooks/                   # Custom React Hooks
│   ├── useProgress.ts       # UserProgress Context
│   └── useDragAndDrop.ts    # Drag-and-Drop Hook
├── data/                    # Static Data
│   └── Curriculum.json      # 8-Week Course Data
├── public/
│   ├── audio/               # Sound Effects
│   ├── images/              # Game Assets
│   └── manifest.json        # PWA Configuration
└── README.md
```

---

## 🎨 Design Principles

1. **Child-Friendly UI**
   - Large touch targets (min 60px)
   - High contrast colors
   - Simple, clear icons

2. **Responsive Design**
   - Optimized for iPad (1024x768 landscape)
   - Works on desktop and mobile
   - `w-screen h-screen overflow-hidden`

3. **Accessibility**
   - Voice feedback for all actions
   - Clear visual feedback
   - No time pressure

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
