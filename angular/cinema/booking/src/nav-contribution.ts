import type { NavContribution } from './contracts';

export const navContribution: NavContribution = {
  basePath: 'booking',
  intents: [{ id: 'checkout', path: '{screeningId}/{seats}', element: 'mfe-booking-checkout' }],
  fragments: [{ element: 'mfe-booking-start' }, { element: 'mfe-booking-summary' }],
};
