export const TICKET_PRICE = 12;

export const ticketsText = (count: number): string =>
  count === 1 ? '1 ticket' : `${count} tickets`;
