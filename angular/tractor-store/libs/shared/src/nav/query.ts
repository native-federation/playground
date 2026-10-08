import { NavPayload } from './nav-payload';

/**
 * Append a `?key=value&key=value` query string to a path. Keys and values are
 * URL-encoded. Returns the path unchanged when there are no params to append,
 * which keeps the no-query case allocation-free.
 */
export const appendQueryString = (path: string, params: NavPayload): string => {
  const keys = Object.keys(params);
  if (keys.length === 0) return path;
  const qs = keys
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
  return `${path}?${qs}`;
};
