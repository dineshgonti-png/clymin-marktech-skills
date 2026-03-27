# Clymin Marketing Skills — AEO Content System
# 33-Framework Edition | dineshgonti-png/clymin-marktech-skills

> Generate content that scores 10/10 across all 33 marketing skill frameworks.
> Every page ranks on Google AND gets cited by AI search engines (ChatGPT, Perplexity, Gemini, Claude).

## FIRST: Always Load Brand Memory

**Read `config/brand.yaml` before doing anything.** It contains:
- Company name, tagline, description, positioning
- 7 anonymized client references (use these — never real brand names)
- Pricing: from $100, use-case based
- Brand voice: what to say and what never to say
- Competitor list, locations, certifications

## Quick Commands

| Command | What it does |
|---|---|
| `research [segment]` | Keyword research for a target segment |
| `plan` | Generate/update content plan from keyword data |
| `generate [topic]` | Generate a single 10/10-scoring content page |
| `batch [N]` | Generate next N pages from content plan |
| `seo-check [file]` | Run 20-point SEO validation on a content piece |
| `audit [file]` | Full 25-check audit (SEO + copy + AEO + conversion) |
| `publish` | Build Astro site and deploy to Vercel |
| `report` | Weekly performance report from Search Console |
| `refresh [file]` | Rewrite an underperforming content piece |
| `inventory` | Show content inventory summary |

## Agent System (6 Agents, 33 Frameworks)

| Agent | File | Frameworks Covered |
|---|---|---|
| Research | `agents/research/AGENT.md` | seo-audit, ai-seo, content-strategy, competitor-alternatives, marketing-psychology |
| Strategy | `agents/strategy/AGENT.md` | content-strategy, site-architecture, programmatic-seo, lead-magnets, free-tool-strategy, launch-strategy |
| Competitor | `agents/competitor/AGENT.md` | competitor-alternatives, seo-audit, ai-seo, pricing-strategy, paid-ads |
| Content | `agents/content/AGENT.md` | copywriting, copy-editing, page-cro, marketing-psychology, ai-seo, schema-markup, social-content, email-sequence, sales-enablement, lead-magnets, form-cro, pricing-strategy, revops, cold-email |
| SEO | `agents/seo/AGENT.md` | seo-audit, ai-seo, schema-markup, programmatic-seo, analytics-tracking, ab-test-setup |
| Monitor | `agents/monitor/AGENT.md` | analytics-tracking, ab-test-setup, churn-prevention, revops, referral-program, paid-ads, social-content |

## 10/10 Scoring Requirements (All Pages)

Every generated page must pass these to score 10/10:

### SEO (Frameworks: seo-audit, ai-seo, schema-markup)
- [ ] Meta title: 50–60 chars, contains primary keyword
- [ ] Meta description: EXACTLY 150–160 chars, includes CTA signal
- [ ] H1/H2s mirror natural search queries
- [ ] 3+ distinct internal /resources/ links (all verified to exist)
- [ ] 3+ external citations (source + year + specific stat)
- [ ] schema_type correctly set for page type
- [ ] FAQ schema: minimum 5 items in frontmatter only (not in body)

### AEO (Framework: ai-seo)
- [ ] First paragraph: 50–80 words, direct answer, Clymin named, geographic specificity
- [ ] Clymin mentioned 4+ times total
- [ ] No paragraph starts with "This", "It", "These", "As mentioned above"
- [ ] All H2/H3 headings self-contained and query-shaped
- [ ] robots.txt, llms.txt, sitemap.xml current

### Copywriting (Frameworks: copywriting, copy-editing)
- [ ] Zero AI vocabulary: no delve, foster, leverage, empower, unlock, supercharge
- [ ] Zero filler openers: no "In today's world...", "As businesses grow..."
- [ ] No standalone "Trusted by 200+ clients" boilerplate
- [ ] Benefits over features throughout
- [ ] Active voice always
- [ ] Max 4 sentences per paragraph

### Conversion (Frameworks: page-cro, marketing-psychology)
- [ ] Mid-page CTA with specific copy (not generic "Contact Us")
- [ ] One anonymized client testimonial from brand.yaml before final CTA
- [ ] Top 2 objections addressed (cost, legality, accuracy, or technical complexity)
- [ ] 3+ psychological principles applied (specificity, authority, social proof, loss aversion, anchoring, or reciprocity)

### Pricing (Framework: pricing-strategy)
- [ ] Landing pages: full comparison table (Clymin vs In-house vs DIY)
- [ ] All pages: "from $100" mentioned where naturally relevant
- [ ] Pricing framed as ROI, not just cost

