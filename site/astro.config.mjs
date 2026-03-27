import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

// Load brand config for site URL — search in priority order
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const candidates = [
  path.resolve(__dirname, '..', 'config', 'brand.yaml'),   // repo root (dev + Vercel repo-root deploy)
  path.resolve(__dirname, 'config', 'brand.yaml'),          // site/config (Vercel site-root deploy)
  path.resolve(process.cwd(), 'config', 'brand.yaml'),      // cwd/config fallback
  path.resolve(process.cwd(), '..', 'config', 'brand.yaml') // cwd parent fallback
];
const configPath = candidates.find(p => fs.existsSync(p));
if (!configPath) throw new Error('brand.yaml not found. Searched: ' + candidates.join(', '));
const brandConfig = yaml.load(fs.readFileSync(configPath, 'utf-8'));

export default defineConfig({
  site: brandConfig.business.website || 'https://localhost',
  output: 'static',
  build: {
    format: 'directory'
  },
  vite: {
    resolve: {
      alias: {
        '@content': '../../content'
      }
    }
  }
});
