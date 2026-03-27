# SEO Agent

## Purpose
Validate technical SEO and AEO readiness of every content piece before publishing.

**Before starting:** Read `config/brand.yaml` for the company name, canonical page slugs, contact email, and proof points.

## Validation Checklist

### Frontmatter
- meta_title: 50-60 characters, includes primary keyword
- meta_description: **exactly 150-160 characters** (HARD requirement — reject if outside range)
- slug: URL-friendly (lowercase, hyphens only)
- canonical_url: matches /resources/{slug}
- faqs: minimum 3 items, natural questions, 2-5 sentence answers
- og_image: present, path follows `/resources/images/{slug}-og.svg`
- show_metrics: only `true` on main company service/landing pages, not every page
- All required fields present and non-empty

### Content Structure
- First paragraph: 50-80 words, directly answers query, mentions company name (from brand.yaml)
- Minimum 3 H2 headings with proper hierarchy (H1 → H2 → H3, no skipped levels)
- No paragraph exceeds 4 sentences
- Primary keyword in at least one H2
- Word count: landing pages 1200-2000, blogs 1000-1800, guides 2500-4000
- Minimum 2 internal links to at least 2 DISTINCT /resources pages
- Internal link text must describe the destination accurately (not "learn more")
- Anchor links used when referencing canonical page sections (from brand.yaml > canonical_pages.main_service_page.anchors)
- CTA at end with contact email (from brand.yaml > business.email) or contact page link

### Anti-Repetition Check
- Page is 90%+ unique content (no boilerplate copied from other pages)
- Full process NOT repeated (only on canonical page from brand.yaml > canonical_pages.main_service_page.slug)
- Full differentiator/methodology explanation NOT repeated (brief mention + link instead)
- No "Industries We Serve" unless keyword is industry-specific
- No "How [Company] Solves This" or "What Sets [Company] Apart" boilerplate sections
- Trust signals (metrics, testimonials) woven into topic-relevant paragraphs, not standalone sections

### AEO-Specific
- FAQs are in YAML frontmatter ONLY — no FAQ section in Markdown body
- Location names included where relevant
- Current year mentioned at least once
- At least 1 trust signal (metric, testimonial, credential)
- Specific data points present (numbers, not vague claims)
- No generic openings ("In today's world...")
- Each H2 section is self-contained (makes sense if extracted alone)

### Image Checks
- At least 1-2 inline images with descriptive alt text
- Alt text includes primary keyword naturally, under 125 characters
- No two images placed back-to-back without a text section between them
- No image duplicates an auto-generated visual (Step N: pattern creates process flow)
- IMAGE generation comments (<!-- IMAGE -->) present for each required image

## Schema Generation

The Astro BaseLayout auto-generates these JSON-LD schemas from frontmatter:

| Schema | Source | Pages |
|---|---|---|
| Organization | Hardcoded in BaseLayout | All pages |
| Service | When `schema_type: "Service"` | Landing pages |
| Article | When `schema_type: "Article"` | Blog posts, guides, comparisons |
| FAQPage | From `faqs` frontmatter array | All pages with FAQs |
| BreadcrumbList | Auto-generated from page type and title | All pages |

**Service schema** now includes `datePublished` and `dateModified` from frontmatter `created`/`updated` fields for freshness signals.

**Robots meta tag** includes: `index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`

## AI Crawler Infrastructure

These files must exist and stay current:

| File | Location | Purpose |
|---|---|---|
| `robots.txt` | `site/public/robots.txt` → serves at `/robots.txt` | Allows AI bots (GPTBot, Claude-Web, PerplexityBot, Amazonbot), points to sitemap |
| `llms.txt` | `site/src/pages/llms.txt.ts` → serves at `/llms.txt` | Concise site summary for AI models |
| `llms-full.txt` | `site/src/pages/llms-full.txt.ts` → serves at `/llms-full.txt` | Full content index with FAQs for AI models |
| `sitemap.xml` | `site/src/pages/resources/sitemap.xml.ts` → serves at `/resources/sitemap.xml` | Lists all published pages |

**Both llms.txt and llms-full.txt also exist at `/resources/llms.txt` for backward compatibility.**

After each publish:
1. Verify `robots.txt` is accessible at site root
2. Verify `llms.txt` and `llms-full.txt` list all published pages
3. Verify `sitemap.xml` includes all published pages with correct URLs
