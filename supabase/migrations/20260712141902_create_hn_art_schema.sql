/*
# HN Art AI — Smart Business Assistant Schema

## Overview
Creates the core data model for HN Art, an art gallery / art business management
platform with an AI-style smart insights engine. This is a single-tenant app with
no sign-in screen, so all policies are scoped to `anon, authenticated`.

## New Tables

### artworks
Art inventory pieces.
- id (uuid PK)
- title, artist, category, medium, dimensions, year
- price (asking price), cost (acquisition cost)
- status: Available | Sold | Reserved | On Loan
- image_url, description
- created_at

### clients
Gallery clients / collectors.
- id (uuid PK)
- name, email, phone, company, location
- notes
- created_at

### sales
Transaction records linking artworks to clients.
- id (uuid PK)
- artwork_id (FK -> artworks, CASCADE)
- client_id (FK -> clients, SET NULL)
- sale_price, sale_date
- commission_rate (percentage 0-100)
- payment_method
- status: Completed | Pending | Refunded
- notes
- created_at

### appointments
Studio visits, viewings, consultations.
- id (uuid PK)
- client_name, title, date, time
- type: Studio Visit | Viewing | Consultation | Delivery
- status: Scheduled | Completed | Cancelled
- notes
- created_at

## Security
- RLS enabled on all four tables.
- Single-tenant: `TO anon, authenticated` CRUD on every table (data is intentionally shared).
- 4 separate policies per table (SELECT / INSERT / UPDATE / DELETE).

## Notes
1. Seed data inserted after table creation: ~24 artworks, ~12 clients, ~18 sales, ~8 appointments.
2. All numeric prices use numeric(12,2).
*/

-- ============================================================
-- ARTWORKS
-- ============================================================
CREATE TABLE IF NOT EXISTS artworks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  artist text NOT NULL,
  category text NOT NULL DEFAULT 'Painting',
  medium text,
  dimensions text,
  year int,
  price numeric(12,2) NOT NULL DEFAULT 0,
  cost numeric(12,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'Available',
  image_url text,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_artworks" ON artworks;
CREATE POLICY "anon_select_artworks" ON artworks FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_artworks" ON artworks;
CREATE POLICY "anon_insert_artworks" ON artworks FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_artworks" ON artworks;
CREATE POLICY "anon_update_artworks" ON artworks FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_artworks" ON artworks;
CREATE POLICY "anon_delete_artworks" ON artworks FOR DELETE
  TO anon, authenticated USING (true);

-- ============================================================
-- CLIENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  company text,
  location text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_clients" ON clients;
CREATE POLICY "anon_select_clients" ON clients FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_clients" ON clients;
CREATE POLICY "anon_insert_clients" ON clients FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_clients" ON clients;
CREATE POLICY "anon_update_clients" ON clients FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_clients" ON clients;
CREATE POLICY "anon_delete_clients" ON clients FOR DELETE
  TO anon, authenticated USING (true);

-- ============================================================
-- SALES
-- ============================================================
CREATE TABLE IF NOT EXISTS sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artwork_id uuid REFERENCES artworks(id) ON DELETE CASCADE,
  client_id uuid REFERENCES clients(id) ON DELETE SET NULL,
  sale_price numeric(12,2) NOT NULL DEFAULT 0,
  sale_date date NOT NULL DEFAULT CURRENT_DATE,
  commission_rate numeric(5,2) NOT NULL DEFAULT 0,
  payment_method text DEFAULT 'Bank Transfer',
  status text NOT NULL DEFAULT 'Completed',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE sales ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_sales" ON sales;
CREATE POLICY "anon_select_sales" ON sales FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_sales" ON sales;
CREATE POLICY "anon_insert_sales" ON sales FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_sales" ON sales;
CREATE POLICY "anon_update_sales" ON sales FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_sales" ON sales;
CREATE POLICY "anon_delete_sales" ON sales FOR DELETE
  TO anon, authenticated USING (true);

-- ============================================================
-- APPOINTMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  title text NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  time text,
  type text NOT NULL DEFAULT 'Consultation',
  status text NOT NULL DEFAULT 'Scheduled',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_appointments" ON appointments;
CREATE POLICY "anon_select_appointments" ON appointments FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_appointments" ON appointments;
CREATE POLICY "anon_insert_appointments" ON appointments FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_appointments" ON appointments;
CREATE POLICY "anon_update_appointments" ON appointments FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_appointments" ON appointments;
CREATE POLICY "anon_delete_appointments" ON appointments FOR DELETE
  TO anon, authenticated USING (true);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_artworks_status ON artworks(status);
CREATE INDEX IF NOT EXISTS idx_artworks_category ON artworks(category);
CREATE INDEX IF NOT EXISTS idx_sales_date ON sales(sale_date);
CREATE INDEX IF NOT EXISTS idx_sales_artwork ON sales(artwork_id);
CREATE INDEX IF NOT EXISTS idx_sales_client ON sales(client_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);