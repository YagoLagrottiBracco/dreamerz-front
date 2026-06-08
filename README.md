![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-22c55e)

# DreamerZ — Frontend

DreamerZ is a personal goal management platform that structures long-term aspirations into executable plans. It organizes user objectives in a three-tier hierarchy — **Dreams → Goals → Actions** — where each level carries a difficulty rating and, at the action level, a hard deadline. The application communicates with a dedicated REST API over JWT-authenticated HTTP, and renders progress analytics through an embedded charting dashboard.

> Backend repository: [dreamerz-api](https://github.com/YagoLagrottiBracco/dreamerz-api)

---

## Overview

Users register an account, authenticate, and then manage their aspirations through a Kanban-style board. A **Dream** is a high-level ambition. Each dream contains one or more **Goals** — concrete milestones required to reach the dream. Each goal contains one or more **Actions** — specific, time-boxed tasks. All three levels expose difficulty labels (`easy`, `medium`, `hard`) rendered with color-coded visual cues, giving an immediate sense of workload distribution. A dashboard view aggregates progress data across charts (bar, area, line, heatmap, radar).

---

## Architecture

```
src/
├── assets/
├── components/
│   ├── layouts/         # Shell — TopBar, BottomBar (mounted outside route tree)
│   ├── pages/
│   │   ├── dream/       # Dream board, goal/action CRUD, CSS overrides
│   │   └── user/        # Login, Register
│   ├── Forms.tsx        # Config-driven form renderer (Options[] schema)
│   ├── Modals.tsx       # Generic modal wrapper delegating to Forms
│   └── Toasts.tsx       # Toast renderer consuming ToastContext
├── context/
│   ├── ToastContext.tsx  # Global notification bus
│   └── UserContext.tsx   # Auth state provider
├── hooks/
│   ├── toast.ts          # Imperative toast API (useToast)
│   └── useAuth.ts        # JWT lifecycle — login, register, logout
└── utils/
    └── api.ts            # Axios instance with base URL
```

### Key design decisions

**Config-driven forms.** `Forms.tsx` accepts an `Options[]` descriptor array and renders the appropriate input type (`text`, `textarea`, `select`, `date`) without duplicating markup. The same component handles both create and update flows, controlled by the presence of an `idUpdate` identifier passed down from the parent modal. This keeps form logic in one place and makes adding new resource types a schema change rather than a component change.

**Context + custom hooks over external state libraries.** Auth state is encapsulated in `useAuth`, which owns the JWT lifecycle (read/write to `localStorage`, setting Axios default headers). A `UserContext` wraps the app and exposes a typed surface (`authenticated`, `login`, `register`, `logout`) to consumers. The toast system follows the same pattern: a `ToastContext` holds the queue, and `useToast` gives components an imperative `push` API. This avoids Redux/Zustand overhead for a domain whose global state surface is small.

**Feature-based directory structure.** Components are co-located with their domain (`pages/dream/`, `pages/user/`), not grouped by technical type. This means all files relevant to the dream board — component, CSS overrides, TypeScript interfaces — live together and can be reasoned about in isolation.

**TypeScript strict mode.** Domain entities (`Dream`, `Goal`, `Action`) are declared as interfaces and flow through props, state, and API responses without `any`. The `AxiosRequestConfigWithAuth` extension type documents the authentication contract at the call site rather than relying on implicit header mutation.

**Docker with a non-root runtime user.** The `Dockerfile` creates a dedicated `front` OS group and user, switches to it before installing dependencies and running the process. This follows the principle of least privilege and prevents container breakout escalation if the Node process is compromised.

**Vite over CRA.** Vite's native ESM dev server eliminates the full-bundle rebuild on every change. The TypeScript compilation is kept separate (`tsc && vite build`) so type errors fail the build before Vite processes output — preserving fast iteration locally while enforcing correctness in CI.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 18 |
| Language | TypeScript 5 |
| Build tool | Vite 5 |
| Component library | React Bootstrap 5 |
| HTTP client | Axios |
| Routing | React Router DOM v6 |
| Charts | ApexCharts + react-apexcharts |
| Icons | Font Awesome (SVG core) |
| Date handling | Moment.js |
| Testing | Vitest |
| Containerization | Docker (node:18-alpine) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- The [dreamerz-api](https://github.com/YagoLagrottiBracco/dreamerz-api) backend running locally or deployed

### Installation

```bash
git clone https://github.com/YagoLagrottiBracco/dreamerz-front.git
cd dreamerz-front
npm install
```

### Development server

```bash
npm start
# Starts Vite on http://localhost:3000
```

### Production build

```bash
npm run build
# Outputs to dist/
```

### Docker

```bash
docker build -t dreamerz-front .
docker run -p 3000:3000 \
  -e VITE_APP_API_URL=http://your-api-host:3001 \
  dreamerz-front
```

### Linting

```bash
npm run lint
```

---

## Environment Variables

Create a `.env` file at the project root:

| Variable | Description | Example |
|---|---|---|
| `VITE_APP_API_URL` | Base URL of the dreamerz REST API | `http://localhost:3001` |

Vite exposes only variables prefixed with `VITE_` to client bundles. Never place secrets in this file.

---

## API Endpoints

The following REST endpoints are consumed by this client. All routes under `/dashboard` require a `Bearer` token in the `Authorization` header.

### Auth

| Method | Path | Description |
|---|---|---|
| `POST` | `/register` | Create a new user account. Returns `{ name, token }`. |
| `POST` | `/login` | Authenticate with email + password. Returns `{ name, token }`. |

### Dreams

| Method | Path | Description |
|---|---|---|
| `GET` | `/dashboard/dreams` | List all dreams owned by the authenticated user. |
| `POST` | `/dashboard/dreams` | Create a dream (`name`, `description`). |
| `DELETE` | `/dashboard/dreams/:id` | Delete a dream and its nested goals and actions. |

### Goals

| Method | Path | Description |
|---|---|---|
| `POST` | `/dashboard/goals` | Create a goal under a dream (`name`, `description`, `difficulty`). |
| `PUT` | `/dashboard/goals/:id` | Update goal fields. |
| `DELETE` | `/dashboard/goals/:id` | Delete a goal and its nested actions. |

### Actions

| Method | Path | Description |
|---|---|---|
| `POST` | `/dashboard/actions` | Create an action under a goal (`name`, `description`, `difficulty`, `doneIn`). |
| `PUT` | `/dashboard/actions/:id` | Update action fields including deadline. |
| `DELETE` | `/dashboard/actions/:id` | Delete an action. |

---

## Design Decisions

**Why a three-tier hierarchy instead of a flat task list.** Most goal-tracking tools conflate high-level aspirations with actionable tasks, which makes it hard to track systemic progress. The Dream → Goal → Action model enforces a planning discipline: you cannot add a task without anchoring it to a goal, and you cannot add a goal without anchoring it to a larger aspiration. This also allows difficulty to be rated independently at each level, giving a richer view of the overall effort distribution.

**Why JWT in `localStorage` instead of `httpOnly` cookies.** For this deployment model — a decoupled SPA calling a separate API origin — `httpOnly` cookies require careful CORS and `SameSite` configuration that shifts complexity to the backend and ops layer. `localStorage` is appropriate here given the application's threat model. A production hardening step would be to migrate to short-lived access tokens + refresh tokens in `httpOnly` cookies.

**Why `moment.js` instead of a lighter date library.** The project predates `date-fns` and `Temporal` adoption. A migration to `date-fns` or native `Intl.DateTimeFormat` would reduce bundle size and is a known improvement candidate.

**Why React Bootstrap instead of Tailwind or a headless library.** Bootstrap's utility classes and pre-built accessible components allow rapid iteration on layout and form patterns without a design system definition phase. The cost is a larger CSS footprint and opinionated visual defaults. For a product that prioritizes shipping speed over pixel-perfect custom design, the trade-off is intentional.

---

## License

MIT © 2024 [Yago Lagrotti Bracco](https://github.com/YagoLagrottiBracco)
