# 慈飛。蹲點阿拉伯 — 阿聯酋工作生活指南

要來阿聯酋工作，該辦什麼、花多少、住哪裡，一次講清楚。

網站內容包含落地路線圖、生活成本試算、城市與區域介紹、文化與法律紅線、常見問題與資源連結。

## 技術架構

Vite + React 19 + TypeScript + Tailwind CSS v4 + react-router-dom（HashRouter），純靜態網站、不需要資料庫，
透過 GitHub Actions 自動部署到 GitHub Pages。

架構規劃與內容原則見 [ARCHITECTURE.md](ARCHITECTURE.md)。

## 在本機跑起來

```bash
npm install
npm run dev
```

打開 http://localhost:5173 就能看到。

其他指令：

```bash
npm run build    # 建置正式版到 dist/
npm run preview  # 預覽建置後的結果
npm run lint     # 檢查程式碼
```

## 怎麼改內容

所有文字內容都在 `src/data/zh/` 底下的 JSON 檔案，改完存檔、推上 GitHub 就會自動更新網站，
不需要動到任何程式碼。

| 想改什麼 | 改哪個檔案 |
|---|---|
| 落地路線圖的某個主題 | `src/data/zh/roadmap/<主題>.json` |
| 城市與區域介紹 | `src/data/zh/cities/<城市>.json` |
| 生活成本試算的基準數字 | `src/data/zh/cost.json` |
| 常見問題 | `src/data/zh/faq.json` |
| 文化與法律 | `src/data/zh/culture.json` |
| 資源連結 | `src/data/zh/resources.json` |

### 新增一個路線圖主題

在 `src/data/zh/roadmap/` 放一個新的 JSON 檔就會自動出現在網站上，不用改程式。
欄位格式照現有檔案抄，`phase` 只能填 `before`、`firstMonth`、`settled`、`exit` 其中一個，
`status` 填 `draft`（會顯示「撰寫中」標籤）或 `ready`。

### 改完記得更新 `updated`

每個內容檔都有 `updated` 欄位，會顯示在頁面上當作「最後查證日期」。
阿聯酋的規定變動頻繁，這個日期是讀者判斷資訊新不新的依據，改內容時請一起更新。

## 之後要加英文版

內容依語言分目錄。把 `src/data/zh/` 整包複製成 `src/data/en/` 再翻譯即可，
讀取內容的程式已經寫成依語言取路徑，不需要改架構。

## 內容原則

- 每頁標示最後查證日期與官方來源連結。
- **不刊登針對特定雇主、公司或個人的評價與負面評論。** 阿聯酋將線上誹謗列為刑事罪
  （Federal Decree-Law No. 34 of 2021，2024 年經 Federal Law No. 5 修正），罰則包含高額罰金、
  監禁與遣返。相關說明見 ARCHITECTURE.md。
- 本站為經驗整理，不構成法律、稅務或移民建議。

## 內容有錯或想補充

歡迎開 issue 或送 PR。

## License

MIT
