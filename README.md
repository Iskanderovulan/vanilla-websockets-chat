# Pure WebSocket Chat

A minimal real-time chat app built with **vanilla WebSocket** (`ws`), **Node.js**, and **React + TypeScript** — without using `socket.io`.

## 🔧 Features

- Real-time message exchange between multiple clients
- Custom WebSocket hook on frontend (`useSocket`)
- Message history persisted in `messages.json`
- Typing with `TypeScript` on both client and server
- Shift+Enter for new lines, Enter to send
- Simple form layout with username and textarea
- No external WebSocket libraries like `socket.io`

## 🛠 Stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express, `ws`
- **Data:** `messages.json` (local file-based history)

## 🚀 Getting Started

### 1. Start backend

```bash
cd backend
npm install
npm run dev
```

> The backend will run on `http://localhost:3001`

### 2. Start frontend

```bash
cd frontend
npm install
npm run dev
```

> The frontend will run on `http://localhost:5173`

## 📸 Preview

> Open two browser tabs to see messages appear in real-time between them.

## ✨ Why no socket.io?

This project was intentionally built using raw WebSocket (`ws`) to understand and demonstrate how WebSocket protocols work **without abstraction**. It gives you full control over events, connections, and message formats.

## 📂 Project Structure

```
backend/
  └── server.js
  └── messages.json
frontend/
  └── src/components/Socket.tsx
  └── src/hooks/useSocket.ts
```

---

Want to extend it with user presence, typing indicators or rooms? Fork and build! 💬
