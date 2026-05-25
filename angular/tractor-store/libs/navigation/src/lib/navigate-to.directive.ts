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
} from '@internal/event-bus';
import { joinPath, resolveTemplate, type NavPayload } from '@internal/url';

const EMPTY_PAYLOAD: NavPayload = Object.freeze({});
const EMPTY_MAP: NavIntentMap = new Map();

@Directive({
  selector: '[appNavigateTo]',
  host: {
    '[attr.href]': 'hrefAttr()',
    '(click)': 'onClick($event)',
    '[style.cursor]': '"pointer"',
  },
})
export class NavigateToDirective {
  readonly appNavigateTo = input.required<string>();
  readonly navPayload = input<NavPayload>(EMPTY_PAYLOAD);

  private readonly intents = signal<NavIntentMap>(EMPTY_MAP);
  private readonly isAnchor =
    inject(ElementRef<HTMLElement>).nativeElement.tagName === 'A';

  private readonly resolvedUrl = computed<string | null>(() => {
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
  });

  protected readonly hrefAttr = computed<string | null>(() =>
    this.isAnchor ? this.resolvedUrl() : null,
  );

  constructor() {
    const unsubscribe = navIntents.on((map) => this.intents.set(map));
    inject(DestroyRef).onDestroy(unsubscribe);
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
    if (this.resolvedUrl() === null) {
      return;
    }
    if (this.isAnchor) {
      event.preventDefault();
    }
    navigateChannel.emit({
      id: this.appNavigateTo(),
      payload: this.navPayload(),
    });
  }
}
