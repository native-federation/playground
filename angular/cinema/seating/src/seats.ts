export const rows = ['A', 'B', 'C', 'D', 'E'] as const;
export const numbers = [1, 2, 3, 4, 5, 6, 7, 8] as const;

// Grid order is row letter, then number: filtering it keeps a hold sorted
// (see docs/architecture.md § Intents).
export const allSeats: readonly string[] = rows.flatMap((row) =>
  numbers.map((n) => `${row}${n}`),
);

const taken: Readonly<Record<string, readonly string[]>> = {
  's-101': ['B3', 'B4', 'C5', 'E1'],
  's-102': ['A5', 'C1', 'C2', 'D8'],
  's-103': ['D4', 'D5', 'E6'],
  's-104': ['B7', 'C3', 'C4', 'E2'],
};

export const takenSeats = (screeningId: string): readonly string[] => taken[screeningId] ?? [];
