-- Run this on your Neon database named master_db.
CREATE TABLE IF NOT EXISTS organizations (
  id SERIAL PRIMARY KEY,
  org_gmail VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS employees (
  serialno SERIAL PRIMARY KEY,
  organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  ename VARCHAR(120) NOT NULL,
  sal NUMERIC(12, 2) NOT NULL CHECK (sal >= 0),
  loc VARCHAR(120) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_employees_organization_id ON employees(organization_id);