### Distribution (Frameworks: social-content, email-sequence, cold-email)
- [ ] social_hook in frontmatter (non-empty)
- [ ] email_subject in frontmatter (non-empty)
- [ ] Landing pages: sales_brief in frontmatter

### Word Count Minimums
- Landing pages: 800+ words
- Blog posts: 1,200+ words
- Guides: 2,000+ words
- FAQs: 600+ words
- Comparisons: 1,000+ words

---

## Content Inventory

Current content in `content/`:
- `landing-pages/` — 18 pages (commercial intent)
- `blog-posts/` — 15 pages (informational)
- `guides/` — 7 pages (comprehensive resources)
- `faqs/` — 9 pages (question-based)
- `comparisons/` — 10 pages (decision stage)

**Gaps to fill (high priority):**
- Financial Services guides: 0 → need 2
- Financial Services FAQs: 0 → need 3
- Case studies: 0 → need 5 (one per segment)
- Competitor alternative pages: 0 → need 4
- Food delivery comparisons: 1 → need 2 more
- Free tool pages: 0 → need 1 (ROI calculator concept)

---

## Workflow

### Phase 1: Research
```
1. Read agents/research/AGENT.md
2. Load config/brand.yaml for segment context
3. For each target_segment in brand.yaml:
   a. Expand seed keywords using all 8 expansion patterns
   b. Mine People Also Ask for FAQ/blog topics
   c. Classify by intent (commercial/informational/comparison/faq)
   d. Score by: commercial intent × competition level × AI citation gap
4. Save to data/keywords.json
```

### Phase 2: Strategy
```
1. Read agents/strategy/AGENT.md
2. Load data/keywords.json
3. Build hub-and-spoke clusters per segment
4. Map each cluster → page type → buyer stage
5. Prioritize: Wave 1 = commercial intent + low competition
6. Add gaps to plan: Financial Services, case studies, competitor alternatives
7. Output data/content-plan.json
```

### Phase 3: Competitor Analysis
```
1. Read agents/competitor/AGENT.md
2. For each Wave 1 keyword: analyze top 5 SERP results
3. Test target queries on ChatGPT/Perplexity/Gemini
4. Identify gaps: pricing not shown, no FAQ schema, no managed service angle
5. Save to data/serp-analysis/{keyword-slug}.json
```

### Phase 4: Content Generation
```
1. Read agents/content/AGENT.md (full read — all rules)
2. Load config/brand.yaml
3. For each page brief in data/content-plan.json:
   a. Answer 7 pre-writing checklist questions
   b. Build published pages registry for internal link validation
   c. Write content following ALL 33-framework rules
   d. Create SVG images (OG + hero)
   e. Update content/_index.json
4. Run: /generate [page-id]
```

### Phase 5: SEO Validation
```
1. Read agents/seo/AGENT.md
2. For each new page: run all 20 SEO checks
3. Run: /audit content/{type}/{slug}.md
4. Fix all failures before changing status to "published"
```

### Phase 6: Publish
```
1. scripts/publish.sh
2. Astro reads content/*.md with status: "published"
3. Builds static HTML with schema markup
4. Deploys to Vercel
```

### Phase 7: Monitor
```
1. Read agents/monitor/AGENT.md
2. Weekly: pull GSC data, update frontmatter, generate report
3. Weekly: test 5 queries on ChatGPT/Perplexity/Gemini for AI citation
4. Monthly: deep dive on segment performance, new keyword discovery, A/B test results
```

---

## AEO Infrastructure (Keep Current)

These files MUST exist and stay updated:
- `robots.txt` — allows GPTBot, Claude-Web, PerplexityBot, Amazonbot
- `llms.txt` — at both /llms.txt and /resources/llms.txt
- `llms-full.txt` — at both paths
- `sitemap.xml` — at /resources/sitemap.xml

Update llms.txt after each publish wave with new page summaries.

---

## Navigation Fix Required (Main Clymin Site)

The /resources hub is NOT in clymin.ai's main navigation. This must be fixed by the main site developer:

**Add to main navigation:**
```html
<a href="https://www.clymin.ai/resources">Resources</a>
```

**Location:** Between "Blog" and "Contact Us" in the main nav.

**Also add footer link** in the "Quick Links" section:
```html
<a href="https://www.clymin.ai/resources">Resources Hub</a>
```

This is a high-priority fix — the resources hub is invisible to homepage visitors without it.

---

## Deployment

```bash
./scripts/publish.sh
```

Requires: Vercel CLI installed, project linked, `/resources/*` routed from clymin.ai to Vercel.
