# User Management Dashboard

Hashed System frontend assignment — login, dashboard stats, user table with search/pagination, and add/edit/view modals. Built on [reqres.in](https://reqres.in).

**Live URL:** [https://hashed-task.vercel.app](https://hashed-task.vercel.app)

**Repo:** [https://github.com/usama216/hashed-task](https://github.com/usama216/hashed-task)

---

## Setup instructions

**Requirements:** Node.js 18+, npm

```bash
npm install
cp .env.local.example .env.local
```

Add your ReqRes API key to `.env.local`:

```
REQRES_API_KEY=your_key_here
```

Get a free key at [reqres.in](https://reqres.in) (signup → dashboard).

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Test credentials (from assignment):**
- Email: `eve.holt@reqres.in`
- Password: `cityslicka`

**Production build:**
```bash
npm run build
npm start
```

---

## Tech stack

| Tool | Use |
|------|-----|
| Next.js 16 (App Router) | Routing, API routes, middleware |
| TypeScript | Types across the app |
| Tailwind CSS | Styling |
| RTK Query | API calls, caching, mutations |
| Zustand | Local user meta (role/status), session email |
| React Hook Form + Zod | Form validation |
| Axios | Server-side ReqRes calls (API route proxy) |
| Sonner | Toast notifications |

---

## Architectural decisions

**Auth flow**
Login goes through `/api/auth/login` → ReqRes `POST /login`. The token is stored in an `httpOnly` cookie so client JS can't read it. `middleware.ts` protects `/dashboard` routes.

**Why API routes as proxy**
ReqRes now needs `x-api-key` on every request. The key lives in `REQRES_API_KEY` on the server only. Browser calls `/api/*`, server attaches the key and forwards to ReqRes.

**State split**
- RTK Query → remote data (users list, single user, create/update)
- Zustand → things ReqRes doesn't give back (role, status, locally added users)

**Pagination & search**
ReqRes only has 12 users (2 pages). I fetch both pages once, then paginate and search on the client. Keeps search working across all users without extra API calls.

**Server vs client components**
Dashboard layout and pages are server components where possible. Anything interactive (forms, table, modals) is `"use client"`.

---

## Assumptions

1. ReqRes `POST /users` and `PUT /users/:id` are mock — they return success but don't persist. New/edited users are merged into local Zustand state.
2. `role` and `status` are not in the ReqRes user object, so defaults are applied (even id = active, odd = inactive) unless the user sets them in add/edit.
3. "New users" stat is mocked: users with `id > 10` or anyone added during the current session (has `createdAt`).
4. Client-side pagination (6 per page) matches ReqRes `per_page` default.

---

## Challenges faced

1. **ReqRes API key** — started getting `missing_api_key` errors. Fixed by proxying all calls through Next.js API routes with server-side key.
2. **Create user not in list** — after POST, the user doesn't appear in GET `/users`. Solved by keeping added users in Zustand and merging with API data.
3. **Search with server pagination** — searching only the current page misses results. Fetching all pages upfront fixed this for the small dataset.

---

## Deployment (Vercel)

1. Push code to GitHub/GitLab
2. Import project on [vercel.com](https://vercel.com)
3. Add environment variable: `REQRES_API_KEY`
4. Deploy and paste the live URL above

---

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm start` | Run production |
| `npm run lint` | ESLint |
