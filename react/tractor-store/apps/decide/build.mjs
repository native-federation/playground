import { createServer } from 'http';
import { readFileSync, existsSync, mkdirSync, rmSync } from 'fs';
import { extname, join } from 'path';
import * as esbuild from 'esbuild';
import { runEsBuildBuilder } from '@softarc/native-federation-esbuild';

const isDev = process.argv.includes('--dev');
const isPreview = process.argv.includes('--preview');

const PORT = 4302;

// native-federation-esbuild's cache-persistence step copies files into dist/
// before its own bundling has emitted anything there, so the directory must
// already exist when the builder runs.
// Hashed bundles from earlier builds would otherwise pile up next to the new ones.
rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });

const federation = await runEsBuildBuilder('federation.config.mjs', {
  outputPath: 'dist',
  tsConfig: 'tsconfig.json',
  dev: isDev,
  watch: isDev,
  entryPoints: ['src/main.tsx'],
  adapterConfig: { plugins: [] },
});

const importMap = JSON.parse(readFileSync('dist/importmap.json', 'utf8'));
const externals = Object.keys(importMap.imports ?? {});

// `splitting: true` (with `outdir`) emits one chunk per dynamic import, so
// the React-heavy code only loads via `await import(...)` AFTER
// initFederation has installed the runtime import map. With `outfile`
// esbuild inlines dynamic imports, and the bare-specifier `react` shows up
// at the top of main.js where es-module-shims fails to resolve it before
// federation init runs.
const mainBuildOptions = {
  entryPoints: ['src/main.tsx'],
  bundle: true,
  format: 'esm',
  outdir: 'dist',
  splitting: true,
  entryNames: 'main',
  chunkNames: 'chunks/[name]-[hash]',
  sourcemap: isDev,
  minify: !isDev,
  external: externals,
  loader: { '.css': 'css' },
  jsx: 'automatic',
  logLevel: 'info',
  target: ['es2020'],
};

let mainCtx;
if (isDev) {
  mainCtx = await esbuild.context(mainBuildOptions);
  await mainCtx.rebuild();
  await mainCtx.watch();
} else {
  await esbuild.build(mainBuildOptions);
}

if (isDev || isPreview) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.mjs': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
    '.webp': 'image/webp',
  };

  const server = createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    let filePath = req.url.split('?')[0];
    if (filePath === '/') filePath = '/public/index.html';

    const distPath = join('dist', filePath.replace(/^\/dist\//, ''));
    const publicPath = join('public', filePath.replace(/^\/public\//, ''));

    let resolvedPath;
    if (existsSync(distPath) && !filePath.startsWith('/public')) {
      resolvedPath = distPath;
    } else if (existsSync(publicPath)) {
      resolvedPath = publicPath;
    } else if (existsSync(join('public', 'index.html'))) {
      resolvedPath = join('public', 'index.html');
    }

    if (!resolvedPath) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const ext = extname(resolvedPath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(readFileSync(resolvedPath));
  });

  server.listen(PORT, () => {
    console.log(`[decide] dev server running at http://localhost:${PORT}`);
  });

  const shutdown = async () => {
    await federation.close();
    if (mainCtx) await mainCtx.dispose();
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
} else {
  await federation.close();
  console.log('[decide] build complete.');
}
