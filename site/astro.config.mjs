import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

// Load brand config for site URL
const configPath = fs.existsSync(path.resolve(process.cwd(), 'config', 'brand.yaml'))
  ? path.resolve(process.cwd(), 'config', 'brand.yaml')
  : path.resolve(process.cwd(), '..', 'config', 'brand.yaml');
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
