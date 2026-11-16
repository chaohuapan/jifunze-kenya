# Jifunze Kenya — PWA 原型

這是一個可安裝到手機主畫面的 PWA 前端原型，包含：
- 響應式手機介面
- 6 個初級示範課程
- 聽力／口說／閱讀模式切換
- 使用裝置 Speech Synthesis 播放句子（Kiswahili 語音是否存在取決於裝置）
- 使用瀏覽器 Web Speech API 嘗試語音辨識（支援度不一，非發音評分）
- 本機學習進度保存（localStorage）
- Service Worker 靜態資源快取
- 安裝提示與 Web App Manifest

## 如何在 iPhone 使用

1. 將整個資料夾部署到支援 HTTPS 的靜態網站服務（例如 GitHub Pages、Netlify 或 Vercel）。
2. 用 iPhone Safari 開啟部署後的 HTTPS 網址。
3. 點選「分享」→「加入主畫面」。
4. 從主畫面圖示開啟，即可用類 App 方式使用。

## 本機測試

需要透過 localhost 或 HTTPS 才能測試 Service Worker。可在資料夾內執行：
`python -m http.server 8000`
再用瀏覽器開啟 `http://localhost:8000`。

## 重要限制

- 目前是可部署的前端 PWA 原型，不是已上線的公開網站。
- 尚未連接 AI 服務、雲端帳號、雲端同步、專業發音評分或推播通知。
- 瀏覽器的 Kiswahili 語音與語音辨識支援依作業系統、瀏覽器及已安裝語音而異。
- 離線快取可保存已載入的 App 靜態檔案；目前尚未提供完整課程音檔下載。
- 課程內容是初級示範，正式商用前應由肯亞 Kiswahili 母語者審校並錄製自然口音。

## 下一步正式化建議

1. 加入肯亞母語者錄音與可離線下載音檔。
2. 接入支援 Kiswahili 的語音辨識及發音評估服務，實測肯亞口音。
3. 建立使用者登入、雲端資料庫與多裝置同步。
4. 加入 AI 情境對話及安全的後端 API。
5. 加入 Web Push 與每日課程提醒。
