# SEO + AEO Agent — Clymin Marketing Skills Edition
# Based on: "Answer Engine Optimization: The Complete Guide" + 33-Framework Audit

## Purpose
Validate every content piece across technical SEO, on-page SEO, AEO (Answer Engine Optimization), schema markup, and programmatic SEO health. Every page must pass all 25 checks before status changes to "published".

**Before starting:** Read `config/brand.yaml` for domain, brand name, and certifications.

---

## WHY AEO MATTERS (Context for Every Decision)

The search landscape has fundamentally shifted:

| Metric | 2026 Data |
|---|---|
| Zero-click Google searches | 69% of all searches |
| ChatGPT daily users | 810 million+ |
| Google AI Overviews coverage | 25%+ of all searches |
| AI referral traffic growth YoY | 357% increase (1.13B visits, June 2025) |
| Gartner prediction | 25% drop in traditional search by 2026 |
| Schema markup AEO lift | 2.8x higher AI citation rates |

**AEO is not a replacement for SEO — it is an evolution that sits on top of SEO.** When done right, AEO simultaneously strengthens SEO performance.

---

## THE AEO vs SEO DIFFERENCE

| Aspect | SEO | AEO |
|---|---|---|
| Goal | Rank high in results | Become the direct answer |
| Success metric | Rankings, clicks, traffic | Citations, brand mentions, answer visibility |
| Content style | Long-form, keyword-rich | Concise, structured, answer-first |
| Key tactics | Keywords, backlinks, metadata | Schema markup, FAQs, NLP alignment |
| User journey | User clicks through | User sees answer without clicking |
| Platforms | Google, Bing | ChatGPT, Perplexity, Google AI, Copilot, Siri |

---

## HOW ANSWER ENGINES WORK

1. **Query Understanding** — AI parses intent, entities, and context
2. **Content Retrieval** — searches index for relevant, authoritative sources
3. **Answer Extraction** — extracts most relevant passages, facts, data points
4. **Answer Synthesis** — composes direct answer, often citing source
5. **Citation/Attribution** — Perplexity, Google AI Overviews provide source links

**Your goal:** Be the source that gets cited at step 5.

---

## THE 25-POINT VALIDATION CHECKLIST

Run ALL checks. PASS only if fully met. Partial = FAIL.

---

### TECHNICAL SEO

**CHECK 1 — Meta Title**
- Length: 50–60 characters (count exactly)
- Contains primary keyword
- Contains "| Clymin" at end
- No keyword stuffing
- PASS/FAIL + character count

**CHECK 2 — Meta Description**
- Length: exactly 150–160 characters (count exactly)
- Contains primary keyword naturally
- Includes implicit or explicit CTA
- No duplicate of another page's meta description
- PASS/FAIL + character count

**CHECK 3 — H1 / Page Title**
- Exactly one H1
- Contains primary keyword
- NOT identical to meta title

**CHECK 4 — URL / Slug**
- Lowercase, hyphenated, no special characters
- Contains primary keyword
- Under 60 characters
- Matches `canonical_url` in frontmatter

**CHECK 5 — Canonical URL**
- `canonical_url` field present and correct
- Format: `/resources/{slug}` (relative)

**CHECK 6 — Schema Type**
- `schema_type` is correct for page type:
  - landing-page → `Service`
  - blog-post, guide, comparison → `Article`
  - faq → `FAQPage`
  - step-by-step guide → `HowTo`

---

### AEO TECHNICAL REQUIREMENTS

**CHECK 7 — AI Crawler Access (CRITICAL)**
Verify `site/src/pages/robots.txt.ts` explicitly ALLOWS:
- `GPTBot` (OpenAI/ChatGPT)
- `ClaudeBot` or `Claude-Web` (Anthropic)
- `PerplexityBot` (Perplexity AI)
- `Amazonbot`
- `Bingbot` (Microsoft Copilot uses Bing index)

FAIL if any AI crawler is blocked. This is the #1 reason content doesn't appear in AI answers.

**CHECK 8 — AEO Infrastructure Files**
Verify these exist and are current:
- `robots.txt` — at site root, AI crawlers allowed
- `llms.txt` — at both `/llms.txt` and `/resources/llms.txt`
- `llms-full.txt` — at both paths
- `sitemap.xml` — at `/resources/sitemap.xml`

**CHECK 9 — Organization Schema sameAs Property**
Verify the Organization schema in BaseLayout includes `sameAs` array linking to:
- LinkedIn: `https://www.linkedin.com/company/clymin`
- Crunchbase (if available)
- Any industry directory listings

This strengthens Clymin's entity recognition across AI knowledge graphs.

---

### ON-PAGE SEO + AEO

