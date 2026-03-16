import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const distDir = resolve(process.cwd(), 'dist');
const indexPath = resolve(distDir, 'index.html');
const notFoundPath = resolve(distDir, '404.html');
const noJekyllPath = resolve(distDir, '.nojekyll');

if (!existsSync(indexPath)) {
  console.error('dist/index.html not found. Run "npm run build" first.');
  process.exit(1);
}

mkdirSync(distDir, { recursive: true });
copyFileSync(indexPath, notFoundPath);
writeFileSync(noJekyllPath, '', 'utf8');

console.log('GitHub Pages assets prepared in dist/: 404.html and .nojekyll');
