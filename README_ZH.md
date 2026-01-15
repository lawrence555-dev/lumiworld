# 🌟 LumiWorld - 幼兒 STEAM 教育 PWA

> **版本:** 1.0.0  
> **類型:** 幼兒教育漸進式 Web 應用程式 (PWA)  
> **技術棧:** Next.js, Tailwind CSS, LocalStorage (無後端)

---

## 📑 目錄

- [專案概述](#-專案概述)
- [系統架構](#-系統架構)
  - [技術棧](#技術棧)
  - [資料架構](#資料架構)
  - [核心模組](#核心模組)
- [關卡設計](#-關卡設計)
  - [第一週：生物 vs 非生物](#第一週生物-vs-非生物)
  - [第三週：飢餓的小魚](#第三週飢餓的小魚)
  - [第七週：海洋救援](#第七週海洋救援)
- [開發路線圖](#-開發路線圖)
- [快速入門](#-快速入門)
- [專案結構](#-專案結構)
- [許可證](#-許可證)

---

## 🎯 專案概述

LumiWorld 是一款專為 4 歲兒童設計的互動式教育 PWA，透過引人入勝的拖放遊戲和互動活動，專注於 STEAM 教育。本專案完全對齊 **美國 Pre-K STEAM 與早期素養 (Early Literacy)** 標準（CCSS 與 NGSS）。

**核心特性：**
- ✅ **8 週完整課程**：包含所有 8 週的互動式儀表板。
- ✅ **學習進度報告**：整合「掌握程度」追蹤與「投入時間」統計的形成性評量儀表板。
- ✅ **智慧交互系統**：採用區域碰撞檢測（Area-based collision），提供更寬容的拖放體驗。
- ✅ **穩定語言選擇器**：全新網格化 UI，支援 5 種語言，完美適配平板觸控。
- ✅ **預備 Next.js 15**：已修復非同步 `params` 處理，使用 `React.use()` 確保兼容性。
- ✅ **多語系語音支持**：整合 Web Speech API (TTS)，輔助跨學科語言學習。
- ✅ **隱私第一**：純前端架構，100% 數據存於在地端，支援離線運行。
- ✅ **專業提案文件**：內附專業的[中文提案](file:///Users/lawrence/.gemini/lumiworld-persistent-system/PROPOSAL_ZH.md)與[英文提案](file:///Users/lawrence/.gemini/lumiworld-persistent-system/PROPOSAL_EN.md)。

---

## 🏗 系統架構

### 技術棧 (Tech Stack)

| 組件 | 技術 | 用途 |
|-----------|-----------|---------|
| **框架** | Next.js 15 (App Router) | 結構與路由控制 |
| **樣式** | Vanilla CSS + Tailwind | 高級玻璃擬態 (Glassmorphism) 設計 |
| **邏輯** | React 18 / Next 15 | 非同步狀態與組件生命週期管理 |
| **音訊** | Web Speech API | 多國語言 TTS 引擎 |

### 資料架構

應用程式將單個 JSON 物件存儲在 `LUMI_WORLD_DATA_V1` 鍵下。

```typescript
interface UserProgress {
  studentName: string;
  settings: {
    isMuted: boolean;
    theme: 'default' | 'high-contrast';
    language: string;
  };
  weeks: {
    [weekId: string]: { // 例如 "w1", "w2"
      isUnlocked: boolean;
      isCompleted: boolean;
      stars: number; // 0-3
      lastPlayed: string; // ISO 日期字串
    };
  };
}
```

### 核心模組

#### A. 存檔系統 SaveSystem (`/systems/SaveSystem.ts`)

**職責：** 安全地處理 LocalStorage 的讀寫操作。

**方法：**
- `load()`: 返回使用者進度或預設狀態
- `save(state)`: 將狀態序列化為 JSON 字串
- `unlockNext(currentWeekId)`: 解鎖下一週的邏輯
- `reset()`: 清除資料（家長控制）

#### B. 音訊系統 AudioSystem (`/systems/AudioSystem.ts`)

**職責：** 集中處理所有聲音輸出。

**方法：**
- `speak(text: string)`: 觸發語音合成（例如：「貓」、「餵魚」）
- `playSFX(type: 'success' | 'error' | 'pop')`: 播放回饋音效

#### C. 遊戲引擎 GameEngine (`/components/game/Engine.tsx`)

**職責：** 拖放邏輯與碰撞檢測的封裝組件。

**功能：**
- 支援觸控事件 (iPad) 與滑鼠事件
- **自動吸附：** 若物品掉落在有效目標附近，自動吸附到位
- **彈回機制：** 若掉落在無效區域，則動畫彈回起點

---

## 🎮 關卡設計

### 第一週：生物 vs 非生物 (分類遊戲)

**目標：** 將物體分類到兩個桶子中。

**UI 佈局：**
- **左側桶子：** 綠色，標記為「生物」（圖示：愛心 ❤️）
- **右側桶子：** 灰色，標記為「非生物」（圖示：石頭 🪨）
- **中央：** 拖放物品的生成區域

**機制：**
1. 物品出現（例如：「貓」）
2. 文字標籤 + 語音播放：「Cat」
3. 使用者將物品拖向桶子

**邏輯：**
- ✅ **正確：** 物品進入桶子，播放正面音效與紙屑特效
- ❌ **錯誤：** 物品抖動，播放彈跳音效，語音提示「再試一次」

---

## 📅 開發路線圖

### 第一階段：基礎建設 ✅ 已完成
- [x] 初始化 Next.js 專案
- [x] 配置橫向模式的 Tailwind CSS
- [x] 實作 SaveSystem 與進度 Context
- [x] 建立具有解鎖/鎖定狀態的儀表板

### 第二階段：核心玩法 ✅ 已完成
- [x] 建立拖放組件
- [x] 實作第一週（分類）邏輯
- [x] 測試 iPad 與行動瀏覽器相容性

### 第三階段：商業級 UI 優化 ✅ 已完成
- [x] 導入玻璃擬態 (Glassmorphism) 設計
- [x] 加入動態背景動畫
- [x] 支援多國語言 (i18n) 與 TTS

---

## 🚀 快速入門

### 安裝步奏

```bash
# 進入專案目錄
cd lumiworld-persistent-system

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

---

## 📁 專案結構

```
lumiworld-persistent-system/
├── app/                      # Next.js App Router
├── components/
│   ├── game/                # 遊戲核心邏輯
│   └── ui/                  # UI 組件（玻璃擬態）
├── systems/                 # 核心系統（⭐ 存檔、音訊、邏輯）
├── hooks/                   # 自定義 React Hooks
├── locales/                 # 多國語言翻譯檔
└── public/                  # 靜態資源
```

---

## 🔒 隱私與安全

- ✅ **無資料收集：** 所有資料僅保留在裝置本地
- ✅ **無後端：** 無需伺服器，無需數據庫
- ✅ **無追蹤：** 無分析腳本，無 Cookies
- ✅ **符合規範：** 對兒童絕對安全

---

## 📝 許可證

MIT License - 可自由用於教育目的

---

**Made with ❤️ for curious 4-year-olds**
