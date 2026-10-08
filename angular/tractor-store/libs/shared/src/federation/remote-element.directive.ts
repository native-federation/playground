import {
  Directive,
  ElementRef,
  HostAttributeToken,
  inject,
} from '@angular/core';
import { LOAD_REMOTE } from './remote-loader';

// Put on an `mfe-*` tag to load and define that element from its remote:
// <mfe-header mfeRemote="@tractor-store/explore" />
@Directive({ selector: '[mfeRemote]' })
export class RemoteElementDirective {
  constructor() {
    const remoteName = inject(new HostAttributeToken('mfeRemote'));
    const element =
      inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.localName;
    inject(LOAD_REMOTE)(remoteName, element).catch((err) =>
      console.error(
        `[remote] failed to load <${element}> from "${remoteName}"`,
        err,
      ),
    );
  }
}
