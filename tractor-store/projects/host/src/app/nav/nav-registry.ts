import {
  NavContribution,
  NavPayload,
  appendQueryString,
  joinPath,
  resolveTemplate,
  splitIntentParams,
} from '@internal/events';

export interface NavBarEntry {
  readonly source: string;
  readonly intentId: string;
  readonly label: string;
  readonly path: string;
  readonly order: number;
}

interface ResolvedIntent {
  readonly basePath: string;
  readonly path: string;
}

export type NavNavigator = (url: string) => Promise<boolean>;

/**
 * Holds nav contributions from one or more MFEs and turns abstract intents
 * ( e.g. `'cart.overview'` + `{ uuid }`) into concrete URLs. Navigation itself is
 * delegated to an injected `NavNavigator` so the registry stays free of any
 * router dependency and can be unit-tested without Angular.
 */
export class NavRegistry {
  private readonly contributions = new Map<string, NavContribution>();
  private readonly intents = new Map<string, ResolvedIntent>();

  constructor(private readonly navigator: NavNavigator) {}

  register(contribution: NavContribution): void {
    this.contributions.set(contribution.source, contribution);
    for (const intent of contribution.intents) {
      this.intents.set(intent.id, {
        basePath: contribution.basePath,
        path: intent.path,
      });
    }
  }

  async navigate(id: string, payload: NavPayload = {}): Promise<boolean> {
    const url = this.resolve(id, payload);
    if (!url) {
      console.error(
        `[nav] cannot navigate to unknown or unresolvable intent "${id}"`,
      );
      return false;
    }
    return this.navigator(url);
  }

  getNavBar(): readonly NavBarEntry[] {
    const entries: NavBarEntry[] = [];
    for (const contribution of this.contributions.values()) {
      for (const entry of contribution.navBar ?? []) {
        const intent = contribution.intents.find(
          (i) => i.id === entry.intentId,
        );
        if (!intent) continue;
        entries.push({
          source: contribution.source,
          intentId: entry.intentId,
          label: entry.label,
          path: joinPath(contribution.basePath, intent.path),
          order: entry.order ?? Number.MAX_SAFE_INTEGER,
        });
      }
    }
    entries.sort((a, b) => a.order - b.order);
    return entries;
  }

  private resolve(id: string, payload: NavPayload): string | undefined {
    const intent = this.intents.get(id);
    if (!intent) return undefined;
    try {
      const path = joinPath(
        intent.basePath,
        resolveTemplate(intent.path, payload),
      );
      const consumed = new Set(splitIntentParams(intent.path));
      const queryParams: Record<string, string> = {};
      for (const [key, value] of Object.entries(payload)) {
        if (!consumed.has(key)) queryParams[key] = value;
      }
      return appendQueryString(path, queryParams);
    } catch {
      return undefined;
    }
  }
}
