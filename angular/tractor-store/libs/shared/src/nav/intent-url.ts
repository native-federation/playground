import type { IntentTarget } from './contribution';
import type { NavPayload } from './nav-payload';
import { joinPath, resolveTemplate, splitIntentParams } from './path-template';
import { appendQueryString } from './query';

// Fills `{param}` segments from the payload; the remaining keys become the query
// string. Throws when a path param is missing.
export const resolveIntentUrl = (
  target: IntentTarget,
  payload: NavPayload = {},
): string => {
  const path = joinPath(target.basePath, resolveTemplate(target.path, payload));
  const pathParams = new Set(splitIntentParams(target.path));
  const query = Object.fromEntries(
    Object.entries(payload).filter(([key]) => !pathParams.has(key)),
  );
  return appendQueryString(path, query);
};
