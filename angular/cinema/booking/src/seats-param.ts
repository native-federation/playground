// The seats segment of booking's checkout URL: 'A1,A2' (see docs/architecture.md § Intents).
export const formatSeats = (seats: readonly string[]): string => seats.join(',');

// Deep links may carry anything: an unparsable value is an empty checkout.
export const parseSeats = (param = ''): readonly string[] => {
  const parts = param.split(',');
  return param && parts.every((seat) => /^[A-Z][0-9]+$/.test(seat)) ? parts : [];
};
