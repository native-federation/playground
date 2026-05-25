import {
  useSyncExternalStore,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { navigateTo } from '@react-internal/event-bus';
import type { NavPayload } from '@react-internal/url';
import {
  getNavIntent,
  getNavIntents,
  resolveIntent,
  subscribeNavIntents,
  tryResolveIntent,
} from './nav-resolver';

export interface NavigateLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick' | 'href'> {
  readonly intent: string;
  readonly params?: NavPayload;
  readonly children?: ReactNode;
}

/**
 * Cross-MFE navigation link. Resolves the intent + params to a concrete href
 * from a snapshot of the `nav:intents` channel so the anchor is focusable,
 * screen-reader-announced as a link, and supports modifier-click /
 * right-click → "Copy link address". On plain left-click we preventDefault
 * and emit `nav:navigate`; the host's NavRegistry drives the SPA router.
 *
 * Renders nothing until the intent shows up in the bus snapshot — intents can
 * be contributed later (lazy remotes), so a missing entry is not an error,
 * just "not ready yet". When the entry IS available but a required `{param}`
 * is missing on click, we log a `console.warn` naming the intent and reason
 * and stay a no-op rather than emitting a doomed navigation event.
 */
export function NavigateLink({
  intent,
  params,
  children,
  ...rest
}: NavigateLinkProps) {
  // Re-render when the host (re)publishes the intent map.
  useSyncExternalStore(subscribeNavIntents, getNavIntents, getNavIntents);

  if (!getNavIntent(intent)) return null;

  const href = resolveIntent(intent, params) ?? '#';
  const onClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    if (event.defaultPrevented) return;
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    try {
      tryResolveIntent(intent, params);
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err);
      console.warn(
        `[nav] <NavigateLink intent="${intent}"> cannot navigate: ${reason}`,
      );
      return;
    }
    navigateTo.emit({ id: intent, payload: params ?? {} });
  };
  return (
    <a {...rest} href={href} onClick={onClick}>
      {children}
    </a>
  );
}
