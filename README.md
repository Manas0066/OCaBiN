# OCaBiN Frontend

React + TypeScript + Tailwind frontend for the OCaBiN (Office Cabin Booking Network)
Spring Boot backend at https://github.com/Manas0066/OCaBiN (branch: `backend`).

## What was fixed vs. the original AI Studio export

- **Dashboard 403 for Employees**: the backend restricts `/api/dashboard/**` to
  `ADMIN`/`MANAGER`. The app used to call those endpoints for every role and then
  gated the *entire* tab area behind having stats loaded — so Employees saw a
  blank screen after logging in. Now dashboard data is only fetched for
  Admin/Manager, the Analytics tab is hidden for Employees, and Employees land
  on the "Book a Cabin" tab instead.
- **Cabin update 400/500 errors**: the backend's `PUT /api/cabins/{id}` requires
  `status` and `active` in the request body (`@NotNull`), but the form only sent
  name/floor/capacity/location/amenities. Added a status field to the edit modal
  and now the update call sends the full payload.
- **CORS**: rather than touching the backend, `vite.config.ts` proxies `/api/*`
  to `http://localhost:8080` during development, so the browser never makes a
  cross-origin request. `api.ts` defaults to a relative URL for this reason —
  only fill in a URL in Settings if your backend is deployed elsewhere.
- Removed unused `@google/genai`/Express/dotenv leftovers from the AI Studio
  scaffold (no Gemini calls exist in this app).

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000, proxies /api to :8080
```

Start your Spring Boot backend separately on port 8080 (`mvn spring-boot:run`
from the backend repo). Make sure a MySQL instance matching
`application.properties` (`cabin_management` DB, `root`/`root`) is running.

### Demo mode vs Live mode

The Navbar's status pill / Settings modal toggles between:

- **Demo Sandbox** — everything runs against `localStorage` mock data (no
  backend needed). Good for a quick look at the UI.
- **Live API Server** — talks to your real Spring Boot backend through the dev
  proxy. Use the "Sandbox Quick Logins" only work in Demo mode; in Live mode,
  register a user via the Create Account form (defaults to `EMPLOYEE` role) or
  seed an ADMIN/MANAGER directly in the database, since the backend doesn't
  expose a way to self-promote roles.

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build
```
