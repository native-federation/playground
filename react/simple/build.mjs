import { createServer } from 'http';
import { readFileSync, existsSync, mkdirSync, rmSync } from 'fs';
import { extname, join } from 'path';
import { runEsBuildBuilder } from '@softarc/native-federation-esbuild';

const isDev = process.argv.includes('--dev');

// Hashed bundles from earlier builds would otherwise pile up next to the new ones.
rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });

const federation = await runEsBuildBuilder('federation.config.js', {
  outputPath: 'dist',
  tsConfig: 'tsconfig.json',
  dev: isDev,
  watch: isDev,
  entryPoints: ['src/bootstrap.tsx'],
  adapterConfig: { plugins: [] },
});

if (isDev) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.mjs': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
  };

  const server = createServer((req, res) => {
    let filePath = req.url === '/' ? '/public/index.html' : req.url;
    filePath = filePath.split('?')[0];

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

  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Dev server running at http://localhost:${PORT}`);
  });

  const shutdown = async () => {
    await federation.close();
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
} else {
  await federation.close();
  console.log('Build complete.');
}
