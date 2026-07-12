/*
# HN Art AI — Chat History & Contact Submissions

## Overview
Creates tables for persisting AI chat history and landing-page contact form
submissions. Single-tenant app (no sign-in), so policies allow anon + authenticated.

## New Tables

### chat_history
Stores AI tool conversation messages.
- id (uuid PK)
- tool_id (text) — which AI tool generated this (e.g. "product-description")
- role (text) — "user" or "assistant"
- content (text) — message content
- created_at (timestamptz)

### contact_submissions
Stores contact form submissions from the landing page.
- id (uuid PK)
- name, email, message (text)
- created_at (timestamptz)

## Security
- RLS enabled on both tables.
- anon + authenticated CRUD on chat_history.
- anon + authenticated INSERT/SELECT on contact_submissions.
*/

CREATE TABLE IF NOT EXISTS chat_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id text NOT NULL DEFAULT 'general',
  role text NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_chat" ON chat_history;
CREATE POLICY "anon_select_chat" ON chat_history FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_chat" ON chat_history;
CREATE POLICY "anon_insert_chat" ON chat_history FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_chat" ON chat_history;
CREATE POLICY "anon_delete_chat" ON chat_history FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_chat_tool ON chat_history(tool_id);
CREATE INDEX IF NOT EXISTS idx_chat_created ON chat_history(created_at);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact" ON contact_submissions;
CREATE POLICY "anon_insert_contact" ON contact_submissions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_contact" ON contact_submissions;
CREATE POLICY "anon_select_contact" ON contact_submissions FOR SELECT
  TO anon, authenticated USING (true);