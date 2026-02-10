# 🔒 Private Realtime Chat

A **minimal, truly private** 2-person realtime chat application.  
No accounts • No login • No tracking • Just share a link and talk.

**Live Demo:** https://private-realtime-chat.vercel.app/

Create a room in seconds, share the link with one person, and start chatting instantly — with a strict **2-user limit** per room.

## ✨ Features

- Private rooms with unique, shareable IDs
- **Strict 2-user limit** per room (enforced on server)
- Simple token-based access control via cookies
- Messages stored temporarily in Redis
- Clean, modern, mobile-friendly UI
- Rooms auto-expire after 10 minutes (configurable TTL)
- Zero persistent user data

## 🛠 Tech Stack

| Technology          | Purpose                              |
|---------------------|--------------------------------------|
| Next.js 14/15/16 + App Router | Frontend & full-stack framework     |
| React 19            | UI components                        |
| Elysia              | Lightweight, type-safe backend API   |
| Upstash Redis       | Fast temporary storage + pub/sub     |
| TanStack Query      | Data fetching, caching & realtime    |
| Zod                 | Schema validation                    |
| Tailwind CSS        | Styling                              |

## 🚀 How It Works

### Room Creation
- Click "Create Room" → unique room ID generated
- Room metadata + participant counter stored in Redis
- Room gets auto-expire TTL (default: 10 minutes = 600s)
- Shareable link created instantly (`/room/[id]`)

### Access Control (2 users max)
- First user joins → becomes participant #1
- Second user joins → participant #2 (chat becomes active)
- Third+ users → blocked with friendly message
- Token (cookie) prevents unauthorized reconnects / duplicates

### Messaging
- Messages stored in Redis list: `messages:{roomId}`
- Realtime updates via TanStack Query polling / invalidation
- Messages cleared when room expires

### Room Expiration
```ts
const ROOM_TTL_SECONDS = 600; // 10 minutes
