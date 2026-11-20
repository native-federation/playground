import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent } from 'react';
import { bus } from '@softarc/native-federation-communication';
import type { NavIntents, NavPayload } from '@tractor-store/contracts';
import { navigateTo, urlFor } from './navigate';

// Links to a page by intent id, e.g. 'decide.product': the href comes from the host's nav:intents, and the host navigates.
export const useNavIntent = (intent: string, payload: NavPayload = {}) => {
  const [intents, setIntents] = useState<NavIntents>({});
  useEffect(() => bus.on('nav:intents', setIntents), []);
  const url = urlFor(intents, intent, payload);

  const onClick = (event: MouseEvent<HTMLElement>): void => {
    // Leave new-tab and new-window clicks on real links to the browser.
    if (event.currentTarget.tagName === 'A' && isModifiedClick(event)) return;
    if (url === null) return;
    event.preventDefault();
    navigateTo({ id: intent, payload });
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
