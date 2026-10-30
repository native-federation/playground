import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent } from 'react';
import type { Events, NavPayload, NavResolver } from '@tractor-store/contracts';

// Links to a page by intent id, e.g. 'decide.product': the host resolves the href and navigates.
export const useNavIntent = (intent: string, payload: NavPayload = {}) => {
  const [resolve, setResolve] = useState<NavResolver>();
  useEffect(
    () =>
      window.__NF_REGISTRY__!.onReady<Events['nav:resolve']>('nav:resolve', (resolver) =>
        setResolve(() => resolver),
      ),
    [],
  );
  const url = resolve?.(intent, payload) ?? null;

  const onClick = (event: MouseEvent<HTMLElement>): void => {
    // Leave new-tab and new-window clicks on real links to the browser.
    if (event.currentTarget.tagName === 'A' && isModifiedClick(event)) return;
    if (url === null) return;
    event.preventDefault();
    window.__NF_REGISTRY__!.emit<Events['nav:navigate']>('nav:navigate', {
      id: intent,
      payload,
    });
  };

  return { url, onClick, 'aria-disabled': url === null ? true : undefined };
};

export interface NavLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  readonly intent: string;
  readonly payload?: NavPayload;
}

export function NavLink({ intent, payload, ...anchor }: NavLinkProps) {
  const { url, ...nav } = useNavIntent(intent, payload);
  return <a {...anchor} {...nav} href={url ?? undefined} />;
}

const isModifiedClick = (event: MouseEvent): boolean =>
  event.button !== 0 ||
  event.ctrlKey ||
  event.metaKey ||
  event.shiftKey ||
  event.altKey;
