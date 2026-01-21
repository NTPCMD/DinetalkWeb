# DineTalk Client Portal - Database Schema

This document describes the expected Supabase database schema for the DineTalk client portal.

## Tables

### `restaurants`
Stores restaurant information.

```sql
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone_number TEXT,
  call_recording_enabled BOOLEAN DEFAULT false,
  call_transcripts_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### `profiles`
User profiles (created by Supabase Auth).

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### `restaurant_members`
Links users to restaurants with role-based access.

```sql
CREATE TABLE restaurant_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),
  role TEXT DEFAULT 'member',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, restaurant_id)
);
```

### `calls`
Stores call records.

```sql
CREATE TABLE calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),
  caller TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('ai_handled', 'transferred', 'missed')),
  topic TEXT,
  duration INTEGER DEFAULT 0,
  is_after_hours BOOLEAN DEFAULT false,
  outcome TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### `call_transcripts`
Stores call transcripts (if enabled).

```sql
CREATE TABLE call_transcripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id UUID NOT NULL REFERENCES calls(id),
  transcript_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### `call_recordings`
Stores references to call recordings in Supabase Storage.

```sql
CREATE TABLE call_recordings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id UUID NOT NULL REFERENCES calls(id),
  storage_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### `ai_summaries`
Stores AI-generated call summaries.

```sql
CREATE TABLE ai_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id UUID NOT NULL REFERENCES calls(id),
  summary TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### `call_topics`
Optional: tracks common call topics for analytics.

```sql
CREATE TABLE call_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),
  topic TEXT NOT NULL,
  count INTEGER DEFAULT 1,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Row Level Security (RLS)

Enable RLS on all tables and create policies:

### Example RLS Policy for `calls`

```sql
-- Enable RLS
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;

-- Users can only see calls from restaurants they have access to
CREATE POLICY "Users can view calls from their restaurants"
  ON calls
  FOR SELECT
  USING (
    restaurant_id IN (
      SELECT restaurant_id 
      FROM restaurant_members 
      WHERE user_id = auth.uid()
    )
  );
```

### Apply similar policies to all tables based on restaurant access

## Storage Bucket

Create a private storage bucket for call recordings:

```sql
-- This is handled automatically by the server on startup
-- Bucket name: make-7234a240-call-recordings
-- Public: false
```

## Sample Data (for testing)

```sql
-- Create a test restaurant
INSERT INTO restaurants (id, name, call_recording_enabled, call_transcripts_enabled)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'The Golden Spoon', true, true),
  ('550e8400-e29b-41d4-a716-446655440001', 'Bistro Moderne', false, true);

-- Link a user to restaurants (after creating user via signup)
-- Replace USER_UUID with actual user ID from auth.users
INSERT INTO restaurant_members (user_id, restaurant_id, role)
VALUES 
  ('USER_UUID', '550e8400-e29b-41d4-a716-446655440000', 'admin'),
  ('USER_UUID', '550e8400-e29b-41d4-a716-446655440001', 'member');

-- Create sample calls
INSERT INTO calls (restaurant_id, caller, status, topic, duration, is_after_hours, outcome)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', '+1-555-0101', 'ai_handled', 'Reservation for 4 people', 180, false, 'Booking Confirmed'),
  ('550e8400-e29b-41d4-a716-446655440000', '+1-555-0102', 'transferred', 'Special dietary requirements', 240, false, 'Info Request'),
  ('550e8400-e29b-41d4-a716-446655440000', '+1-555-0103', 'ai_handled', 'Check opening hours', 45, false, 'Info Request'),
  ('550e8400-e29b-41d4-a716-446655440000', '+1-555-0104', 'missed', 'Callback request', 0, true, 'Missed Call');

-- Create AI summaries for calls
INSERT INTO ai_summaries (call_id, summary)
SELECT id, 'Customer called to make a reservation for 4 people on Friday evening. Confirmed booking at 7:30 PM.'
FROM calls WHERE caller = '+1-555-0101';
```

## Notes

- All timestamps use `TIMESTAMP WITH TIME ZONE` for proper timezone handling
- UUIDs are used as primary keys for better distribution and security
- The `status` field in calls is constrained to specific values
- The portal is read-only - no plan, billing, or configuration modifications
- Add-on features (recording, transcripts) are controlled via boolean flags on the restaurant table
- The server manages access control through RLS and auth middleware
