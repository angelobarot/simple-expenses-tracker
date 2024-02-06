## Description

Simple Expenses Tracker

## Requirements
```bash
- Docker
- Docker Compose
- Node v20
- ts-node
```

Create `database` folder in root

## Running the app

```bash
# development
docker-compose up
```

## Creating database tables

Make sure postgresql service is running
```bash
docker-compose ps
```

- To connect to the database, go to `backend/src/config/db.ts`.
- Update the **DATABASE_URL** default value from `postgres://tracker:tracker@postgres:5432/tracker` to `postgres://tracker:tracker@localhost:5432/tracker`.
  - What we just did is we use `localhost` instead of the service named `postgres`. We also need to put `postgres` back so the application will be able to connect to the database
- Go to `backend/src/scripts/db` and run the following command in order:
```bash
# backend/src/scripts/db/create-users-table.ts
ts-node create-users-table.ts

# backend/src/scripts/db/create-expenses-table.ts
ts-node create-expenses-table.ts
```

## Seeding the database

Make sure postgresql service is running
```bash
docker-compose ps
```

- To seed the database, go to `backend/src/config/db.ts`.
- Update the DATABASE_URL default value from `postgres://tracker:tracker@postgres:5432/tracker` to `postgres://tracker:tracker@localhost:5432/tracker`.
  - What we just did is we use `localhost` instead of the service named `postgres`
- Go to `backend/src/scripts/seed` and run the following command in order:
```bash
# backend/src/scripts/seed/seed-users.ts
ts-node seed-users.ts

# backend/src/scripts/seed/seed-expenses.ts
ts-node seed-expenses.ts
```

## Connect NestJS application to PostgreSQL Service
Make sure the **DATABASE_URL** you're using is the following:
```bash
# backend/src/config/db.ts
postgres://tracker:tracker@postgres:5432/tracker`
```

## Ports
> Backend will run in PORT 3001

> Frontend will run in PORT 3000

## Stay in touch

- Author - [John Angelo Barot](https://angelobarot.com)
