/**
 * Single-object payload that the host shell writes to a routed remote's
 * custom element. All path and query parameters live under one well-known
 * property name (`routeParams`) so the host never collides with HTMLElement
 * intrinsics like `id`, `style`, or `hidden`. Multi-value query params are
 * represented as readonly string arrays.
 */
export type RouteParams = Readonly<Record<string, string | readonly string[]>>;

export const param = (
  params: RouteParams,
  key: string,
): string | undefined => {
  const v = params[key];
  return typeof v === 'string' ? v : undefined;
};

export const requiredParam = (params: RouteParams, key: string): string => {
  const v = param(params, key);
  if (v === undefined) {
    throw new Error(`[nav] missing required route param "${key}"`);
  }
  return v;
};

export const paramList = (
  params: RouteParams,
  key: string,
): readonly string[] => {
  const v = params[key];
  if (Array.isArray(v)) return v;
  if (typeof v === 'string') return [v];
  return [];
};

export const sameRouteParams = (a: RouteParams, b: RouteParams): boolean => {
  if (a === b) return true;
  const keysA = Object.keys(a);
  if (keysA.length !== Object.keys(b).length) return false;
  for (const k of keysA) {
    const va = a[k];
    const vb = b[k];
    if (va === vb) continue;
    if (Array.isArray(va) && Array.isArray(vb)) {
      if (va.length !== vb.length) return false;
      for (let i = 0; i < va.length; i += 1) {
        if (va[i] !== vb[i]) return false;
      }
      continue;
    }
    return false;
  }
  return true;
};
