export interface Account {
  id: string;
  owner_user_id: string;
  created_at?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  account_id?: string;
  calls_portal_enabled?: boolean;
  phone_number?: string | null;
  transfer_phone?: string | null;
  address?: string | null;
  timezone?: string | null;
  created_at?: string;
  features?: Record<string, unknown> | null;
}

export interface CallLog {
  id: string;
  restaurant_id: string;
  customer_name?: string;
  caller_name?: string;
  caller_number?: string;
  from_number?: string | null;
  to_number?: string | null;
  retell_call_id?: string | null;
  status?: string;
  recording_url?: string | null;
  transcript?: string | null;
  started_at?: string | null;
  ended_at?: string | null;
  created_at?: string | null;
  duration_seconds?: number | null;
  raw_payload?: Record<string, unknown> | null;
}
