export const TICKET_PRICE = 12;

export const ticketsText = (count: number): string =>
  count === 1 ? '1 ticket' : `${count} tickets`;

export const totalPrice = (count: number): number => count * TICKET_PRICE;

// '2 tickets × €12'
export const priceLine = (count: number): string => `${ticketsText(count)} × €${TICKET_PRICE}`;
