# 💬 Real-Time Chat App
 
A simple real-time chat application built with **Next.js** on the frontend and **NestJS + Socket.IO** on the backend.
 
---
 
## 🚀 Features
 
- ⚡ Real-time messaging with Socket.IO
- 👤 Join chat with username
- 💬 Live message updates
- ⌨️ Typing indicator
- 🧠 Simple state management via React hooks
- 📡 WebSocket-based communication
---
 
## 🧱 Tech Stack
 
| Layer | Technologies |
|-------|-------------|
| **Frontend** | Next.js (App Router), React, Socket.IO Client, TypeScript, CSS Modules |
| **Backend** | NestJS, Socket.IO, TypeScript |
 
---
 
## 📁 Project Structure
 
```
chat/
├── chat-client/   # Next.js frontend
└── chat-server/   # NestJS + Socket.IO backend
```
 
---
 
## ⚙️ Getting Started
 
### 1. Clone the repository
 
```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```
 
### 2. Run backend
 
```bash
cd chat-server
npm install
npm run start:dev
```
 
Runs on `http://localhost:3001`
 
### 3. Run frontend
 
```bash
cd chat-client
npm install
npm run dev
```
 
Runs on `http://localhost:3000`
 
---
 
## 🔌 Socket Events
 
**Client → Server**
 
| Event | Description |
|-------|-------------|
| `join` | Join chat with username |
| `createChat` | Send a message |
| `typing` | Emit typing indicator |
| `findAllChat` | Fetch all messages |
 
**Server → Client**
 
| Event | Description |
|-------|-------------|
| `message` | New incoming message |
| `typing` | Typing status update |
 
---
 
## 💡 Message Format
 
```ts
type Message = {
  name: string;
  text: string;
};
```
 
---
 
## 🧠 How It Works
 
1. Each user connects via Socket.IO
2. Server identifies user by socket connection
3. Messages are broadcast to all connected clients
4. Typing status is emitted in real-time
---
 
## 🔮 Future Improvements
 
- 🏠 Chat rooms (Discord-style)
- 🔐 Authentication (JWT)
- 💾 Database integration (PostgreSQL / MongoDB)
- 📦 Message persistence
- 👥 Online users list
- 📱 Mobile responsive improvements
- ⚡ Redis adapter for socket scaling
---
 
## 🧑‍💻 Author
 
Built by [Your Name](https://github.com/your-username)
 
---
 
## 📜 License
 
This project is open-source and free to use.
