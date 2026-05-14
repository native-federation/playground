export type NavPayload = Readonly<Record<string, string>>;

/** A request to navigate to an intent — what a `[navigateTo]` author writes. */
export interface NavTarget {
  readonly intent: string;
  readonly params?: NavPayload;
}

export interface NavIntent {
  readonly id: string;
  readonly element?: string;
  readonly path: string;
}

export interface NavBarContribution {
  readonly intentId: string;
  readonly label: string;
  readonly order?: number;
}

export interface NavContribution {
  readonly source: string;
  readonly basePath: string;
  readonly element?: string;
  readonly intents: readonly NavIntent[];
  readonly navBar?: readonly NavBarContribution[];
}
