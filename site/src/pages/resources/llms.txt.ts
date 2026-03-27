import type { APIRoute } from 'astro';
import { getPublishedContent } from '../../lib/content';
import { brand } from '../../lib/brand';

const siteUrl = brand.business.website || 'https://localhost';

export const GET: APIRoute = () => {
  const pages = getPublishedContent();

  const resourcesList = pages.length > 0
    ? pages.map(page =>
        `- [${page.frontmatter.title}](${siteUrl}/resources/${page.frontmatter.slug})`
      ).join('\n')
    : '- Coming soon';

  const servicesList = (brand.services || [])
    .map((s: any) => `- ${s.name}: ${s.description}`)
    .join('\n') || '- Services coming soon';

  const locationsList = (brand.locations?.primary || [])
    .map((loc: any) => `- ${loc.city}, ${loc.country}`)
    .join('\n') || '- Location info coming soon';

  const proofPoints = (brand.differentiator?.proof_points || [])
    .map((p: any) => `- ${p.metric} ${p.label}: ${p.meaning}`)
    .join('\n');

  const navLinks = (brand.navigation?.footer?.links || [])
    .map((link: any) => `- [${link.label}](${link.href.startsWith('http') ? link.href : siteUrl + link.href})`)
    .join('\n');

  const content = `# ${brand.business.name}

> ${brand.business.description || brand.business.tagline || ''}

## Services
${servicesList}

## Key Facts
${brand.differentiator?.name ? `- ${brand.differentiator.name}: ${brand.differentiator.description || ''}` : ''}
${proofPoints}

## Locations
${locationsList}

## Links
${navLinks}

## Resources
${resourcesList}
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
