import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { type RouteParams, sameRouteParams } from '@react-internal/url';
import { ErrorBoundary, Spinner } from '@react-internal/ui';
import { useLoader } from './context';

interface RemoteElement extends HTMLElement {
  routeParams?: RouteParams;
}

interface Props {
  readonly remoteName: string;
  readonly elementTag: string;
}

/**
 * Mount point for a routed remote fragment. Calls the slice loader, then
 * `document.createElement(elementTag)` and writes a `routeParams` property
 * carrying path + query params. Re-assigns `routeParams` when URL params
 * change, with structural equality to avoid spurious re-renders.
 */
export function RemoteShell({ remoteName, elementTag }: Props) {
  const loader = useLoader();
  const hostRef = useRef<HTMLDivElement | null>(null);
  const elRef = useRef<RemoteElement | null>(null);
  const lastParamsRef = useRef<RouteParams | undefined>(undefined);

  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const params = useParams();
  const [searchParams] = useSearchParams();

  const routeParams = useMemo<RouteParams>(() => {
    const out: Record<string, string | readonly string[]> = {};
    for (const [k, v] of Object.entries(params)) {
      if (typeof v === 'string') out[k] = v;
    }
    for (const k of new Set(searchParams.keys())) {
      if (k in out) continue;
      const all = searchParams.getAll(k);
      out[k] = all.length > 1 ? all : all[0];
    }
    return out;
  }, [params, searchParams]);

  useEffect(() => {
    let cancelled = false;
    setLoaded(false);
    setErrored(false);

    loader(remoteName, elementTag)
      .then(() => {
        if (cancelled || !hostRef.current) return;
        const el = document.createElement(elementTag) as RemoteElement;
        hostRef.current.appendChild(el);
        elRef.current = el;
        el.routeParams = routeParams;
        lastParamsRef.current = routeParams;
        setLoaded(true);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error(`Failed to load remote ${remoteName}`, err);
        setErrored(true);
      });

    return () => {
      cancelled = true;
      const el = elRef.current;
      if (el && el.parentNode) el.parentNode.removeChild(el);
      elRef.current = null;
    };
    // routeParams is handled by the next effect; mounting only depends on tag.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remoteName, elementTag, loader]);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    if (lastParamsRef.current && sameRouteParams(lastParamsRef.current, routeParams)) {
      return;
    }
    el.routeParams = routeParams;
    lastParamsRef.current = routeParams;
  }, [routeParams]);

  return (
    <ErrorBoundary label={`shell:${remoteName}`}>
      <div ref={hostRef} />
      {errored && (
        <p role="alert" className="remote-shell__error">
          Failed to load <strong>{remoteName}</strong>. Please refresh.
        </p>
      )}
      {!loaded && !errored && <Spinner label={`Loading ${remoteName}…`} />}
    </ErrorBoundary>
  );
}
