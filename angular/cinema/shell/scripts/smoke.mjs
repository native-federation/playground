// Checks every remote in a manifest: reachable remoteEntry.json, matching name,
// the exposes the shell relies on, and every exposed file served.
// Usage: node scripts/smoke.mjs [manifest-url]   (default: public/federation.manifest.json)
import { readFile } from 'node:fs/promises';

const requiredExposes = {
  '@cinema/loyalty': ['mfe-loyalty-badge'],
  '@cinema/notifications': ['mfe-notifications-toast'],
};

const manifestUrl = process.argv[2];
const manifest = manifestUrl
  ? await (await fetch(manifestUrl)).json()
  : JSON.parse(await readFile(new URL('../public/federation.manifest.json', import.meta.url), 'utf8'));

const rows = [];
for (const [remote, entryUrl] of Object.entries(manifest)) {
  rows.push({ remote, ...(await check(remote, entryUrl)) });
}
console.table(rows);
if (rows.some((row) => !row.ok)) process.exitCode = 1;

async function check(remote, entryUrl) {
  let entry;
  try {
    const resp = await fetch(entryUrl);
    if (!resp.ok) return { ok: false, problem: `remoteEntry.json: HTTP ${resp.status}` };
    entry = await resp.json();
  } catch (err) {
    return { ok: false, problem: `remoteEntry.json unreachable: ${err.cause?.code ?? err.message}` };
  }
  if (entry.name !== remote) return { ok: false, problem: `name is "${entry.name}"` };

  const exposes = entry.exposes ?? [];
  const keys = exposes.map((expose) => expose.key);
  const missing = ['nav-contribution', ...(requiredExposes[remote] ?? [])].filter((key) => !keys.includes(key));
  if (missing.length) return { ok: false, problem: `missing exposes: ${missing.join(', ')}` };

  for (const { key, outFileName } of exposes) {
    const resp = await fetch(new URL(outFileName, entryUrl), { method: 'HEAD' }).catch(() => null);
    if (!resp?.ok) return { ok: false, problem: `exposed "${key}" not served (${outFileName})` };
  }
  return { ok: true, problem: '' };
}
