# Club Portal - Full Stack App

A minimal club and events portal with authentication, role-based access (ADMIN/MEMBER), clubs, memberships, events, and registrations. Backend: Node.js/Express/Prisma/MySQL. Frontend: Vite + React with native fetch.

## Overview
- Auth: JWT-based, bcrypt password hashing
- Roles: MEMBER (default) and ADMIN
- Clubs: list, details; create (ADMIN), membership requests (MEMBER)
- Events: list; register; create (ADMIN)
- Admin: approve clubs/memberships, create events, promote users, view reports

## Prerequisites
- Node.js 18+
- MySQL running locally

## 1) Backend Setup

From project root:
```bash
cd backend
npm install
# Generate Prisma client using root schema
npx prisma generate --schema=../prisma/schema.prisma
```

```

Run the server:
```bash
npm start    # or: node src/server.js
```
You should see: `Server running on port 5050`.

### Useful backend endpoints
- Auth: POST `/api/auth/register`, `/api/auth/login`
- Clubs: GET `/api/clubs`, GET `/api/clubs/:id`, POST `/api/clubs` (ADMIN), POST `/api/clubs/:id/enroll` (auth)
- Events: GET `/api/events`, POST `/api/events/:id/register` (auth)
- Admin:
  - Clubs/Members: `PATCH /api/admin/club/:id/approve`, `PATCH /api/admin/member/:id/approve`
  - Events: `POST /api/admin/event`
  - Users: `GET /api/admin/users`, `PATCH /api/admin/users/:id/promote`
  - Reports: `GET /api/admin/memberships`, `GET /api/admin/event-registrations`
- Me: `GET /api/me/memberships`, `GET /api/me/event-registrations`
- - Auth: POST `/api/auth/register`, `/api/auth/login`
- Clubs: GET `/api/clubs`, GET `/api/clubs/:id`, POST `/api/clubs` (ADMIN), POST `/api/clubs/:id/enroll` (auth)

### Troubleshooting
- If you see `@prisma/client did not initialize`, run:
```bash
cd backend
npx prisma generate --schema=../prisma/schema.prisma
```
- If browser shows 403 from `localhost:5000`, ensure the backend is on the same port as configured (default 5050). Vite proxy is set to 5050.

## 2) Frontend Setup
From project root:
```bash
cd frontend
npm install
npm run dev
```
Open the dev URL Vite prints (default `http://localhost:5173`). Requests to `/api/*` proxy to the backend on `http://localhost:5050`.

### Frontend routes
- `/` Home (shows welcome when logged in)
- `/clubs` list, `/clubs/:id` details
- `/events` list, `/events/:id/register` register (auth)
- `/add-club` create club (ADMIN)
- `/admin/create-event` create event (ADMIN)
- `/admin/users` manage users & promote to admin (ADMIN)
- `/admin/memberships` memberships report (ADMIN)
- `/admin/event-registrations` registrations report (ADMIN)
- `/me` My Activity (memberships, upcoming registered events)

## 3) Creating an Admin
- In-app (requires existing admin): `/admin/users` → Promote to Admin
- Or via Prisma (one-off):
```bash
cd backend
node -e "const {PrismaClient}=require('@prisma/client');const p=new PrismaClient();(async()=>{console.log(await p.user.update({where:{email:'admin@example.com'},data:{role:'ADMIN'}}));process.exit(0)})()"
```

## Tech Stack
- Backend: Node.js, Express, Prisma, MySQL, JWT, bcrypt, CORS, dotenv
- Frontend: Vite, React, React Router, native fetch

## Scripts
- Backend: `npm start` (in `/backend`)
- Frontend: `npm run dev` (in `/frontend`)


