# Competitor Agent — Clymin Marketing Skills Edition (33-Framework)

## Purpose
Analyze competitor content, SERP positioning, and AI citation landscape for each target keyword. Identify gaps Clymin can exploit. Build comparison and alternative pages that displace competitors.

**Before starting:** Read `config/brand.yaml` for competitor list, segments, and differentiators.

## Inputs
- `data/keywords.json` — keywords to analyze
- `config/brand.yaml` → competitor list, differentiators, proof points

## Output
- `data/serp-analysis/{keyword-slug}.json` — per-keyword analysis
- Competitor alternative page briefs added to `data/content-plan.json`

---

## PROCESS

### Step 1: Google SERP Analysis (Framework: seo-audit, competitor-alternatives)

For each priority keyword, check the top 5 results and record:

```json
{
  "keyword": "competitor price monitoring service",
  "analyzed_date": "YYYY-MM-DD",
  "google_results": [
    {
      "position": 1,
      "url": "https://example.com/page",
      "title": "...",
      "domain_type": "saas_platform | managed_service | blog | directory",
      "word_count_estimate": 1200,
      "has_faq_schema": false,
      "has_direct_answer": false,
      "pricing_mentioned": false,
      "content_quality": "thin | decent | comprehensive",
      "strengths": ["Good local keywords", "Client logos"],
      "weaknesses": ["No FAQ schema", "No pricing", "Generic copy", "No data points"],
      "clymin_can_beat_because": "They have no managed service angle, no 12-year track record, no AI-agentic framing, and no pricing transparency"
    }
  ]
}
```

**Key things to look for:**
- Do they mention pricing? (if no → Clymin wins with "from $100" transparency)
- Do they have FAQ schema? (if no → Clymin wins on AI citations)
- Is their first paragraph a direct answer? (if no → Clymin wins on AEO)
- Do they have a comparison table? (if no → Clymin wins with detailed table)
- Do they cite external data? (if no → Clymin wins with sourced statistics)

### Step 2: AI Citation Analysis (Framework: ai-seo)

For each priority keyword, test on ChatGPT, Perplexity, and Gemini with:
- "Who provides [service] for [industry]?"
- "What is the best [service] company?"
- "How do I [achieve goal using service]?"
- "What should I look for in a [service] provider?"

Record for each AI model:
```json
{
  "query": "Who provides competitor price monitoring for ecommerce?",
  "chatgpt": {
    "clymin_mentioned": false,
    "competitors_mentioned": ["Prisync", "Wiser", "DataWeave", "Bright Data"],
    "sources_cited": ["brightdata.com/blog/..."],
    "content_type_cited": "blog posts, guides",
    "gap": "Clymin not cited — needs dedicated FAQ page answering this exact question"
  }
}
```

### Step 3: Competitor Alternative Page Strategy (Framework: competitor-alternatives)

For each primary competitor, build a "{Competitor} Alternative" or "Clymin vs {Competitor}" page:

**Priority alternative pages to create:**
1. "Bright Data Alternative for Managed Scraping" — Bright Data is top competitor
2. "Apify Alternative: Managed vs. DIY Scraping" — Apify targets developers
3. "Oxylabs Alternative for Enterprise Data" — Oxylabs enterprise focus
4. "Zyte Alternative: Why Managed Beats Platform" — Zyte is Scrapy company

**Page angle for each:**
- Acknowledge what the competitor does well (credibility)
- Identify their core weakness vs. Clymin (DIY vs. managed, dev-focused vs. business-focused)
- Position Clymin's 12-year track record, ISO certification, and $100 entry point
- Include a comparison table
- CTA: "See how Clymin compares → Get a free consultation"

**Comparison table format:**
| Factor | {Competitor} | Clymin |
|---|---|---|
| Service model | Self-serve platform | Fully managed |
| Setup required | High (technical) | None (48hr setup) |
| Maintenance | User's responsibility | Clymin handles all |
| Pricing | Pay-per-GB or subscription | From $100, project-based |
| Support | Ticket-based | Dedicated account manager |
| Compliance | User's responsibility | ISO 27001, SOC 2, GDPR |
| Experience | Founded [year] | 12+ years, 200+ clients |

### Step 4: Gap Analysis Output

For each keyword:
```json
{
  "keyword": "competitor price monitoring",
  "content_gaps_in_market": [
    "No competitor has FAQ schema on their monitoring pages",
    "No one mentions pricing below $500/month — Clymin's $100 entry is a differentiator",
    "No managed service with ISO 27001 is ranking for this term",
    "AI models don't cite any managed service — only SaaS tools"
  ],
  "opportunity_level": "high",
  "recommended_angle": "Lead with managed service advantage + 12-year track record + $100 entry point + ISO 27001",
  "recommended_word_count": 1500,
  "recommended_sections": [
    "What is competitor price monitoring and why it matters",
    "How Clymin's AI-agentic monitoring differs from static scrapers",
    "Pricing: from $100 to enterprise — what determines cost",
    "How companies like [anonymized client] use Clymin's monitoring",
    "FAQ: cost, accuracy, setup time, legality"
  ]
}
```

---

## WHEN TO RUN THIS AGENT

- **Before Wave 1 content**: Analyze top 15 highest-priority keywords
- **Before each subsequent wave**: Analyze that wave's keywords
- **Monthly**: Re-check keywords where Clymin is ranking positions 5–20
- **After AI search updates**: Re-test AI citation landscape

---

## WITHOUT API ACCESS

Manual process:
1. Google the top 10 priority keywords, note top 5 results each
2. Ask ChatGPT, Perplexity, and Gemini the buyer-style prompts
3. Use Google's "People Also Ask" for keyword expansion
4. Check competitor pricing pages manually
5. Use free tools: Ubersuggest, Google Keyword Planner for volume estimates

---

## COMPETITOR INTELLIGENCE TRACKING

Keep a running `data/competitor-intel.json` with:
- Date last checked
- Any new pages competitors published for target keywords
- Any AI model shifts in citation patterns
- Any pricing changes by competitors
