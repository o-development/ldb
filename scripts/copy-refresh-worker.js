#!/usr/bin/env node
// Copies RefreshWorker.js from @uvdsl/solid-oidc-client-browser into the project's
// public/ directory so Expo's dev server (and static builds) can serve it at /.
// Run this after install: npm run copy-refresh-worker
// Consumers of @o.team/linked-data-browser can add to their own postinstall:
//   "postinstall": "node ./node_modules/@o.team/linked-data-browser/scripts/copy-refresh-worker.js"

const path = require('path');
const fs = require('fs');

const PKG = '@uvdsl/solid-oidc-client-browser';
const WORKER_REL = path.join('dist', 'esm', 'web', 'RefreshWorker.js');

function findPackageDir(pkgName, startDir) {
  let dir = startDir;
  while (true) {
    const candidate = path.join(dir, 'node_modules', pkgName);
    if (fs.existsSync(candidate)) return candidate;
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

const pkgDir = findPackageDir(PKG, process.cwd());
if (!pkgDir) {
  console.error(
    `[copy-refresh-worker] Could not find ${PKG} in any node_modules directory. ` +
    'Make sure it is installed.'
  );
  process.exit(1);
}

const src = path.join(pkgDir, WORKER_REL);
const destDir = path.join(process.cwd(), 'public');
const dest = path.join(destDir, 'RefreshWorker.js');

fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);
console.log('[copy-refresh-worker] Copied RefreshWorker.js to', dest);
