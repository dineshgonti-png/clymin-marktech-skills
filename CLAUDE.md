# AEO Lead Generation System

> **This is a white-label AEO system.** Configure your brand in `config/brand.yaml` before doing anything. All content, schema markup, and AI crawler files are generated from your brand configuration.

## Overview

This project generates inbound leads by creating SEO + AEO (Answer Engine Optimized) content published to `{brand.business.website}/resources`. The content is designed to rank on Google AND get cited by AI search engines (ChatGPT, Perplexity, Gemini, Claude).

## Quick Commands

| Command | What it does |
|---|---|
| `research [segment]` | Run keyword research for a target segment |
| `plan` | Generate/update the content plan from keyword data |
| `generate [topic]` | Generate a single content piece for a specific topic |
| `batch [N]` | Generate the next N pages from the content plan |
| `seo-check [file]` | Validate SEO elements of a content piece |
| `publish` | Build the Astro site and deploy to Vercel |
| `report` | Generate a performance report from Search Console data |
| `refresh [file]` | Rewrite an underperforming content piece |
| `inventory` | Show content inventory summary |

## Before Doing Anything

1. **Always** load `config/brand.yaml` before generating any content
2. **Always** read the relevant `agents/[name]/AGENT.md` for the task
3. **Always** check `data/content-plan.json` to avoid duplicate topics

## Project Structure

```
aeo-starter/
├── CLAUDE.md                  <- You are here
├── config/
│   └── brand.yaml             <- Brand memory (load FIRST, always)
├── agents/
│   ├── research/AGENT.md      <- Keyword & intent research instructions
│   ├── strategy/AGENT.md      <- Content planning & clustering
│   ├── competitor/AGENT.md    <- SERP & AI citation analysis
│   ├── content/AGENT.md       <- Page generation instructions
│   ├── seo/AGENT.md           <- Technical SEO validation
│   └── monitor/AGENT.md       <- Rank tracking & reporting
├── data/
│   ├── keywords.json          <- Research output
│   ├── content-plan.json      <- Strategy output
│   └── serp-analysis/         <- Per-keyword competitor data
├── content/                   <- ALL generated content (source of truth)
│   ├── _index.json            <- Master content inventory
│   ├── landing-pages/         <- Commercial-intent pages
│   ├── blog-posts/            <- Informational content
│   ├── guides/                <- Comprehensive resources
│   ├── faqs/                  <- Question-based pages
│   └── comparisons/           <- vs-style comparison pages
├── site/                      <- Astro project (renders from /content)
│   ├── astro.config.mjs
│   ├── package.json
│   ├── public/
│   │   ├── llms.txt
│   │   └── llms-full.txt
│   └── src/
│       ├── layouts/
│       ├── pages/resources/
│       └── components/
├── reports/                   <- Weekly performance reports
└── scripts/
    ├── setup.sh               <- Initial setup
    ├── publish.sh             <- Build + deploy
    └── report.sh              <- Pull GSC data + generate report
```

## Workflow

### Phase 1: Research (run once, refresh monthly)
```
1. Read agents/research/AGENT.md
2. Load config/brand.yaml for segment context
3. For each target segment defined in brand.yaml > target_segments:
   a. Generate keyword candidates from seed keywords
   b. Expand using "People Also Ask" patterns
   c. Classify by intent (commercial, informational, navigational)
   d. Estimate competition level
4. Save to data/keywords.json
```

### Phase 2: Strategy (run once, update as keywords expand)
```
1. Read agents/strategy/AGENT.md
2. Load data/keywords.json
3. Cluster keywords into topic groups
4. Map each cluster -> page type (landing, blog, guide, faq, comparison)
5. Prioritize by: low competition first, high commercial intent first
6. Output data/content-plan.json
```

### Phase 3: Content Generation (ongoing, batch by batch)
```
1. Read agents/content/AGENT.md
2. Load config/brand.yaml
3. Load data/content-plan.json, pick next batch
4. For each page:
   a. Read competitor analysis if available
   b. Generate full Markdown with YAML frontmatter
   c. Apply AEO formatting rules (see content agent)
   d. Save to content/[type]/[slug].md
   e. Update content/_index.json
5. Human reviews -> changes status to "published"
```

### Phase 4: SEO Validation (after each batch)
```
1. Read agents/seo/AGENT.md
2. For each new content piece:
   a. Validate frontmatter completeness
   b. Check meta title length (50-60 chars)
   c. Check meta description (150-160 chars)
   d. Validate FAQ schema structure
   e. Check internal link opportunities
   f. Verify direct-answer paragraph exists
3. Flag issues for fixing
```

