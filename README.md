# ⚡ Vedaz — Real-Time Expert Session Booking System

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

**A production-grade booking platform with real-time slot updates, atomic race condition prevention, and full CI/CD deployment.**

🔗 **[Live Demo →](https://vedaz.vercel.app)** | 📹 **[Demo Video →](#)**

</div>

---

## 📸 Screenshots

| Expert Listing | Expert Detail | Booking Form | My Bookings |
|---|---|---|---|
| ![List](https://via.placeholder.com/220x140/1E3A5F/FFFFFF?text=Expert+List) | ![Detail](https://via.placeholder.com/220x140/0D9488/FFFFFF?text=Expert+Detail) | ![Booking](https://via.placeholder.com/220x140/1E3A5F/FFFFFF?text=Booking+Form) | ![MyBookings](https://via.placeholder.com/220x140/0D9488/FFFFFF?text=My+Bookings) |

---

## ✨ Key Features

| Feature | Implementation |
|---|---|
| 🔴 **Real-Time Slot Updates** | Socket.io rooms — slot greys out instantly on ALL connected clients when booked |
| 🔒 **Race Condition Prevention** | MongoDB atomic `findOneAndUpdate` with `isBooked: false` condition — makes double booking impossible |
| 🔍 **Expert Search & Filter** | Debounced (400ms) search + category filter + server-side pagination |
| ✅ **Form Validation** | Zod schema + React Hook Form — field-level errors, phone format, email format |
| 🎉 **Booking Success UX** | Animated success card with confetti on confirmed booking |
| ♻️ **CI/CD Pipeline** | GitHub Actions auto-deploys backend to Render and frontend to Vercel on every `git push` |
| 🌐 **SPA Routing** | Vercel rewrites ensure direct URL access to all routes works correctly |

---

## 🚀 Local Setup (One Command)

> Requires Node.js ≥ 18 and MongoDB running locally

```bash
bash setup.sh
```

This single script will:
- Install all dependencies (backend + frontend)
- Copy `.env.example` → `.env` in both directories
- Seed the database with 10 realistic experts and 7 days of slots
- Start backend (port 5000) and frontend (port 3000) concurrently

---

## 🔐 Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/vedaz
CLIENT_URL=http://localhost:3000
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

---

## 📡 API Reference

| Method | Endpoint | Description | Query Params |
|---|---|---|---|
| `GET` | `/api/experts` | Paginated expert list | `page`, `limit`, `category`, `search` |
| `GET` | `/api/experts/:id` | Single expert with all slots | — |
| `POST` | `/api/bookings` | Create booking (atomic slot lock) | — |
| `PATCH` | `/api/bookings/:id/status` | Update booking status | — |
| `GET` | `/api/bookings` | Get bookings by email | `email` |

### Response Format (all endpoints)
```json
{
  "success": true,
  "data": {},
  "message": "Booking created successfully"
}
```

---

## 🛡️ Race Condition Prevention (Deep Dive)

Traditional "read-then-write" approaches have a race condition window:

```
❌ WRONG (vulnerable):
   1. Read slot → isBooked: false ✅
   2. [Another user books the same slot here]
   3. Write booking → slot now double-booked 💥
```

This system uses **MongoDB's atomic findOneAndUpdate**:

```javascript
// server/controllers/bookingController.js
const updatedExpert = await Expert.findOneAndUpdate(
  {
    _id: expertId,
    "availableSlots.date": date,
    "availableSlots.time": timeSlot,
    "availableSlots.isBooked": false   // ← condition checked atomically
  },
  { $set: { "availableSlots.$.isBooked": true } },
  { new: true }
);

if (!updatedExpert) {
  // Lock failed — slot was taken between request and DB write
  return res.status(409).json({
    success: false,
    message: "Slot already booked. Please choose another."
  });
}
// Only reaches here if lock succeeded — safe to create Booking document
```

Additionally, a **compound unique index** on `{ expertId, date, timeSlot }` in the Booking schema acts as a final database-level safety net.

---

## ⚡ Real-Time Architecture

```
[User A — Chrome]              [Express + Socket.io]          [User B — Firefox]
       |                                 |                              |
       |── socket.emit("join", id) ─────>|                              |
       |                                 |<──── socket.emit("join", id) |
       |                                 |  (Both in room "expert_123") |
       |                                 |                              |
       |── POST /api/bookings ──────────>|                              |
       |   books 10:00 AM slot           |── io.to("expert_123")        |
       |                                 |   .emit("slotBooked",        |
       |<── 201 Created ─────────────────|   { date, timeSlot }) ──────>|
       |                                 |                              |
       |                              [DB atomic lock]      [Slot UI → grey, disabled]
```

---

## 🌍 Deployment

### Auto-Deploy via GitHub Actions
Push to `main` → GitHub Actions triggers:
1. Backend deploys to **Render** via deploy hook
2. Frontend deploys to **Vercel** via Vercel CLI

### Manual Deployment
**Backend (Render):**
- Connect GitHub repo → Render detects `render.yaml` automatically
- Add env vars: `MONGO_URI`, `CLIENT_URL`

**Frontend (Vercel):**
- `cd client && vercel --prod`
- Add env vars: `VITE_API_URL`, `VITE_SOCKET_URL`

**Database:** MongoDB Atlas free tier (M0) — whitelist `0.0.0.0/0` for Render

---

## 🔧 Troubleshooting

| Issue | Fix |
|---|---|
| `MongoServerError: connect ECONNREFUSED` | Make sure MongoDB is running: `mongod` |
| Slots not updating in real-time | Check `VITE_SOCKET_URL` matches backend URL exactly |
| 409 on fresh booking | Run `npm run seed` again to reset slot states |
| Vercel 404 on page refresh | Ensure `vercel.json` rewrites are in place |

---

## 📁 Project Structure

```
vedaz/
├── server/                  # Express backend
│   ├── config/db.js
│   ├── models/              # Expert, Booking schemas
│   ├── controllers/         # Business logic
│   ├── routes/              # API routes
│   ├── middleware/          # Error handler, validation
│   ├── socket/              # Socket.io event handlers
│   └── seed.js              # DB seeder
├── client/                  # React frontend (Vite)
│   └── src/
│       ├── api/             # Axios instances
│       ├── components/      # Reusable UI components
│       ├── hooks/           # Custom React hooks
│       ├── pages/           # Route-level components
│       └── utils/           # Helpers
├── .github/workflows/       # CI/CD pipeline
├── render.yaml              # Render deploy config
└── setup.sh                 # One-command local setup
```

---

<div align="center">
Built for Vedaz Software Development Internship Assignment • May 2025
</div>