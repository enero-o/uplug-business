# Uplug Business Dashboard

ERP-style business dashboard for the Uplug e-invoicing platform. Built with Vite, React, React Query, Tailwind CSS, and DataTables for interacting with the backend.

## Stack

- **Vite** + React 19 + TypeScript
- **TanStack React Query** – data fetching and caching
- **Tailwind CSS** – styling (ERP-style slate/gray theme)
- **react-data-table-component** – sortable, paginated invoice tables
- **React Router** – routing and protected routes
- **Zustand** – auth state (persisted)

## Features

- **Login** – Sign in with portal credentials; token stored for API calls
- **Business onboarding** – Multi-step flow: business details (name, TIN, email, phone), address, confirm
- **Dashboard** – Stats cards (invoices, revenue, pending, overdue) and quick actions
- **Invoices** – DataTable with filters (status, search), pagination, sortable columns
- **ERP integrations** – List of backend adapters (SAP, Odoo, Sage, Dynamics, HTTP)
- **Settings** – Business profile view
- **Layout** – Collapsible sidebar, top bar, content area (ERP-style)

## Run

```bash
npm install
npm run dev
```

Runs at **http://localhost:3001**. API requests are proxied to `http://localhost:8080` under `/api` (see `vite.config.ts`).

## Backend

Expects the same API surface as the portal:

- **Auth**: `POST /api/auth/login`, `GET /api/auth/logout`, `GET /api/user/profile`
- **Business**: `GET /api/business/profile`, `POST /api/business/onboard`, `GET /api/business/tin/verify`, `GET /api/business/dashboard`
- **Invoices**: `GET /api/invoices` (with optional `status`, `search`, `limit`, `offset`)
- **ERP**: `GET /api/erp` (list adapters), `POST /api/erp/:system/push`, `pull`, `sync`

Set `VITE_API_URL` and `VITE_API_BASE_PATH` in `.env` if the API is not on the same origin or path.

## Build

```bash
npm run build
```

Output in `dist/`.
