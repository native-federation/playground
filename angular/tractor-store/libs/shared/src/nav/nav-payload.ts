// String-only bag that fills path-template params; leftovers become query params.
export type NavPayload = Readonly<Record<string, string>>;
