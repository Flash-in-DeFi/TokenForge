# TokenForge Africa

A no-code token issuance platform on the Stellar blockchain for cooperatives, startups, and NGOs across Africa.

## Overview

TokenForge Africa lets organizations create and manage Stellar-based tokens without writing code — covering the full lifecycle from issuance to compliance, vesting, and distribution.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Zustand |
| Backend | NestJS, TypeORM, PostgreSQL, Redis (Bull queues) |
| Blockchain | Stellar (via `@stellar/stellar-sdk`) |
| CI | GitHub Actions |

## Project Structure

```
TokenForge/
├── backend/       # NestJS REST API
└── frontend/      # Next.js app
```

## Prerequisites

- Node.js 20+
- PostgreSQL
- Redis

## Getting Started

### Backend

```bash
cd backend
cp .env.example .env   # fill in your values
npm install
npm run migration:run
npm run start:dev
```

Runs on `http://localhost:3001`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:3000`

## Environment Variables (Backend)

| Variable | Description |
|---|---|
| `DB_HOST` | PostgreSQL host |
| `DB_PORT` | PostgreSQL port (default: 5432) |
| `DB_USERNAME` | Database user |
| `DB_PASSWORD` | Database password |
| `DB_NAME` | Database name |
| `REDIS_HOST` | Redis host |
| `REDIS_PORT` | Redis port (default: 6379) |
| `STELLAR_NETWORK` | `testnet` or `mainnet` |
| `STELLAR_HORIZON_URL` | Horizon API URL |
| `JWT_SECRET` | Secret for JWT signing |
| `ENCRYPTION_KEY` | 32-byte hex key for encrypting issuer secrets |

See `backend/.env.example` for a full template.

## CI

GitHub Actions runs on every push and pull request to `main`:

- **Backend**: install → test
- **Frontend**: install → lint → test → build

## Scripts

### Backend
| Command | Description |
|---|---|
| `npm run start:dev` | Start with hot reload |
| `npm run build` | Compile to `dist/` |
| `npm run migration:run` | Run pending migrations |
| `npm run migration:revert` | Revert last migration |
| `npm test` | Run tests |

### Frontend
| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |
