import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useSearchParams, type Params } from 'react-router-dom';
import type { RouteParams } from '@tractor-store/contracts';
import { LoadRemoteContext } from './load-remote';

interface RemoteElement extends HTMLElement {
  routeParams?: RouteParams;
}

interface Props {
  readonly remoteName: string;
  readonly element: string;
}

// Mounted by every remote route (see navigation.tsx).
export function RemoteShell({ remoteName, element }: Props) {
  const loadRemote = useContext(LoadRemoteContext)!;
  const host = useRef<HTMLDivElement>(null);
  const mounted = useRef<RemoteElement>();
  const [status, setStatus] = useState<'loading' | 'loaded' | 'failed'>('loading');

  const params = useParams();
  const [query] = useSearchParams();
  // The custom element only sees a new object when a value actually changed.
  const json = JSON.stringify(toRouteParams(params, query));
  const routeParams = useMemo<RouteParams>(() => JSON.parse(json), [json]);
  const latestParams = useRef(routeParams);
  latestParams.current = routeParams;

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    loadRemote(remoteName, element).then(
      () => {
        if (cancelled) return;
        const el: RemoteElement = document.createElement(element);
        el.routeParams = latestParams.current;
        host.current!.appendChild(el);
        mounted.current = el;
        setStatus('loaded');
      },
      (err) => {
        // The page only shows that it failed; keep the cause for developers.
        console.error(`[host] failed to load <${element}> from "${remoteName}"`, err);
        if (!cancelled) setStatus('failed');
      },
    );
    return () => {
      cancelled = true;
      mounted.current?.remove();
      mounted.current = undefined;
    };
  }, [loadRemote, remoteName, element]);

  useEffect(() => {
    if (mounted.current) mounted.current.routeParams = routeParams;
  }, [routeParams]);

  return (
    <>
      <div ref={host} />
      {status === 'failed' ? (
        <p role="alert" className="remote-shell__error">
          Failed to load <strong>{remoteName}</strong>. Please refresh.
        </p>
      ) : status === 'loading' ? (
        <div className="spinner" role="status" aria-label={`Loading ${remoteName}…`}>
          <style>{spinnerStyles}</style>
          <span className="spinner__circle" aria-hidden="true"></span>
          <span className="spinner__label">Loading {remoteName}…</span>
        </div>
      ) : null}
    </>
  );
}

const toRouteParams = (params: Params, query: URLSearchParams): RouteParams => {
  const out: Record<string, string | readonly string[]> = {};
  for (const key of new Set(query.keys())) {
    const all = query.getAll(key);
    out[key] = all.length > 1 ? all : all[0];
  }
  // Path params win on a name collision.
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) out[key] = value;
  }
  return out;
};

const spinnerStyles = `
.spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem 1rem;
  min-height: 50vh;
  color: #ff5a55;
}

.spinner__circle {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255, 90, 85, 0.15);
  border-top-color: #ff5a55;
  border-radius: 50%;
  animation: spinner-spin 0.8s linear infinite;
}

.spinner__label {
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.85;
}

@keyframes spinner-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .spinner__circle {
    animation-duration: 2.4s;
  }
}
`;
