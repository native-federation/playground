import { Directive, input } from '@angular/core';
import { navigateTo as navigateToChannel } from './nav-event-bus';
import { NavPayload } from './nav-types';

/**
 * Cross-MFE navigation directive. Emits a `nav:navigate` event on click
 * carrying the intent id + params; the host's NavRegistry resolves the
 * intent to a URL and drives the router. Remotes never know the URL.
 */
@Directive({
  selector: 'a[navigateTo], button[navigateTo], [navigateTo]',
  host: {
    '(click)': 'onClick($event)',
    '[style.cursor]': '"pointer"',
  },
})
export class NavigateToDirective {
  readonly navigateTo = input.required<string>();
  readonly navParams = input<NavPayload>({});

  onClick(event: Event): void {
    event.preventDefault();
    navigateToChannel.emit({
      id: this.navigateTo(),
      payload: this.navParams(),
    });
  }
}
