-- Run this in Supabase SQL Editor

CREATE TABLE queue_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "licensePlate" TEXT NOT NULL,
    "licensePlateProvince" TEXT,
    "userDetails" TEXT,
    lane TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('waiting', 'active', 'completed', 'cancelled')),
    "joinedAt" TIMESTAMPTZ DEFAULT NOW(),
    "startedAt" TIMESTAMPTZ,
    "completedAt" TIMESTAMPTZ,
    "estimatedWaitTime" INTEGER
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Optional: Enable Row Level Security (RLS) if you want to restrict access
-- ALTER TABLE queue_items ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Enable all access for now" ON queue_items FOR ALL USING (true);
