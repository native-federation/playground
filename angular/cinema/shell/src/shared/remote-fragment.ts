import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  type OnInit,
} from '@angular/core';
import { LOAD_REMOTE } from './remote-element';

// Mounts a remote's fragment element, e.g. `mfe-loyalty-badge`, once it loaded.
@Component({
  selector: 'app-remote-fragment',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoteFragment implements OnInit {
  readonly remoteName = input.required<string>();
  readonly element = input.required<string>();

  private readonly loadRemote = inject(LOAD_REMOTE);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  ngOnInit(): void {
    const [remoteName, element] = [this.remoteName(), this.element()];
    this.loadRemote(remoteName, element)
      .then(() => this.host.appendChild(document.createElement(element)))
      // Only present remotes get a slot (ADR-12), so this is a real failure.
      .catch((err) =>
        console.error(`[remote] failed to load <${element}> from "${remoteName}"`, err),
      );
  }
}
