# 🤫 Private Realtime Chat

A secure, ephemeral, request-based messaging application built for privacy and speed. Features real-time communication with zero persistence guarantees suitable for quick, secret conversations.

### Live Demo available at: [private-realtime-chat.vercel.app](https://private-realtime-chat.vercel.app/)

![Demo Screenshot](/demo-screenshot.png)

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://private-realtime-chat.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Upstash](https://img.shields.io/badge/Upstash-Redis%20%26%20Realtime-00E9A3?style=for-the-badge)](https://upstash.com/)
[![ElysiaJS](https://img.shields.io/badge/ElysiaJS-API-blueviolet?style=for-the-badge)](https://elysiajs.com/)

## ✨ Key Features

- **⚡ Instant Real-time Messaging**: Powered by Upstash Realtime (WebSocket/SSE) for sub-millisecond latency.
- **👻 Truly Ephemeral**: Rooms have a strict Time-to-Live (TTL). Once the timer hits zero, the room and all messages are permanently wiped from Redis.
- **🔒 Shared-Link Security**: Rooms are accessible only via a unique, non-guessable URL.
- **👥 Capacity Limits**: Rooms are strictly limited to 2 participants to ensure privacy.
- **🛡️ Token-Based Access**: Every participant is assigned a cryptographic token upon entry, preventing unauthorized eavesdropping.
- **🎨 Modern HUD Interface**: A clean, cyberpunk-inspired dark UI built with Tailwind CSS v4.

## 🛠️ Tech Stack

- **Frontend**: [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend API**: [ElysiaJS](https://elysiajs.com/) (running as a Next.js API route)
- **Database & Realtime**: [Upstash Redis](https://upstash.com/docs/redis/overall/getstarted) & [Upstash Realtime](https://upstash.com/docs/realtime/overall/getstarted)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **Validation**: [Zod](https://zod.dev/)

## 📂 Project Structure

This project follows a clean, modular architecture. Here is an overview of the key files:

### **Core Application (`src/app`)**

- **`page.tsx`**: The Landing Page (Lobby). Handles user session (username generation) and room creation.
- **`room/[roomId]/page.tsx`**: The main Chat Interface.
  - Connects to the Realtime backend.
  - syncs messages via TanStack Query.
  - Handles the countdown timer and "Self-Destruct" logic.
- **`api/[[...slugs]]/route.ts`**: The Backend entry point.
  - All API requests are routed through this file using **ElysiaJS**.
  - Defines routes for `/room/create`, `auth`, and `/messages`.
- **`api/[[...slugs]]/auth.ts`**: A robust Authentication Middleware for Elysia.
  - Verifies the user's `a-auth-token` cookie against the room's whitelist in Redis.

### **Libraries & Utilities (`src/lib`)**

- **`redis.ts`**: Initializes the Upstash Redis client.
- **`realtime.ts`**: Configures the Upstash Realtime client and defines the **Zod Identity Schema** for type-safe events (`chat.message`, `chat.end`).
- **`client.ts`**: An **Eden Treaty** client. This allows the frontend to call the backend with full TypeScript type inference (e.g., `client.room.create.post()`).

### **Middleware & Access Control**

- **`proxy.ts`**: Contains logic intended for request interception (middleware).
  - _Note: Handles checks for "Room Full" and access token generation before loading the page logic._

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- An Upstash Account (for Redis & Realtime)

### Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/vrahtA/PrivateRealtime_Chat
   cd private-realtime-chat
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory:

   ```env
   UPSTASH_REDIS_REST_URL="your-upstash-redis-url"
   UPSTASH_REDIS_REST_TOKEN="your-upstash-redis-token"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🤝 Contributing

Contributions are active! Please verify that `config` in `proxy.ts` is correctly hooked up in your Next.js configuration if you plan to modify auth routing.

## 📄 License

MIT © 2026
