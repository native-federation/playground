import type { BookingConfirmed, SeatHold } from '../contracts';

export const bookingConfirmedExample: BookingConfirmed = { bookingRef: 'BR-7F3A', ticketCount: 2 };
export const seatHoldExample: SeatHold = { screeningId: 's-101', seats: ['A1', 'A2'] };
