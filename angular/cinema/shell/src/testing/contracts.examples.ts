import type { BookingConfirmed, NotifyMessage } from '../contracts';

export const bookingConfirmedExample: BookingConfirmed = { bookingRef: 'BR-7F3A', ticketCount: 2 };
export const seatsParamExample = 'A1,A2';
export const notifyMessageExample: NotifyMessage = { message: 'Booking BR-7F3A confirmed' };
