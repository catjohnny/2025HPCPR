
# 泰國曼谷高效能 CPR (HP-CPR) 網頁指南

這是一個關於 HP-CPR 與 2025 AHA 指南的一頁式詳盡資訊網頁。

## 如何部署到 GitHub Pages

1. **上傳程式碼**：將所有檔案推送到您的 GitHub 倉庫。
2. **啟動 Actions**：由於我們新增了 `.github/workflows/deploy.yml`，GitHub 會自動偵測並開始編譯。
3. **設定 Pages 來源**：
   - 前往 GitHub 倉庫的 **Settings** > **Pages**。
   - 在 **Build and deployment** > **Source** 下，選擇 **GitHub Actions**。
4. **完成**：稍等幾分鐘，GitHub 就會提供一個網址（例如 `https://<your-username>.github.io/<repo-name>/`），點擊即可看到精美的網頁！

## 本地開發

```bash
npm install
npm run dev
```
