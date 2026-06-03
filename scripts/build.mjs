import { cp, mkdir, rm, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const checkOnly = process.argv.includes('--check');
const requiredPaths = ['index.html', 'assets'];
const optionalPaths = ['favicon.svg', '_redirects', '.nojekyll'];

async function assertExists(relativePath) {
  const fullPath = path.join(root, relativePath);
  try {
    await stat(fullPath);
  } catch {
    throw new Error(`Required deployment file is missing: ${relativePath}`);
  }
}

async function copyIfPresent(relativePath) {
  const source = path.join(root, relativePath);
  if (!existsSync(source)) {
    return;
  }
  await cp(source, path.join(distDir, relativePath), { recursive: true });
}

for (const relativePath of requiredPaths) {
  await assertExists(relativePath);
}

if (checkOnly) {
  console.log('Static deployment check passed.');
  process.exit(0);
}

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });

for (const relativePath of [...requiredPaths, ...optionalPaths]) {
  await copyIfPresent(relativePath);
}

console.log('Static deployment files copied to dist/.');
