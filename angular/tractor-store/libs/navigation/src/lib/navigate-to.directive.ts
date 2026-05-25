import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  NavIntentMap,
  navIntents,
  navigateTo as navigateChannel,
} from '@ng-internal/event-bus';
import { joinPath, resolveTemplate, type NavPayload } from '@ng-internal/url';

const EMPTY_PAYLOAD: NavPayload = Object.freeze({});
const EMPTY_MAP: NavIntentMap = new Map();

@Directive({
  selector: '[appNavigateTo]',
  host: {
    '[attr.href]': 'hrefAttr()',
    '(click)': 'onClick($event)',
    '[style.cursor]': '"pointer"',
    '[style.display]': 'displayStyle()',
  },
})
export class NavigateToDirective {
  readonly appNavigateTo = input.required<string>();
  readonly navPayload = input<NavPayload>(EMPTY_PAYLOAD);

  private readonly intents = signal<NavIntentMap>(EMPTY_MAP);
  private readonly isAnchor =
    inject(ElementRef<HTMLElement>).nativeElement.tagName === 'A';

  protected readonly displayStyle = computed<string | null>(() =>
    this.intents().has(this.appNavigateTo()) ? null : 'none',
  );

  private tryResolveUrl(): string | null {
    const entry = this.intents().get(this.appNavigateTo());
    if (!entry) return null;
    try {
      return joinPath(
        entry.basePath,
        resolveTemplate(entry.path, this.navPayload()),
      );
    } catch {
      return null;
    }
  }

  protected readonly hrefAttr = computed<string | null>(() =>
    this.isAnchor ? this.tryResolveUrl() : null,
  );

  constructor() {
    try {
      const unsubscribe = navIntents.on((map) => this.intents.set(map));
      inject(DestroyRef).onDestroy(unsubscribe);
    } catch {
      // Event bus not installed (e.g. isolated test environment); leave the
      // intents map empty so the directive becomes a click-only no-op.
    }
  }

  protected onClick(event: MouseEvent): void {
    if (this.isAnchor) {
      if (
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
    }
    const intentId = this.appNavigateTo();
    const entry = this.intents().get(intentId);
    if (!entry) return;
    try {
      resolveTemplate(entry.path, this.navPayload());
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err);
      console.warn(
        `[nav] [appNavigateTo]="${intentId}" cannot navigate: ${reason}`,
      );
      return;
    }
    if (this.isAnchor) {
      event.preventDefault();
    }
    navigateChannel.emit({ id: intentId, payload: this.navPayload() });
  }
}
