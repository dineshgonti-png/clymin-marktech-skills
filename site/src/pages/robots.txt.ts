import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const configPath = fs.existsSync(path.resolve(process.cwd(), 'config', 'brand.yaml'))
  ? path.resolve(process.cwd(), 'config', 'brand.yaml')
  : path.resolve(process.cwd(), '..', 'config', 'brand.yaml');
const brandConfig = yaml.load(fs.readFileSync(configPath, 'utf-8')) as any;

const siteUrl = brandConfig.business?.website || 'https://localhost';
const subdirectory = brandConfig.content_config?.subdirectory || '/resources';

export const GET: APIRoute = () => {
  const content = `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Amazonbot
Allow: /

Sitemap: ${siteUrl}${subdirectory}/sitemap.xml
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
