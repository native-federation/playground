// Starts the federated SSR servers in the order they must boot:
//   1. the remotes (mfe1, mfe2) — pinned to the ports in
//      projects/host/public/federation.manifest.json
//   2. the host — but only once each remote actually serves its
//      `remoteEntry.json`, so the host's `initNodeFederation` can fetch them.
//
// Boot order is load-bearing: if the host starts first it cannot fetch the
// remotes and every federated region renders empty (the route-level
// `.catch(() => RemoteUnavailable)` swallows it silently). This script removes
// that footgun. See README, "Running the federated SSR servers".
//
// Dependency-free on purpose. Ctrl+C (or any child crashing) tears everything
// down together. Requires a production build first: `npm run build`.

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { get } from 'node:http';
import process from 'node:process';

const REMOTES = [
  { name: 'mfe1', port: 4201 },
  { name: 'mfe2', port: 4202 },
];
const HOST = { name: 'host', port: 4200 };

// ANSI colors so interleaved logs are readable.
const COLORS = ['\x1b[36m', '\x1b[35m', '\x1b[32m']; // cyan, magenta, green
const RESET = '\x1b[0m';

const children = [];
let shuttingDown = false;

function shutdown(code) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) {
    if (child.exitCode === null) child.kill('SIGTERM');
  }
  process.exit(code);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

// The adapter ships a Node `--import` preload that registers the federation
// loader before any '@angular/*' is evaluated, so we launch the untouched CLI
// entry (`server.mjs`) directly — no generated wrapper. See the adapter's
// `@angular-architects/native-federation/node-preload`.
const REGISTER = '@angular-architects/native-federation/node-preload';

function start({ name, port }, color) {
  const entry = `dist/${name}/server/server.mjs`;
  if (!existsSync(entry)) {
    console.error(`✗ ${entry} not found — run \`npm run build\` first.`);
    shutdown(1);
    return null;
  }

  const child = spawn(process.execPath, ['--import', REGISTER, entry], {
    env: { ...process.env, PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  const prefix = `${color}[${name}:${port}]${RESET}`;
  const relay = (stream, out) =>
    stream.on('data', (buf) => {
      for (const line of buf.toString().split('\n')) {
        if (line.trim()) out.write(`${prefix} ${line}\n`);
      }
    });
  relay(child.stdout, process.stdout);
  relay(child.stderr, process.stderr);

  child.on('exit', (exitCode) => {
    if (!shuttingDown) {
      console.error(`${prefix} exited (code ${exitCode}) — stopping the rest.`);
      shutdown(exitCode ?? 1);
    }
  });

  children.push(child);
  return child;
}

// Resolves once the URL responds (any HTTP status), or rejects after timeout.
function waitForHttp(url, timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    const attempt = () => {
      const req = get(url, (res) => {
        res.resume();
        resolve();
      });
      req.on('error', () => {
        if (Date.now() > deadline) reject(new Error(`timed out waiting for ${url}`));
        else setTimeout(attempt, 300);
      });
    };
    attempt();
  });
}

console.log('Starting remotes…');
REMOTES.forEach((remote, i) => start(remote, COLORS[i]));

// Wait for the exact resource the host needs at init: each remote's entry.
await Promise.all(
  REMOTES.map((r) => waitForHttp(`http://localhost:${r.port}/remoteEntry.json`)),
).catch((err) => {
  console.error(`✗ ${err.message}`);
  shutdown(1);
});

console.log('Remotes are up — starting host…');
start(HOST, COLORS[2]);
await waitForHttp(`http://localhost:${HOST.port}/`).catch((err) => {
  console.error(`✗ ${err.message}`);
  shutdown(1);
});

console.log(
  [
    '',
    '✓ All servers up:',
    `  host  → http://localhost:${HOST.port}`,
    ...REMOTES.map((r) => `  ${r.name}  → http://localhost:${r.port}`),
    '',
    'Press Ctrl+C to stop all.',
    '',
  ].join('\n'),
);
