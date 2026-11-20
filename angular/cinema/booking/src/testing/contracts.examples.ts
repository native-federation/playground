// copied from shell/src/testing/contracts.examples.ts
import type { BookingConfirmed, SeatHold } from '../contracts';

export const bookingConfirmedExample: BookingConfirmed = { bookingRef: 'BR-7F3A', ticketCount: 2 };
export const seatHoldExample: SeatHold = { screeningId: 's-101', seats: ['A1', 'A2'] };

// Booking's own: the seats segment of its checkout URL, built by the summary and read by checkout.
export const seatsParamExample = 'A1,A2';
