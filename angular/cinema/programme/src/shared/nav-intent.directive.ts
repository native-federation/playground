import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { bus } from '@softarc/native-federation-communication';
import type { NavPayload, NavResolver } from '../contracts';
import { navigateTo } from './navigate';

// Links to a page by intent id, e.g. 'film.detail': the shell resolves the href and navigates.
@Directive({
  selector: '[navIntent]',
  host: {
    '[attr.href]': 'isAnchor ? url() : null',
    '[attr.aria-disabled]': 'url() === null ? "true" : null',
    // Without href an <a> loses its link role, so aria-disabled would be ignored.
    '[attr.role]': 'isAnchor && url() === null ? "link" : null',
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
    inject(DestroyRef).onDestroy(
      bus.on('nav:resolve', (resolve) => this.resolve.set(resolve)),
    );
  }

  protected navigate(event: MouseEvent): void {
    // Leave new-tab and new-window clicks on real links to the browser.
    if (this.isAnchor && isModifiedClick(event)) return;
    if (this.url() === null) return;
    event.preventDefault();
    navigateTo({ id: this.navIntent(), payload: this.navPayload() });
  }
}

const isModifiedClick = (event: MouseEvent): boolean =>
  event.button !== 0 ||
  event.ctrlKey ||
  event.metaKey ||
  event.shiftKey ||
  event.altKey;
