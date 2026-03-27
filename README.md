# AEO Starter

A white-label system for generating SEO + AEO (Answer Engine Optimized) content that ranks on Google **and** gets cited by AI search engines (ChatGPT, Perplexity, Gemini, Claude).

## What is AEO?

Answer Engine Optimization is SEO adapted for AI-powered search. When someone asks ChatGPT or Perplexity a question, those systems pull answers from web content. AEO ensures your pages are structured so AI models find, understand, and cite them.

This system generates content with:
- Direct-answer paragraphs that AI models can quote verbatim
- FAQ schema markup that maps to conversational queries
- Structured headings that AI models parse independently
- `llms.txt` and `robots.txt` configured for AI crawlers
- JSON-LD schema (Organization, Service/Article, FAQPage, Breadcrumbs)

## Quick Start

### 1. Clone and configure

```bash
git clone <this-repo> my-aeo-site
cd my-aeo-site
```

Edit `config/brand.yaml` with your company details. At minimum, fill in:
- `business.name` — your company name
- `business.website` — your website URL (e.g., `https://www.example.com`)
- `business.description` — what your company does
- `differentiator` — your key selling points and proof metrics
- `target_segments` — your audience segments with seed keywords

### 2. Run setup

```bash
chmod +x scripts/setup.sh scripts/publish.sh
./scripts/setup.sh
```

This validates your brand config, installs dependencies, and runs a test build.

### 3. Generate content

Use Claude Code with the built-in commands:

```
research [segment]    # Research keywords for a target segment
plan                  # Generate content plan from keyword data
generate [topic]      # Write a single page
batch [N]             # Write the next N pages from the plan
```

### 4. Review and publish

1. Review generated content in the `content/` directory
2. Change `status: "draft"` to `status: "published"` in each file's frontmatter
3. Deploy:

```bash
./scripts/publish.sh
```

## brand.yaml Reference

The `config/brand.yaml` file drives all content generation. Here is what each section controls:

| Section | Purpose |
|---|---|
| `business` | Company name, website, email, tagline, description. Used in schema markup, meta tags, and content body. |
| `founders` | Founder names and LinkedIn URLs. Used for author attribution and E-E-A-T signals. |
| `values` | Company values. Woven into brand voice when relevant. |
| `locations` | Office addresses and service regions. Used for geographic targeting and local SEO. |
| `differentiator` | Your core selling point with proof metrics. Referenced in content as trust markers. |
| `process` | Your service delivery steps. Described on your canonical process page; other pages link to it. |
| `services` | Service categories and typical roles/deliverables. Drives landing page generation. |
| `target_segments` | Audience segments in priority order. Each has buyer titles, pain points, and seed keywords that drive research and content. |
| `target_industries` | Industries you serve. Used for industry-specific landing pages and content. |
| `brand_voice` | Tone, personality, do/don't rules, and sample phrasing. Applied to all generated content. |
| `clients` | Testimonials and social proof. Used tastefully in relevant content. |
| `competitors` | Competitor URLs for SERP analysis (internal use, not published). |
| `content_config` | URL structure, deployment method, and page type targets. |
| `pricing` | Internal pricing reference. Never published directly; guides how pricing topics are handled in content. |

## Deployment (Vercel)

The site is an Astro static site deployed to Vercel.

### First-time setup

1. Install the Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the `site/` directory to link your project
3. Configure your domain's `/resources/*` path to route to the Vercel deployment (typically via Cloudflare Worker, nginx proxy, or Vercel rewrites)

### Ongoing deploys

```bash
./scripts/publish.sh
```

This builds the Astro site and deploys to Vercel in one step. Only pages with `status: "published"` in their frontmatter are included.

### DNS / routing

The site renders at `/resources/*`. You need to route that path from your main domain to the Vercel deployment. Common approaches:
- **Cloudflare Worker** — proxy `/resources/*` requests to Vercel
- **Vercel rewrites** — if your main site is also on Vercel
- **Nginx reverse proxy** — `proxy_pass` for the `/resources` location

## Content Generation Workflow

The system follows a six-phase workflow managed by specialized agents:

1. **Research** — Keyword discovery and intent classification for each target segment
2. **Strategy** — Cluster keywords into topics, map to page types, prioritize by ROI
3. **Content** — Generate Markdown pages with YAML frontmatter, AEO formatting, and inline visuals
4. **SEO Validation** — Automated checks for meta length, FAQ structure, internal links, direct-answer paragraphs
5. **Publish** — Build static HTML with schema markup, deploy to Vercel
6. **Monitor** — Track Search Console data, flag opportunities, refresh underperformers

Each phase has an agent definition in `agents/[name]/AGENT.md` with detailed instructions.

## Project Structure

```
aeo-starter/
├── CLAUDE.md              # Claude Code instructions (load automatically)
├── README.md              # This file
├── config/
│   └── brand.yaml         # Brand configuration (edit this first)
├── agents/                # Agent instructions for each workflow phase
│   ├── research/AGENT.md
│   ├── strategy/AGENT.md
│   ├── competitor/AGENT.md
│   ├── content/AGENT.md
│   ├── seo/AGENT.md
│   └── monitor/AGENT.md
├── data/                  # Research and planning outputs
│   ├── keywords.json
│   ├── content-plan.json
│   └── serp-analysis/
├── content/               # Generated content (source of truth)
│   ├── _index.json        # Master inventory
│   ├── landing-pages/
│   ├── blog-posts/
│   ├── guides/
│   ├── faqs/
│   └── comparisons/
├── site/                  # Astro project
│   ├── astro.config.mjs
│   ├── package.json
│   └── src/
│       ├── layouts/       # BaseLayout with schema markup
│       ├── pages/         # Astro page routes
│       └── lib/           # Brand loader, content reader, SVG patterns
├── reports/               # Weekly performance reports
└── scripts/
    ├── setup.sh           # Initial setup and validation
    ├── publish.sh         # Build + deploy to Vercel
    └── report.sh          # Pull GSC data + generate report
```

## AEO Rules Summary

All content follows these rules to maximize AI citation:

- Every page starts with a 50-80 word direct answer (no preamble)
- Minimum 3 FAQs per page in YAML frontmatter (auto-rendered by layout)
- Company name appears 3+ times per page for entity clarity
- Geographic specificity in all location-relevant content
- Current year in meta titles for freshness signals
- Paragraphs capped at 3-4 sentences (AI skips dense text)
- 2+ internal links to distinct /resources pages per page
- 90%+ unique content per page (no boilerplate repetition)
- Meta descriptions exactly 150-160 characters
- AI crawler files (robots.txt, llms.txt, sitemap.xml) maintained at site root

See `CLAUDE.md` for the complete rule set.
