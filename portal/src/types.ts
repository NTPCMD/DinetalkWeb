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
  created_at?: string;
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
