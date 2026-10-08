import { NavPayload } from './nav-payload';

const PARAM_RE = /^\{([a-zA-Z_$][\w$]*)\}$/;

const trimSlashes = (s: string): string => s.replace(/^\/+|\/+$/g, '');

export const joinPath = (basePath: string, intentPath: string): string => {
  const parts = [trimSlashes(basePath), trimSlashes(intentPath)].filter(
    (p) => p.length > 0,
  );
  return '/' + parts.join('/');
};

export const toRoutePath = (basePath: string, intentPath: string): string =>
  joinPath(basePath, intentPath)
    .replace(/^\/+/, '')
    .split('/')
    .map((seg) => {
      const m = PARAM_RE.exec(seg);
      return m ? `:${m[1]}` : seg;
    })
    .join('/');

export const splitIntentParams = (intentPath: string): readonly string[] => {
  return intentPath
    .split('/')
    .map((seg) => PARAM_RE.exec(seg)?.[1] ?? null)
    .filter((p): p is string => p !== null);
};

export const resolveTemplate = (
  template: string,
  payload: NavPayload,
): string => {
  return template
    .split('/')
    .map((seg) => {
      const m = PARAM_RE.exec(seg);
      if (!m) return seg;
      const value = payload[m[1]];
      if (value == null) {
        throw new Error(
          `[nav] missing required param "{${m[1]}}" for path "${template}"`,
        );
      }
      return encodeURIComponent(value);
    })
    .join('/');
};
