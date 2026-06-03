# Master DB Organization Login and Employee CRUD

A simple Node.js + Express application that uses a Neon PostgreSQL database named `master_db`.

## Features

- Organization registration with Gmail and password.
- Credentials are stored in the `organizations` table with a hashed password.
- Login succeeds only with the same Gmail and password.
- Logged-in organizations can create, read, update, and delete employee records.
- Employee table fields are `serialno`, `ename`, `sal`, and `loc`.

## Neon setup

The requested command was attempted:

```bash
npx neonctl@latest init --agent code
```

It could not finish in this environment because the Neon CLI returned `ERROR: fetch failed`. To finish setup locally:

1. Run `npx neonctl@latest init --agent code` and login to Neon if prompted.
2. Create or select a Neon database named `master_db`.
3. Copy `.env.example` to `.env`.
4. Put the Neon connection string in `DATABASE_URL` and make sure the URL points to `/master_db`.

## Run locally

```bash
npm install
cp .env.example .env
npm start
```

Open <http://localhost:3000>, create an organization account, then login with the same credentials.

## Database schema

The app creates the required tables automatically on startup. You can also run `db/schema.sql` manually in Neon SQL Editor.
