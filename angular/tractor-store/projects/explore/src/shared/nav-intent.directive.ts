import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import type { Events, NavPayload, NavResolver } from '@tractor-store/contracts';

// A [navIntent] target stored in the catalog data.
export interface NavLink {
  readonly intent: string;
  readonly params?: NavPayload;
}

// Links to a page by intent id, e.g. 'decide.product': the host resolves the href and navigates.
@Directive({
  selector: '[navIntent]',
  host: {
    '[attr.href]': 'isAnchor ? url() : null',
    '[attr.aria-disabled]': 'url() === null ? "true" : null',
    '(click)': 'navigate($event)',
  },
})
export class NavIntentDirective {
  readonly navIntent = input.required<string>();
  readonly navPayload = input<NavPayload>({});

  private readonly resolve = signal<NavResolver | undefined>(undefined);
  protected readonly isAnchor =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName === 'A';
  protected readonly url = computed(
    () => this.resolve()?.(this.navIntent(), this.navPayload()) ?? null,
  );

  constructor() {
    const stop = window.__NF_REGISTRY__!.onReady<Events['nav:resolve']>(
      'nav:resolve',
      (resolve) => this.resolve.set(resolve),
    );
    inject(DestroyRef).onDestroy(stop);
  }

  protected navigate(event: MouseEvent): void {
    // Leave new-tab and new-window clicks on real links to the browser.
    if (this.isAnchor && isModifiedClick(event)) return;
    if (this.url() === null) return;
    event.preventDefault();
    window.__NF_REGISTRY__!.emit<Events['nav:navigate']>('nav:navigate', {
      id: this.navIntent(),
      payload: this.navPayload(),
    });
  }
}

const isModifiedClick = (event: MouseEvent): boolean =>
  event.button !== 0 ||
  event.ctrlKey ||
  event.metaKey ||
  event.shiftKey ||
  event.altKey;
