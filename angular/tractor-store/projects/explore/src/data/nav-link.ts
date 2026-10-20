import type { NavPayload } from '@tractor-store/contracts';

// A [navIntent] target stored in the catalog data.
export interface NavLink {
  readonly intent: string;
  readonly params?: NavPayload;
}
