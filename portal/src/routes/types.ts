import type { Account, Restaurant } from '@/types';

export interface PortalOutletContext {
  account: Account;
  restaurants: Restaurant[];
  refreshRestaurants: () => Promise<void>;
}
