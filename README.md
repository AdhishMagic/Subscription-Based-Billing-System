# Subscription-Based Billing System

Full-stack billing platform built with **React 19**, **Node.js/Express**, **MongoDB**, and **Docker**.

---

## Table of Contents

- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1 — Clone the Repository](#1--clone-the-repository)
  - [2 — Environment Configuration](#2--environment-configuration)
  - [3a — Run with Docker (Recommended)](#3a--run-with-docker-recommended)
  - [3b — Run Locally (Without Docker)](#3b--run-locally-without-docker)
- [Seeding the Database](#seeding-the-database)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Default Credentials](#default-credentials)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)

---

## Architecture

```
Subscription-Based-Billing-System/
├── frontend/            React 19 + Vite (SPA)
├── backend/             Node.js + Express (REST API)
├── docker-compose.yml   Multi-service Docker setup
├── .gitignore           Root gitignore
└── package.json         Root monorepo scripts
```

### Backend — Layered Architecture

```
Controller  →  Service  →  Repository  →  Mongoose Model
```

| Layer        | Responsibility                              |
| ------------ | ------------------------------------------- |
| Controller   | Parse request, delegate to service, respond |
| Service      | Business logic, validation, orchestration   |
| Repository   | Data access, query building                 |
| Model        | Schema definition, hooks, indexes           |

---

## Prerequisites

| Tool               | Version | Required For         |
| ------------------ | ------- | -------------------- |
| **Node.js**        | ≥ 20    | Local development    |
| **npm**            | ≥ 10    | Dependency management|
| **MongoDB**        | ≥ 7     | Local dev (if no Docker) |
| **Docker**         | ≥ 24    | Containerised setup  |
| **Docker Compose** | ≥ 2     | Containerised setup  |

> You only need Docker **or** a local MongoDB — not both.

---

## Getting Started

### 1 — Clone the Repository

```bash
git clone https://github.com/<your-username>/Subscription-Based-Billing-System.git
cd Subscription-Based-Billing-System
```

### 2 — Environment Configuration

Copy the example env file and adjust values as needed:

```bash
cp backend/.env.example backend/.env
```

Open `backend/.env` and update the following:

```dotenv
# ── Database ─────────────────────────────────────────────────
# For Docker:
MONGO_URI=mongodb://mongo:27017/subbill
# For local MongoDB:
# MONGO_URI=mongodb://localhost:27017/subbill

# ── JWT (change these in production!) ────────────────────────
JWT_ACCESS_SECRET=your-access-secret-here
JWT_REFRESH_SECRET=your-refresh-secret-here

# ── CORS ─────────────────────────────────────────────────────
CORS_ORIGIN=http://localhost:3000
```

### 3a — Run with Docker (Recommended)

This starts **MongoDB**, **Backend**, and **Frontend (Nginx)** in containers:

```bash
# Build & start all services in detached mode
docker-compose up --build -d

# Seed the database with sample data
docker-compose exec backend node src/seeds/index.js

# View real-time logs
docker-compose logs -f

# Stop all services
docker-compose down
```

| Service  | URL                                |
| -------- | ---------------------------------- |
| App      | http://localhost                    |
| API      | http://localhost/api/v1             |
| MongoDB  | localhost:27017 (exposed to host)   |

> Nginx serves the React SPA on port 80 and proxies `/api` requests to the backend.

### 3b — Run Locally (Without Docker)

Make sure a local MongoDB instance is running on `mongodb://localhost:27017`.

```bash
# 1. Install root + project dependencies
npm install
npm run install:all

# 2. Update backend/.env — set MONGO_URI to localhost
#    MONGO_URI=mongodb://localhost:27017/subbill

# 3. Seed the database
npm run seed

# 4. Start both frontend & backend concurrently
npm run dev
```

| Service  | URL                                |
| -------- | ---------------------------------- |
| Frontend | http://localhost:3000               |
| Backend  | http://localhost:5000               |
| API      | http://localhost:5000/api/v1        |

> The Vite dev server proxies `/api` requests to the backend automatically.

---

## Seeding the Database

The seed script populates MongoDB with sample data: users, customers, products, plans, subscriptions, invoices, payments, discounts, taxes, and quotation templates.

```bash
# Local
npm run seed

# Docker
docker-compose exec backend node src/seeds/index.js
```

---

## Available Scripts

Run these from the **project root**:

| Script                | Description                                          |
| --------------------- | ---------------------------------------------------- |
| `npm run install:all` | Install dependencies for both backend and frontend   |
| `npm run dev`         | Start backend + frontend concurrently (dev mode)     |
| `npm run dev:backend` | Start only the backend (nodemon)                     |
| `npm run dev:frontend`| Start only the frontend (Vite)                       |
| `npm run seed`        | Seed MongoDB with sample data                        |
| `npm run build:frontend` | Build the frontend for production                 |
| `npm run docker:up`   | Build & start all Docker services                    |
| `npm run docker:down` | Stop & remove Docker containers                      |
| `npm run docker:logs` | Follow Docker container logs                         |
| `npm run docker:seed` | Run seed script inside the backend container         |

---

## API Endpoints

All routes are versioned under `/api/v1`. Most routes require a valid JWT Bearer token.

| Resource               | Methods                                      | Auth        |
| ---------------------- | -------------------------------------------- | ----------- |
| `/auth/register`       | POST                                         | Public      |
| `/auth/login`          | POST                                         | Public      |
| `/auth/logout`         | POST                                         | Authenticated |
| `/auth/refresh`        | POST                                         | Public      |
| `/auth/me`             | GET                                          | Authenticated |
| `/products`            | GET, POST, PUT, DELETE                       | Admin, Internal |
| `/plans`               | GET, POST, PUT, DELETE                       | Admin, Internal |
| `/customers`           | GET, POST, PUT, DELETE                       | Admin, Internal |
| `/subscriptions`       | GET, POST, PUT, DELETE + pause, resume, cancel, transition | All Roles |
| `/invoices`            | GET, POST, PUT, DELETE + send, mark-paid     | All Roles   |
| `/payments`            | GET, POST, PUT, DELETE + refund              | Admin, Internal |
| `/discounts`           | GET, POST, PUT, DELETE                       | Admin       |
| `/taxes`               | GET, POST, PUT, DELETE                       | Admin       |
| `/quotation-templates` | GET, POST, PUT, DELETE                       | Admin, Internal |
| `/reports`             | GET dashboard, revenue, subscriptions        | Admin, Internal |

---

## Default Credentials

Created by the seed script:

| Role     | Email                  | Password       |
| -------- | ---------------------- | -------------- |
| Admin    | admin@subbill.dev      | Admin@123!     |
| Internal | internal@subbill.dev   | Internal@123!  |
| Portal   | portal@subbill.dev     | Portal@123!    |

---

## Project Structure

```
├── docker-compose.yml
├── package.json                     # Root monorepo scripts
├── .gitignore
│
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── server.js                # Express entry point
│       ├── config/
│       │   ├── index.js             # Centralised env config
│       │   └── database.js          # Mongoose connection
│       ├── models/                  # 10 Mongoose schemas
│       ├── repositories/            # Data-access layer (BaseRepository)
│       ├── services/                # Business logic
│       ├── controllers/             # Request handlers
│       ├── validations/             # Zod schemas
│       ├── middlewares/
│       │   ├── auth.js              # JWT authenticate & authorize
│       │   ├── errorHandler.js      # Global error handler
│       │   └── validate.js          # Zod validation middleware
│       ├── routes/v1/               # Versioned REST routes
│       ├── seeds/                   # Database seed script
│       └── utils/
│           ├── AppError.js          # Custom error class
│           ├── asyncHandler.js      # Async route wrapper
│           ├── constants.js         # Enums & config constants
│           ├── logger.js            # Winston logger
│           ├── math.js              # Financial math helpers
│           └── response.js          # Standardised response helpers
│
└── frontend/
    ├── Dockerfile
    ├── .dockerignore
    ├── .gitignore
    ├── nginx.conf                   # Production Nginx config
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── app/
        ├── components/
        ├── context/
        ├── data/
        ├── hooks/
        ├── layouts/
        ├── pages/
        ├── routes/
        ├── services/
        ├── styles/
        └── utils/
```

---

## Tech Stack

| Area       | Technology                                           |
| ---------- | ---------------------------------------------------- |
| Frontend   | React 19, Vite 7, React Router 7, Axios, Recharts   |
| Backend    | Node.js 20, Express 4, Mongoose 8                    |
| Auth       | JWT (access + refresh), bcrypt, role-based middleware |
| Validation | Zod                                                  |
| Security   | Helmet, CORS, express-rate-limit                     |
| Logging    | Winston (console + file transports)                  |
| Database   | MongoDB 7                                            |
| DevOps     | Docker, Docker Compose, Nginx                        |

---

## License

This project is for educational / internal use.
