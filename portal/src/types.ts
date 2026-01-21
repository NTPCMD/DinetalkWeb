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
  customer_phone?: string;
  status?: string;
  recording_url?: string | null;
  transcript?: string | null;
  created_at?: string;
  duration_seconds?: number | null;
  metadata?: Record<string, unknown> | null;
}
