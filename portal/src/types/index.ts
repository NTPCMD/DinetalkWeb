export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
};

export type Account = {
  id: string;
  owner_user_id: string;
  name: string;
  created_at: string;
};

export type Restaurant = {
  id: string;
  account_id: string;
  name: string;
  timezone: string;
  address: string | null;
  public_phone: string | null;
  transfer_phone: string | null;
  retell_agent_id: string | null;
  retell_phone_number: string | null;
  calls_portal_enabled: boolean;
  recordings_enabled: boolean;
  transcripts_enabled: boolean;
  created_at: string;
  updated_at: string;
};

export type RestaurantHour = {
  restaurant_id: string;
  day_of_week: number;
  open_time: string | null;
  close_time: string | null;
  closed: boolean;
};

export type BookingRules = {
  restaurant_id: string;
  default_duration_minutes: number;
  max_party_size: number;
  min_notice_minutes: number;
  buffer_minutes: number;
  max_days_ahead: number;
  updated_at: string;
};

export type CallLog = {
  id?: string;
  restaurant_id: string;
  retell_call_id: string;
  from_number: string | null;
  to_number: string | null;
  started_at: string | null;
  ended_at: string | null;
  duration_seconds: number | null;
  status: string | null;
  recording_url: string | null;
  transcript: string | null;
  raw_payload?: unknown;
  created_at: string;
};
