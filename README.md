# Manufacturing Dashboard Demo

一個以製造現場 MES（Manufacturing Execution System）情境為主題的前端作品。專案使用 Vue 3、Composition API、Pinia、Vue Router、Tailwind CSS、ECharts，模擬登入授權、戰情看板、REST API mock、Mock WebSocket 即時通知與前端權限控管。

## 技術棧

- Vue 3
- TypeScript
- Composition API
- Pinia
- Vue Router
- Axios
- Tailwind CSS
- ECharts / vue-echarts
- Vite

## 角色與權限

登入帳號會決定角色，密碼可使用任意非空值，例如 `demo1234`。

| 帳號 | 角色 | 權限 |
| --- | --- | --- |
| `admin` | Admin | 查看 dashboard、模擬產線更新、管理通知、清空通知 |
| `engineer` | Engineer | 查看 dashboard、模擬產線更新 |
| `viewer` | Viewer | 僅查看 dashboard |

## 登入狀態保存

此 demo 會把 mock access token 存在前端 cookie，並把 user profile 存在 localStorage 作為 UI 顯示與權限示範。由於這是純前端 demo，cookie 不能設定真正的 `HttpOnly`。正式產品應由後端設定 `HttpOnly`、`Secure`、`SameSite` cookie，並在後端驗證每支 API 權限。

## 開發指令

安裝依賴：

```bash
npm install
```

啟動開發伺服器：

```bash
npm run dev
```

預設會啟動在：

```txt
http://localhost:5173/
http://127.0.0.1:5173/
```

Production build：

```bash
npm run build
```

預覽 build 結果：

```bash
npm run preview
```

## 內容

這個作品企業內部系統內容包含：

- Vue 3 Composition API 元件開發
- Pinia 狀態管理
- REST API 串接結構
- JWT mock token、cookie 保存登入狀態與 route guard
- 前端權限控制
- WebSocket 即時通知與重連概念
- ECharts 資料視覺化
- Vite chunk split 效能優化
