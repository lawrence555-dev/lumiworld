# 🌟 LumiWorld - Pre-K Educational PWA

> **Version:** 2.4.0  
> **Type:** Pre-K Educational Progressive Web App  
> **Stack:** Next.js 15, Tailwind CSS, LocalStorage (No Backend), AI Illustration Engine

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
| **AI Illustrations** | 240+ custom illustrations for all items + 16 selection scenes |
| **Multi-Language** | 5 languages: English, 繁體中文, 日本語, 한국어, ภาษาไทย |
| **Multi-Language TTS** | Natural voice engine for items in all 5 languages (localized fixes) |
| **Teacher/Parent Guides**| Detailed guides available in all 5 supported languages |
| **Learning Report** | Comprehensive dashboard (time, progress, skill mastery) |
| **iPad Optimized** | Single-screen layout for iPad Air/Pro (PWA mode), 0-scrolling |
| **Drag-and-Drop** | Multi-sensory feedback with intelligent collision detection |
| **Progress Tracking** | Star-based persistence (1-3 stars) via LocalStorage |
| **Privacy First** | No backend, no cookies, COPPA compliant |

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
| **2** | Introduction to Anatomy | Fish Parts vs Other Parts | NGSS / Anatomy |
| **3** | Number Sense & Needs | Small Group vs Big Group | CCSS.MATH.CONTENT.K.CC.B.4 |
| **4** | Comparative Measurement | Huge vs Tiny | CCSS.MATH.CONTENT.K.MD.A.2 |
| **5** | Habitat Exploration | Sky vs Earth | NGSS Spatial Logic |
| **6** | Botany Basics | Plant Needs vs Not Needed | NGSS Life Cycles |
| **7** | Environmental Science | Clean Ocean vs Trash | NGSS K-ESS3-3 + CASEL SEL |
| **8** | Ecosystem Management | Forest vs Ocean | STEAM Integration |

📖 **Detailed Guides:**  
- 🇺🇸 [Teacher & Parent Guide (EN)](docs/TEACHER_GUIDE_EN.md)  
- 🇹🇼 [老師與家長教學指南 (ZH)](docs/TEACHER_GUIDE_ZH.md)  
- 🇯🇵 [指導ガイド (JA)](docs/TEACHER_GUIDE_JA.md)  
- 🇰🇷 [교사 및 학부모 지침서 (KO)](docs/TEACHER_GUIDE_KO.md)  
- 🇹🇭 [คู่มือแนะนำสำหรับครูและผู้ปกครอง (TH)](docs/TEACHER_GUIDE_TH.md)

---

## 🌐 Multi-Language Support

| Language | Code | Voice | UI |
|----------|------|-------|-----|
| 🇺🇸 English | en-US | ✅ | ✅ |
| 🇹🇼 繁體中文 | zh-TW | ✅ | ✅ |
| 🇯🇵 日本語 | ja-JP | ✅ | ✅ |
| 🇰🇷 한국어 | ko-KR | ✅ | ✅ |
| 🇹🇭 ภาษาไทย | th-TH | ✅ | ✅ |

---

## 📁 Project Structure

```
lumiworld-persistent-system/
├── app/                      # Next.js App Router
├── components/               # UI & Game Components
├── systems/                 # Core Logic (Save, Audio, Game)
├── data/                    # GameContent.ts (240 items)
├── hooks/                   # useProgress, useLanguage
├── locales/                 # i18n translation files
└── docs/                    # Multi-language Teacher & Parent Guides
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