### Phase 5: Publish (after review)
```
1. Run scripts/publish.sh
2. Astro reads all content/*.md with status: "published"
3. Builds static HTML with embedded schema
4. Deploys to Vercel
5. Your DNS/proxy routes {website}/resources/* to Vercel
```

### Phase 6: Monitor (weekly)
```
1. Read agents/monitor/AGENT.md
2. Pull Google Search Console data
3. For each published page:
   a. Update impressions, clicks, position in frontmatter
   b. Flag pages with position 5-20 (opportunity to push higher)
   c. Flag pages with declining position (need refresh)
   d. Flag pages with 0 impressions after 30 days (possible issue)
4. Generate weekly report in reports/
```

## Content Priority

Content generation order and segment prioritization is defined in two places:

1. **`config/brand.yaml` > `target_segments`** — Lists your target audience segments in priority order. Each segment includes seed keywords and buyer pain points that drive research and content direction.

2. **`data/content-plan.json`** — The strategy agent generates this from keyword research. It contains the specific pages to create, ordered by priority (low competition + high commercial intent first). Each entry specifies the page type, target keyword, and status.

When running `batch [N]`, content is generated in the order defined by `content-plan.json`. Update priorities there to control what gets written next.

A typical distribution per segment is:
- Landing pages (city + service combinations) — highest commercial intent
- Blog posts (guides, benchmarks, market insights) — informational traffic
- FAQs (common questions in your industry) — AI citation magnets
- Comparisons (vs-style pages) — decision-stage queries
- Guides (comprehensive resources) — authority builders

## AEO-Specific Rules (Apply to ALL Content)

These rules ensure content gets cited by AI search engines:

1. **Direct Answer First**: Every page MUST start with a 50-80 word paragraph that directly answers the target query. No fluff, no "In today's world..." preambles.

2. **FAQ in Frontmatter Only**: Minimum 3 FAQ items per page in YAML frontmatter `faqs` array. The layout auto-renders them. Do NOT add FAQ sections in the Markdown body — it creates duplicates.

3. **Structured, Scannable Headings**: Use clear H2/H3 hierarchy. Each section should be self-contained — AI models extract sections independently.

4. **Cite-Worthy Statements**: Include specific data points, statistics, and named sources. AI models prefer content that cites credible data.

5. **Entity Clarity**: Mention your company by its full name (from `brand.yaml > business.name`) in the first paragraph and at least 2 more times in the body. AI models need clear entity association.

6. **Geographic Specificity**: Always include relevant city/country names. "{service} in {city}" not just "{service}." Use locations from `brand.yaml > locations`.

7. **Freshness Signals**: Include current year in meta title where natural. Reference recent trends or data.

8. **Trust Markers**: Reference your company's key metrics (from `brand.yaml > differentiator.proof_points`) naturally within topic-relevant paragraphs — not as standalone boilerplate sections.

9. **No Walls of Text**: Keep paragraphs to 3-4 sentences max. Use whitespace. AI models skip dense, unstructured paragraphs.

10. **Internal Linking**: Every page MUST link to at least 2 DISTINCT other /resources pages (not the same page with different anchors). Link text must accurately describe the destination. Use anchor links to specific sections where relevant.

11. **No Boilerplate Repetition**: Each page must be 90%+ unique content. Do NOT repeat the same sections across pages. Designate one canonical page for your core process/differentiator — other pages should link to it, not repeat it.

12. **Meta Description Length**: MUST be exactly 150-160 characters. Validate before saving.

## AI Crawler Infrastructure

These files MUST exist and stay current at the site root:

- `robots.txt` — explicitly allows GPTBot, Claude-Web, PerplexityBot, Amazonbot; points to sitemap
- `llms.txt` and `llms-full.txt` — served at both `/llms.txt` and `/resources/llms.txt`
- `sitemap.xml` — at `/resources/sitemap.xml`, referenced from robots.txt

## Schema Markup (Auto-Generated by BaseLayout)

Every page automatically gets these JSON-LD schemas:
- **Organization** — company info, addresses, contact (from `brand.yaml`)
- **Service or Article** — based on `schema_type` frontmatter, includes `datePublished`/`dateModified`
- **FAQPage** — from frontmatter `faqs` array
- **BreadcrumbList** — auto-generated from page type and title