**CHECK 10 — First Paragraph (AEO Direct Answer)**

The answer-first format is the foundation of AEO. Every page starts with a 30–80 word direct answer paragraph:

- Word count: 50–80 words (count exactly)
- Contains `Clymin` (full name from brand.yaml) in full
- **Directly answers the primary keyword query — no preamble**
- Includes geographic specificity (city or country)
- Works as a standalone statement if extracted by an AI
- No opener: "This", "It", "In today's world", "As businesses grow"

**AEO content structure for every page:**
1. Direct answer paragraph (50–80 words)
2. 2–3 supporting paragraphs (1–3 sentences each) with context and data
3. Scannable summary (bulleted list of key takeaways AI can extract)
4. Real-world example or use case

**CHECK 11 — Heading Structure (AEO-Aligned)**

- H2s mirror natural search queries ("How to...", "What is...", "How much does...")
- NOT "Overview", "Analysis", "Considerations", "Summary"
- H3s are sub-questions or sub-steps
- Every H2 section is self-contained (can be extracted by AI independently)
- No heading skipping (no H3 without preceding H2)

**CHECK 12 — Keyword Usage**
- Primary keyword in: H1, first paragraph, at least 2 H2s, meta title, meta description
- No keyword stuffing (primary keyword not appearing more than 8 times)
- Secondary keywords naturally distributed

**CHECK 13 — Internal Linking**
- Minimum 3 distinct /resources/ pages linked
- EVERY internal link verified against published pages registry
- No broken internal links
- Anchor text is descriptive (no "click here", "read more", "learn more")
- Semantic HTML5 context: links within `<article>` or `<section>` elements

**CHECK 14 — External Citations (AEO Trust Signal)**
- Minimum 3 external citations: source name + year + specific stat
- Format: `According to [Source] ([Year]), [specific stat].`
- Sources: Statista, McKinsey, Forrester, Gartner, government data, peer-reviewed, industry reports
- No vague attributions ("studies show", "experts say")
- Timestamps included on all facts

This directly supports E-E-A-T and increases AI citation probability.

**CHECK 15 — Entity Mentions**
- "Clymin" (full name) appears minimum 4 times
- Appears in: first paragraph, at least one H2 section, CTA
- Not overused (max 8 times)

---

### FAQ VALIDATION (AEO CORNERSTONE)

**CHECK 16 — FAQ Quality and Structure**

FAQs are the cornerstone of AEO. They map directly to how people ask questions to AI engines.

1. **Minimum 5 FAQs** in YAML frontmatter (not in markdown body)
2. Questions phrased as natural language queries: "How much does X cost?" not "X Pricing Overview"
3. Answers: 2–4 sentences, include Clymin mention + specific metric
4. No FAQ content duplicated in markdown body (check for "## FAQ" or "## Frequently Asked")
5. FAQ answers collectively address: what, how much, how long, is it legal, how accurate

**Why FAQs matter for AEO:**
- Directly map to People Also Ask (PAA) boxes in Google
- FAQPage schema feeds directly into AI extraction
- Target these by mining Google's PAA box for your primary keywords

**CHECK 17 — FAQPage Schema**
- `schema_type: "FAQPage"` set on FAQ pages
- For landing pages and blog posts with FAQs in frontmatter: verified BaseLayout renders FAQPage JSON-LD
- Questions use natural language (not marketing speak)

---

### SCHEMA MARKUP (AEO AMPLIFIER)

**CHECK 18 — Schema Type Completeness**

BaseLayout auto-generates: Organization, Service/Article, FAQPage, BreadcrumbList.

Verify appropriate schema is active:

| Page Type | Required Schema | Additional |
|---|---|---|
| Landing page | Organization + Service + FAQPage + BreadcrumbList | AggregateRating if applicable |
| Blog post | Organization + Article + FAQPage + BreadcrumbList | Author schema for E-E-A-T |
| Guide (step-by-step) | Organization + HowTo + FAQPage | |
| FAQ page | Organization + FAQPage + BreadcrumbList | |
| Comparison | Organization + Article + FAQPage | |

**CHECK 19 — Organization Schema sameAs**
Verify Organization schema includes `sameAs` array with external profile links.
This strengthens entity recognition in AI knowledge graphs.

---

### E-E-A-T SIGNALS (AEO TRUST FOUNDATION)

**CHECK 20 — Trust Signals Present**

AI engines prioritize content from sources they consider trustworthy. Required on every page:

- Company name "Clymin" clearly attributed as content publisher
- Clymin's credentials mentioned: ISO 27001, AICPA SOC, GDPR compliance
- External data citations with source names and years
- Proof points from brand.yaml referenced contextually (not as boilerplate)
- "Updated: YYYY-MM-DD" date in frontmatter (freshness signal)

