import type { CallLog } from '@/types';

const maskPhoneNumber = (value?: string | null): string | null => {
  if (!value) return null;
  const digits = value.replace(/\D/g, '');
  if (!digits) return null;
  const last4 = digits.slice(-4);
  return `***${last4}`;
};

export const getCallerDisplayName = (call: CallLog): string => {
  if (call.customer_name) return call.customer_name;
  if (call.caller_name) return call.caller_name;

  const number = call.caller_number ?? call.from_number ?? call.customer_phone;
  const masked = maskPhoneNumber(number);

  return masked ?? 'Unknown caller';
};
