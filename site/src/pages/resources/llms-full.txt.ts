import type { APIRoute } from 'astro';
import { getPublishedContent } from '../../lib/content';
import { brand } from '../../lib/brand';

const siteUrl = brand.business.website || 'https://localhost';

export const GET: APIRoute = () => {
  const pages = getPublishedContent();

  const resourceSections = pages.map(page => {
    const firstParagraph = page.content
      .split('\n\n')
      .find(p => p.trim() && !p.trim().startsWith('#') && !p.trim().startsWith('---'))
      ?.trim() || '';

    const faqText = (page.frontmatter.faqs || [])
      .map((faq: { q: string; a: string }) => `Q: ${faq.q}\nA: ${faq.a}`)
      .join('\n\n');

    return `### ${page.frontmatter.title}
URL: ${siteUrl}/resources/${page.frontmatter.slug}
Keywords: ${page.frontmatter.target_keywords?.primary || ''}

${firstParagraph}
${faqText ? `\n#### FAQs\n${faqText}` : ''}`;
  }).join('\n\n---\n\n');

  const content = `# ${brand.business.name} — Full Resource Index

> This file contains detailed summaries of all resources published by ${brand.business.name}.
> For a concise version, see llms.txt.

## About ${brand.business.name}

${brand.business.description || ''}

${brand.differentiator?.name ? `## ${brand.differentiator.name}\n\n${brand.differentiator.description || ''}` : ''}

## Resources

${resourceSections || 'Resources coming soon.'}
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