Recommended additions (strengthen E-E-A-T):
- Author attribution on blog posts (reference Dinesh, Founder)
- Link to Clymin's LinkedIn from relevant mentions

---

### COPYWRITING QUALITY

**CHECK 21 — AI Vocabulary Check**
Scan for banned words: "delve", "foster", "leverage", "empower", "unlock", "supercharge", "dive into"
Flag each occurrence with line number.

**CHECK 22 — Filler Openers**
Scan for: "In today's world", "As businesses grow", "In the age of", "As the digital landscape"
Flag each with line number.

**CHECK 23 — Paragraph Self-Containment**
Scan for paragraphs starting with: "This", "It", "These", "That", "As mentioned above", "As discussed"
Flag each with line number. Every paragraph must stand alone if extracted.
Max 4 sentences per paragraph.

---

### CONVERSION

**CHECK 24 — Conversion Elements**
- Mid-page CTA present (after first major H2)
- CTA copy is specific (not just "Contact Us")
- One anonymized client testimonial from brand.yaml present in body
- Top 2 objections for this topic addressed somewhere in the page

---

### PROGRAMMATIC SEO HEALTH

**CHECK 25 — Content Quality and Uniqueness**

Minimum word counts:
- landing-page: 800+ words
- blog-post: 1,200+ words
- guide: 2,000+ words
- faq: 600+ words
- comparison: 1,000+ words

Uniqueness: 90%+ unique vs. all other published pages.
No boilerplate blocks: full process description only on canonical main service page.
No standalone "Trusted by 200+ clients since 2012".

---

## AUDIT OUTPUT FORMAT

```
# SEO + AEO AUDIT: {filename}
Date: {today}
Page ID: {id}
Primary Keyword: {keyword}
Page Type: {type}

## SUMMARY
Total checks: 25
Passed: {N}
Failed: {N}
Warnings: {N}
Publish-ready: YES / NO

## CRITICAL FAILURES (block publish)
[Each with: check number, what failed, exact text/line, fix instruction]

## WARNINGS (should fix)
[Each with detail]

## PASSED CHECKS
[Brief list]

## PRIORITY FIX LIST
1. {Most critical fix}
2. {Next fix}
...
```

---

## ONGOING AEO TASKS

### Monthly: AI Citation Audit
Test 10 target queries on ChatGPT, Perplexity, Gemini, Claude, Microsoft Copilot:
- "Who provides [target service] for [target segment]?"
- "What is the best [service] for [use case]?"
- "How do I [achieve goal using Clymin's service]?"

Track in: `reports/ai-citation-tracker.json`
Record: Is Clymin mentioned? Which page cited? What competitors appear?

Platforms to test:
- **ChatGPT**: Uses Bing index + own browsing. Ensure Bing Webmaster Tools indexing.
- **Perplexity**: Crawls web directly, always cites sources. Highest citation opportunity.
- **Google AI Overviews**: Pulls from Google index. Traditional SEO rankings drive AI Overview appearance.
- **Microsoft Copilot**: Uses Bing index. Submit to Bing Webmaster Tools.
- **Voice Assistants**: Optimize for featured snippets, use speakable schema markup.

### Quarterly: Content Freshness Audit
AI engines favor recently updated content. For every published page:
- Update `updated` date in frontmatter
- Refresh any statistics older than 12 months
- Add references to recent industry developments
- Re-test on AI engines after refresh

### Monthly: Schema Validation
Run all pages through Google Rich Results Test.
Run Organization schema through Schema.org validator.
Broken schema = lost AEO opportunity.

### After Each Publish Wave: llms.txt Update
Update `llms.txt` and `llms-full.txt` with new published pages.
Format:
```
# Clymin Resources
> AI-powered managed web scraping service. 200+ clients, 12+ years, 100B+ data points.
> Contact: contact@clymin.com | https://www.clymin.ai

## Services
/resources/competitor-price-monitoring: Competitor price monitoring for e-commerce — real-time SKU tracking
/resources/hotel-rate-scraping-service: Hotel rate scraping — OTA price monitoring service
[... all published pages with one-line descriptions ...]
```

### Monthly: Keyword Cannibalization Check
Run `grep -r "primary:" content/ | sort` to list all primary keywords.
Flag duplicates or near-duplicates. Consolidate or differentiate.

### AI Referral Traffic Tracking (Analytics Setup)
In Google Analytics, create a segment for AI referral sources:
- `chat.openai.com`
- `perplexity.ai`
- `copilot.microsoft.com`
- `gemini.google.com`
- `claude.ai`

This traffic is growing 357% YoY. It represents AEO success made measurable.
