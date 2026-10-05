# DeutschLernen 更新版

依原網站 https://colorful0719.github.io/DeutschLernen-/ 與唐功培《00 海外教育見習.pptx》調整。

## 使用

直接開啟 `index.html`，或將整個資料夾放入靜態網站伺服器。網站樣式、圖示及程式均為本地檔案。語音朗讀使用裝置提供的德語語音，效果與可用性依瀏覽器及裝置而異。

成果清單與原有任務清單儲存在瀏覽器本機，不是線上繳交系統，也不跨裝置同步。

## 更新原 GitHub Pages

先備份原儲存庫的檔案。將本資料夾內所有內容（包含 `vendor` 資料夾）上傳到原 GitHub Pages 設定的發布目錄，取代同名檔案。保留儲存庫既有的其他資源與 Pages 設定。提交後等待 GitHub Pages 部署完成，再重新整理原網址。

此交付檔案尚未上傳至原 GitHub 儲存庫。

## 本次更新

移除頁面上的來源、簡報頁碼與待核對提示。參訪資訊依使用者確認保留，直接呈現時間、地點與聯絡窗口。

版面保留觀光網站的大幅橫幅與分區，配色依 SCUBA 圖片改為深海藍 #0c4a61、珊瑚橘 #f06c34、淺水藍 #abdff0、暖灰 #e2deda。各單元統一按鈕、表格、圖示與鍵盤焦點，保留原提醒事項與德語學習功能。修正無搜尋結果的閃卡、對話切換的朗讀中止，並補上朗讀按鈕標籤與測驗回饋播報。

## 外部元件

樣式使用 Tailwind CSS 3.4.17 編譯，MIT 授權。圖示使用 Font Awesome Free 6.4.0，圖示 CC BY 4.0、字型 SIL OFL 1.1、程式 MIT；原始授權註記保留於 `vendor/icons.css`。不再使用即時 Tailwind CDN 或外部 Google Fonts。

漢堡橫幅照片：Bautsch，CC0 1.0，https://commons.wikimedia.org/wiki/File:Speicherstadt.Hamburg.PanoramaVonElbphilharmonie.jpg 。照片以本地檔案提供。
