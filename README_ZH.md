# 🌟 LumiWorld - 幼兒 STEAM 教育 PWA

> **版本:** 2.0.0  
> **類型:** 幼兒教育漸進式 Web 應用程式 (PWA)  
> **技術棧:** Next.js 15, Tailwind CSS, LocalStorage (無後端)

---

## 📑 目錄

- [專案概述](#-專案概述)
- [核心功能](#-核心功能)
- [8 週課程總覽](#-8-週課程總覽)
- [多語言支援](#-多語言支援)
- [快速開始](#-快速開始)
- [專案結構](#-專案結構)
- [隱私與安全](#-隱私與安全)

---

## 🎯 專案概述

LumiWorld 是一款專為 4 歲兒童設計的互動式教育 PWA，透過拖放遊戲專注於 STEAM 教育。本專案完全對齊 **美國 Pre-K STEAM 與早期素養** 標準（CCSS 與 NGSS）。

**線上體驗:** [https://lumiworld.onrender.com](https://lumiworld.onrender.com)

---

## ✨ 核心功能

| 功能 | 說明 |
|------|------|
| **8 週完整課程** | 每個關卡 30 題，共 240 道練習題 |
| **5 種語言** | 英文、繁體中文、日本語、한국어、ภาษาไทย |
| **多語言語音** | 用選擇的語言朗讀物品名稱 (Web Speech API) |
| **iPad 優化** | 觸控友善介面，含 iOS 音訊解鎖機制 |
| **智慧拖放** | 需拖曳 30 像素以上才判定，防止誤觸 |
| **進度追蹤** | 星星評分系統 (1-3 星) + LocalStorage 持久化 |
| **離線運行** | 無需後端，無需網路即可使用 |
| **兒童安全** | 無數據收集、無追蹤，符合 COPPA 規範 |

---

## 📚 8 週課程總覽

每個關卡包含 **30 道練習題**，透過拖放分類學習：

| 關卡 | 主題 | 分類方式 | 核心標準 |
|:----:|------|----------|----------|
| **1** | 科學分類 | 有生命 vs 無生命 | NGSS K-LS1-1 |
| **2** | 解剖學入門 | 海洋部位 vs 陸地部位 | CCSS.ELA-LITERACY.RF.K.3.A |
| **3** | 數感發展 | 少量 vs 多量 | CCSS.MATH.CONTENT.K.CC.B.4 |
| **4** | 比較測量 | 巨大 vs 微小 | CCSS.MATH.CONTENT.K.MD.A.2 |
| **5** | 棲息地探索 | 天空 vs 地面 | NGSS 空間邏輯 |
| **6** | 植物學基礎 | 植物需要 vs 不需要 | NGSS 生命週期 |
| **7** | 環境科學 | 乾淨海洋 vs 垃圾 | NGSS K-ESS3-3 + CASEL SEL |
| **8** | 生態系統管理 | 森林 vs 海洋 | STEAM 整合 |

📖 **教師指南:** 詳見 [docs/TEACHER_GUIDE_ZH.md](docs/TEACHER_GUIDE_ZH.md)

---

## 🌐 多語言支援

### 支援語言

| 語言 | 代碼 | 語音 | 介面 |
|------|------|------|------|
| 🇺🇸 English | en-US | ✅ | ✅ |
| 🇹🇼 繁體中文 | zh-TW | ✅ | ✅ |
| 🇯🇵 日本語 | ja-JP | ✅ | ✅ |
| 🇰🇷 한국어 | ko-KR | ✅ | ✅ |
| 🇹🇭 ภาษาไทย | th-TH | ✅ | ✅ |

### 運作方式
- **顯示:** 物品名稱永遠以英文顯示
- **語音:** 物品以選擇的語言朗讀發音
- **iOS 支援:** 首次觸碰時自動解鎖音訊

---

## 🚀 快速開始

### 系統需求

- Node.js 18+
- npm 或 yarn

### 安裝步驟

```bash
# 進入專案目錄
cd lumiworld-persistent-system

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 開啟瀏覽器
# http://localhost:3000
```

### 部署到 Render

1. 連接 GitHub 倉庫
2. **Build Command:** `npm run build`
3. **Start Command:** `npm run start`

---

## 📁 專案結構

```
lumiworld-persistent-system/
├── app/                      # Next.js App Router
│   ├── page.tsx             # 儀表板 (關卡選擇)
│   ├── week/[id]/           # 遊戲關卡
│   └── settings/            # 設定頁面
├── components/
│   ├── game/                # Draggable, DropZone
│   └── ui/                  # Header, WeekCard
├── systems/                 # 核心邏輯
│   ├── SaveSystem.ts        # LocalStorage 存檔
│   ├── AudioSystem.ts       # TTS + iOS 解鎖
│   └── GameLogic.ts         # 碰撞檢測
├── data/
│   ├── Curriculum.json      # 關卡配置
│   └── GameContent.ts       # 240 道練習題
├── hooks/                   # useProgress, useLanguage
├── locales/                 # 5 種語言翻譯檔
└── docs/
    └── TEACHER_GUIDE_ZH.md  # 教師課程指南
```

---

## 🔒 隱私與安全

- ✅ **無資料收集:** 所有資料僅保留在裝置本地
- ✅ **無後端:** 無需伺服器，無需數據庫
- ✅ **無追蹤:** 無分析腳本，無 Cookies
- ✅ **符合 COPPA:** 對兒童絕對安全

---

## 📝 許可證

MIT License - 可自由用於教育目的

---

**Made with ❤️ for curious 4-year-olds**
