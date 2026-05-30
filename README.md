# 🎙️ VoiceAI — AI Voice Receptionist Platform

> Production-ready SaaS dashboard for AI-powered phone receptionists.  
> Next.js 14 · Tailwind CSS · TypeScript · Recharts · Zustand · Vercel-ready

---

## ✨ Features

| Feature | Status |
|---|---|
| 📞 AI answers incoming calls automatically | ✅ Full UI |
| 📅 Appointment booking & management | ✅ Full CRUD |
| 🤖 AI persona & voice configuration | ✅ 4-tab settings |
| 💬 WhatsApp confirmation messages | ✅ Log viewer + preview |
| 📊 Real-time analytics dashboard | ✅ Charts & KPIs |
| 🔴 Live call monitor | ✅ Auto-ticking durations |
| 📝 Call transcripts viewer | ✅ Chat-style UI |
| 🧠 FAQ knowledge base manager | ✅ Full CRUD + reorder |
| 💳 Billing & subscription plans | ✅ Usage meters |
| ⚙️ Business settings & team management | ✅ Complete |
| 🔔 Toast notification system | ✅ Auto-dismiss |
| 🌙 Premium dark theme | ✅ Full design system |

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env.local

# 3. Start development server
npm run dev

# 4. Open http://localhost:3000
#    → Auto-redirects to /dashboard/overview (demo mode)
```

**Demo Login:**  
Email: `admin@meridianhealth.com`  
Password: `demo123`

---

## 📁 Project Structure

```
ai-voice-receptionist/
├── app/
│   ├── auth/
│   │   ├── login/page.tsx          # Split-panel login
│   │   └── register/page.tsx       # Registration form
│   ├── dashboard/
│   │   ├── layout.tsx              # Sidebar + notifications
│   │   ├── overview/page.tsx       # KPIs + charts + live monitor
│   │   ├── calls/page.tsx          # Call log + transcript modal
│   │   ├── appointments/page.tsx   # Calendar + booking CRUD
│   │   ├── faqs/page.tsx           # FAQ knowledge base
│   │   ├── ai-config/page.tsx      # AI persona + voice settings
│   │   ├── whatsapp/page.tsx       # Message logs + preview
│   │   ├── billing/page.tsx        # Plans + usage + invoices
│   │   └── settings/page.tsx       # Business + team + security
│   ├── globals.css                 # Full design system
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Redirect → /dashboard/overview
│   ├── error.tsx                   # Error boundary
│   ├── loading.tsx                 # Loading state
│   └── not-found.tsx               # 404 page
├── components/
│   ├── ui/
│   │   ├── Button.tsx              # 6 variants
│   │   ├── Card.tsx                # Glass card
│   │   ├── Badge.tsx               # Status badges
│   │   ├── Input.tsx               # Input/Textarea/Select/Toggle
│   │   ├── Modal.tsx               # Dialog + ConfirmModal
│   │   ├── Table.tsx               # Sortable data table
│   │   └── Notification.tsx        # Toast system
│   ├── dashboard/
│   │   ├── Sidebar.tsx             # Collapsible navigation
│   │   ├── TopBar.tsx              # Page header
│   │   └── StatCard.tsx            # KPI metric cards
│   ├── charts/
│   │   ├── CallVolumeChart.tsx     # Area chart (Recharts)
│   │   └── IntentDonutChart.tsx    # Pie chart (Recharts)
│   └── realtime/
│       └── LiveCallMonitor.tsx     # Live call ticker
├── hooks/
│   └── useLiveCalls.ts            # Simulated real-time calls
├── lib/
│   ├── data.ts                    # Mock data + helpers
│   └── utils.ts                   # Utility functions
├── store/
│   └── useStore.ts                # Zustand global state
├── types/
│   └── index.ts                   # TypeScript definitions
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── vercel.json                    # Vercel deployment config
├── .env.example                   # Environment variable template
├── tailwind.config.ts             # Design tokens
├── tsconfig.json
├── next.config.js
└── postcss.config.js
```

---

## 🌐 Deploy to Vercel

### One-click deploy:

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repo
4. Click **Deploy** — zero config required!

### Manual deploy:
```bash
npm install -g vercel
vercel --prod
```

---

## 🔌 Connecting the Real Backend

This frontend is designed to connect to a Node.js + Express backend.  
Update `.env.local` with your backend URL:

```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api/v1
NEXT_PUBLIC_WS_URL=wss://your-backend.railway.app
```

Then replace mock data calls in `lib/data.ts` with real `fetch()` API calls.

### Real-time calls via Socket.IO:
Update `hooks/useLiveCalls.ts` to connect to your Socket.IO server:
```typescript
import { io } from 'socket.io-client'
const socket = io(process.env.NEXT_PUBLIC_WS_URL)
socket.on('call:started', (call) => setCalls(prev => [...prev, call]))
socket.on('call:ended', ({ callSid }) => setCalls(prev => prev.filter(c => c.callSid !== callSid)))
```

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `--navy-950` | `#060E1F` | Page background |
| `--navy-900` | `#0F1F3D` | Card backgrounds |
| `--cyan-500` | `#06B6D4` | Primary accent |
| `--violet-500` | `#8B5CF6` | Secondary accent |
| `--emerald-500` | `#10B981` | Success states |
| `--amber-500` | `#F59E0B` | Warning states |
| `--rose-500` | `#F43F5E` | Error/danger states |

**Fonts:** Syne (display) · DM Sans (body) · JetBrains Mono (code/data)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Charts | Recharts |
| State | Zustand 4 |
| Icons | Lucide React |
| Deploy | Vercel |

---

## 📄 License

MIT — free for personal and commercial use.
