import type { NavPayload } from '@tractor-store/contracts';

// A NavLink target stored in the catalog data.
export interface NavLink {
  readonly intent: string;
  readonly params?: NavPayload;
}
