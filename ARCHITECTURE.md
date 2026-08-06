# 慈飛。蹲點阿拉伯 — 阿聯酋工作生活指南

> 最後更新：2026-08-06
> GitHub repo：`cameljourney-uae-guide`
> 網站：https://htzuhui-glitch.github.io/cameljourney-uae-guide/
> 狀態：第一階段已上線。內容持續補充中，十個路線圖主題仍標記為 draft，
> 各區域的「慈飛的實地觀察」尚未填寫。

## 一、這個網站要解決什麼

幫助準備來阿聯酋（UAE）工作的台灣人與外國人，回答兩個核心問題：

1. **「我要辦哪些事、照什麼順序辦？」** → 落地路線圖
2. **「這份 offer 在這裡活得下去嗎？」** → 生活成本試算

參考站 [study-in-germany](https://si-kui-a.github.io/study-in-germany/) 的主軸是「選學校」，
本站主軸是「落地流程 + offer 評估」，因此架構有意調整。

## 二、已確認的三個決策

| 決策 | 結論 |
|---|---|
| 語言 | 中文優先，檔案結構預留英文（i18n 分目錄，之後補檔即可，不用重構） |
| 第一階段範圍 | 純靜態資訊站，**不接資料庫**。社群功能延後 |
| 評價模組 | **不做評分**。改為中性的「區域介紹」，依城市分層 |

## 三、頁面地圖

```
/                       首頁 — Hero、快速入口、最新更新
/roadmap                落地路線圖（核心頁）
                        時間軸四段：出發前 → 抵達首月 → 安頓後 → 離境
/roadmap/:slug          單一主題流程（可勾選步驟清單）
/cost                   生活成本試算（互動計算機）
/cities                 城市總覽 + 杜拜 vs 阿布達比 vs 沙迦 比較表
/cities/:city           單一城市：概況、通勤地圖、區域卡片列表
/cities/:city/:area     單一區域介紹（無評分）
/culture                文化與法律紅線
/faq                    常見問題
/resources              官方連結、駐杜拜辦事處、台灣人社群
/about                  關於本站與免責聲明
```

第二階段（有社群基礎後再評估）：`/board` 佈告欄、區域評價。

### /roadmap 的十個主題

| slug | 主題 | 時間軸位置 |
|---|---|---|
| `visa` | 工作簽證、體檢、Emirates ID | 出發前 → 首月 |
| `job` | 求職管道、履歷、合約要看哪幾條、勞動法權益 | 出發前 |
| `housing` | 租屋（杜拜 Ejari／阿布達比 Tawtheeq）、押金、水電開戶 | 首月 |
| `bank` | 銀行開戶、匯款回台 | 首月 |
| `health` | 醫療保險、就醫、從台灣帶什麼 | 首月 |
| `driving` | 考照（台灣駕照不能直接換）、Salik／Darb、大眾運輸 | 安頓後 |
| `telecom` | Etisalat／du 門號與網路 | 首月 |
| `family` | 眷屬簽證、國際學校 | 安頓後 |
| `taiwan` | 學歷三關認證、保留台灣門號、台灣端帳戶 | 出發前 |
| `exit` | 離職、簽證註銷、End of Service Gratuity 約滿酬金 | 離境 |

每個主題頁的結構統一：**一句話結論 → 前置條件 → 步驟清單（可勾選）→ 費用與時程 → 常見卡關 → 官方連結 → 最後更新日期**。

### /cost 生活成本試算（本站差異化重點）

- **輸入**：月薪（AED）、城市、家庭狀況（單身／夫妻／有幾個小孩）、預計住哪一區
- **輸出**：房租、水電網路、交通、保險、小孩學費、生活費 → 預估月結餘，並換算台幣
- 所有基準數字集中在一個資料檔，標註來源與更新日期
- 提供「情境預設」快速套用：單身省錢型／單身舒適型／雙薪無小孩／一家四口

### /cities/:city/:area 區域介紹欄位（不評分）

- 月租區間（studio／1BR／2BR，AED）
- 通勤：到主要商業區的車程
- 生活機能：超市、商場、醫院、學校
- 適合誰：單身上班族／有小孩家庭／想省錢
- 氛圍描述
- **慈飛的實地觀察** ← 別的資訊站沒有的東西

初期收錄範圍（可分批補）：
- 阿布達比：Al Reem Island、Khalifa City、Al Reef、Yas Island、Saadiyat Island、Corniche 市中心、Al Raha Beach、Mussafah
- 杜拜：Dubai Marina、JLT、Downtown、Business Bay、JVC、Deira／Bur Dubai、Al Barsha、Silicon Oasis
- 沙迦：概況為主（多為通勤到杜拜的省錢選項）

## 四、法律風險與內容原則

**本站不做雇主／公司評價功能，也不刊登指名的負面評論。**

阿聯酋 Federal Decree-Law No. 34 of 2021（2024 年經 Federal Law No. 5 修正）將線上誹謗列為
**刑事罪**，罰金 AED 250,000～500,000、可併科監禁，外籍人士另有遭驅逐出境之虞。
法律見解認為評論一旦從「服務本身」延伸到攻擊名譽即跨線，留言串同樣適用。
網站雖託管於 GitHub Pages，但營運者人在阿布達比境內，風險為實質而非理論。

替代做法（一樣有用，但不指名）：
- 「簽 offer 前該檢查的 10 個合約條款」
- 「試用期、無薪假、約滿酬金怎麼算」
- 「遇到勞資糾紛可以找 MoHRE 申訴」

其他內容原則：
- 每頁標示**最後更新日期**與**官方來源連結**（UAE 簽證與居留規定變動頻繁，這是信任基礎）
- 全站免責聲明：本站為經驗整理，非法律或稅務建議

## 五、技術架構

| 項目 | 選型 | 理由 |
|---|---|---|
| 框架 | Vite + React 19 + TypeScript | 同參考站，成熟穩定 |
| 樣式 | Tailwind CSS v4 | 同上 |
| 路由 | react-router-dom（**HashRouter**） | GitHub Pages 必須用 hash 才不會 404 |
| 內容 | repo 內的 JSON／Markdown | 第一階段**不用資料庫** |
| 部署 | GitHub Actions → GitHub Pages | 推上去自動更新 |

**為什麼第一階段不接 Supabase**：純靜態網站完全免費、零維運、載入快；
內容改動走 Git 有完整版本紀錄，非工程師也能直接改檔案更新。
等真的有人流、確定需要互動，再接資料庫處理註冊登入、檢舉、內容審核。

### 目錄結構

```
uaepage/
├─ src/
│  ├─ pages/                   路由對應的頁面元件
│  ├─ components/              共用元件（卡片、時間軸、勾選清單、計算機）
│  ├─ data/
│  │  ├─ zh/                   ← 中文內容（第一階段只有這個）
│  │  │  ├─ roadmap/           10 個主題各一個 JSON
│  │  │  ├─ cities/            abudhabi.json、dubai.json、sharjah.json（含 areas）
│  │  │  ├─ cost.json          成本基準數字（標註來源與更新日期）
│  │  │  ├─ faq.json
│  │  │  ├─ culture.json
│  │  │  └─ resources.json
│  │  └─ en/                   ← 之後複製 zh/ 翻譯即可，架構不用改
│  ├─ locales/                 介面文字（zh.json／en.json）
│  └─ lib/                     計算機邏輯、日期格式等
├─ public/
├─ .github/workflows/deploy.yml
└─ ARCHITECTURE.md
```

**i18n 做法**：內容依語言分目錄（要翻譯就複製整個資料夾），介面文字集中在 `locales/`。
第一階段只寫 `zh/`，但讀取內容的程式從一開始就走「依語言取路徑」，日後補英文不用動架構。

## 六、建置順序

1. 專案骨架：Vite + React + TS + Tailwind + HashRouter + GitHub Actions 部署
2. 版面框架：導覽列、頁尾、免責聲明、最後更新日期元件
3. `/roadmap` 路線圖與主題頁（先做 `visa`、`housing` 兩篇當範本）
4. `/cost` 生活成本試算
5. `/cities` 城市與區域導覽（先做阿布達比）
6. `/culture`、`/faq`、`/resources`、`/about`
7. 補齊其餘 roadmap 主題與杜拜區域內容
