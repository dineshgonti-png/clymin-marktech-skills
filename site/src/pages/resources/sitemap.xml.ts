import type { APIRoute } from 'astro';
import { getPublishedContent } from '../../lib/content';
import { brand } from '../../lib/brand';

const siteUrl = brand.business.website || 'https://localhost';

export const GET: APIRoute = () => {
  const pages = getPublishedContent();

  const urls = [
    {
      loc: `${siteUrl}/resources/`,
      lastmod: new Date().toISOString().split('T')[0],
      priority: '0.8',
      changefreq: 'weekly',
    },
    ...pages.map(page => ({
      loc: `${siteUrl}/resources/${page.frontmatter.slug}`,
      lastmod: page.frontmatter.updated || page.frontmatter.created,
      priority: page.frontmatter.type === 'landing-page' ? '0.9' : '0.7',
      changefreq: 'monthly' as const,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
