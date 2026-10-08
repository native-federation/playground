import {
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { listenTo } from '../bus/channel';
import { navIntents, navigateTo } from '../bus/nav-channels';
import type { IntentMap } from './contribution';
import { resolveIntentUrl } from './intent-url';
import type { NavPayload } from './nav-payload';

@Directive({
  selector: '[appNavigateTo]',
  host: {
    '[attr.href]': 'href()',
    '[attr.aria-disabled]': 'url() === null ? "true" : null',
    '(click)': 'onClick($event)',
  },
})
export class NavigateToDirective {
  readonly appNavigateTo = input.required<string>();
  readonly navPayload = input<NavPayload>({});

  private readonly intents = signal<IntentMap>(new Map());
  private readonly isAnchor =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName === 'A';

  protected readonly url = computed(() => {
    const target = this.intents().get(this.appNavigateTo());
    if (!target) return null;
    try {
      return resolveIntentUrl(target, this.navPayload());
    } catch {
      return null;
    }
  });

  protected readonly href = computed(() => (this.isAnchor ? this.url() : null));

  constructor() {
    listenTo(navIntents, (intents) => this.intents.set(intents));
  }

  protected onClick(event: MouseEvent): void {
    // Leave new-tab and new-window clicks on real links to the browser.
    if (this.isAnchor && isModifiedClick(event)) return;

    const id = this.appNavigateTo();
    const target = this.intents().get(id);
    if (!target) return;
    try {
      resolveIntentUrl(target, this.navPayload());
    } catch (err) {
      console.warn(
        `[nav] [appNavigateTo]="${id}" cannot navigate: ${(err as Error).message}`,
      );
      return;
    }
    event.preventDefault();
    navigateTo.emit({ id, payload: this.navPayload() });
  }
}

const isModifiedClick = (event: MouseEvent): boolean =>
  event.button !== 0 ||
  event.ctrlKey ||
  event.metaKey ||
  event.shiftKey ||
  event.altKey;
