# Strategy Agent — Clymin Marketing Skills Edition (33-Framework)

## Purpose
Turn keyword research into a prioritized, conversion-optimized content plan. Every content cluster must serve a specific buyer stage, address a specific objection, and contribute to Clymin's lead generation flywheel.

**Before starting:** Read `config/brand.yaml` for segments, services, and canonical pages. Read `data/keywords.json` for research output.

## Inputs
- `data/keywords.json` — from Research Agent
- `config/brand.yaml` — services, segments, industries, canonical pages
- `content/_index.json` — existing content (to avoid duplicates)

## Output
- `data/content-plan.json` — full content blueprint

---

## CONTENT STRATEGY FRAMEWORK (Frameworks: content-strategy, site-architecture, marketing-ideas)

### The Hub-and-Spoke Model

Every segment builds a hub-and-spoke content cluster:

```
SEGMENT HUB (landing page — canonical)
    ├── SPOKE 1: Problem awareness blog posts (3-5)
    ├── SPOKE 2: How-to guides (1-2)
    ├── SPOKE 3: FAQ pages (2-3)
    ├── SPOKE 4: Comparison pages (2-3)
    ├── SPOKE 5: Sub-service landing pages (2-5)
    └── SPOKE 6: Case study / proof page (1)
```

Every spoke links back to the hub. The hub links to all spokes. This creates topical authority that AI models recognize.

### Content Mix by Segment

For each segment, target this distribution:
- **Landing pages**: 6–8 (core service + city variations + sub-services)
- **Blog posts**: 6–8 (awareness + thought leadership + trends)
- **Guides**: 1–2 (comprehensive playbook — gated with lead magnet)
- **FAQs**: 2–3 (cost, legality, accuracy — AI citation magnets)
- **Comparisons**: 2–3 (vs competitors, vs DIY, vs alternatives)

### Buyer Journey Mapping (Framework: sales-enablement, revops)

Every page must map to a buyer stage:

| Stage | Content Type | CTA Goal | Conversion Signal |
|---|---|---|---|
| Awareness | Blog posts, trend reports | Email capture / lead magnet | Downloaded guide or subscribed |
| Consideration | Guides, comparisons, FAQs | Book a call | Visited pricing FAQ + comparison |
| Evaluation | Landing pages, case studies | Free consultation | Requested sample dataset |
| Decision | Case studies, ROI calculators | Book a meeting | Clicked "Book a Meeting" |

---

## PRIORITIZATION RULES (Framework: content-strategy, programmatic-seo)

### Wave Assignment

**Wave 1 — Highest ROI (do first):**
- Priority 1 segment (E-Commerce) landing pages
- Any keyword with priority_score ≥ 8.5
- Comparison pages (rank fast, high conversion intent)
- FAQ pages for most-asked objection questions (legality, cost, accuracy)

**Wave 2:**
- Priority 2 segment (Travel) landing pages + blog posts
- E-Commerce blog posts + guides

**Wave 3:**
- Priority 3-4 segments (Real Estate, Food)
- Cross-segment content (general scraping topics)

**Wave 4:**
- Priority 5 segment (Financial Services) — fill the current gap
- Local SEO pages (city-specific)
- Refresh underperforming Wave 1 pages

### Within Each Wave, Order By:
1. Commercial intent landing pages first (fastest to convert)
2. Comparison pages (rank fast, high decision-stage traffic)
3. FAQ pages (AI citation magnets, fast to rank)
4. Blog posts (longer runway, but compound over time)
5. Guides (most effort, gated for lead capture)

---

## CONTENT GAP ANALYSIS (Current Gaps to Fill)

Based on the 33-framework audit, these gaps MUST be addressed:

### Critical Gaps (Missing Entirely):
1. **Financial Services guides** (0 currently — highest-value buyer segment)
   - "How to Build an Alternative Data Pipeline for Investment Research"
   - "ESG Data Collection: A Compliance-First Playbook for 2026"

2. **Financial Services FAQs** (0 currently)
   - "How Much Does Alternative Data Scraping Cost for Hedge Funds?"
   - "Is Web Scraping for Investment Research Legal?"
   - "How Accurate Is Financial Data Extracted by Web Scraping?"

3. **Case studies** (0 currently — critical for enterprise buyers)
   - One per segment (5 total), anonymized per brand.yaml client guidelines
   - Format: Challenge → Clymin Approach → Results (with specific metrics)

4. **Food & Quick Commerce comparisons** (1 currently — need 2 more)
   - "DoorDash vs Uber Eats Data: Which Platform Delivers Better Intelligence?"
   - "Swiggy vs Zomato Data Quality: A Side-by-Side Analysis"

5. **Cross-segment authority content** (missing)
   - "The Complete Guide to B2B Web Scraping Compliance in 2026"
   - "How to Evaluate a Managed Scraping Service: 10 Questions to Ask"

### High-Priority Additions:
- Local SEO cluster: San Francisco, Hyderabad, Dubai, Singapore, London
- "Alternative to {competitor}" pages: Bright Data alternative, Apify alternative, Oxylabs alternative
- Interactive tool concept: "Data Scraping ROI Calculator" (free tool for lead gen)

---

## PAGE BRIEF TEMPLATE

For each planned page, create a brief:

```json
{
  "page_id": "p-XXX",
  "cluster_id": "cl-XXX",
  "title_suggestion": "{Primary Keyword} | Clymin",
  "slug": "{slug}",
  "page_type": "landing-page | blog-post | guide | faq | comparison",
  "segment": "{segment from brand.yaml}",
  "primary_keyword": "{exact keyword}",
  "secondary_keywords": ["{kw2}", "{kw3}"],
  "intent": "commercial | informational | comparison | faq",
  "buyer_stage": "awareness | consideration | evaluation | decision",
  "target_persona": "{buyer title from brand.yaml}",
  "content_angle": "Lead with [specific differentiator]. Address [specific objection]. Include [specific proof point].",
  "must_include": [
    "Direct answer to primary keyword in first paragraph",
    "External citation: [Source] + specific stat",
    "Anonymized client reference: [which client description]",
    "Pricing mention: starting from $100",
    "Internal link to: [specific page slugs]",
    "FAQ covering: [list 5 specific questions]",
    "CTA: [specific offer]"
  ],
  "internal_links_to": ["slug-1", "slug-2", "slug-3"],
  "word_count_target": 1200,
  "priority_score": 8.5,
  "status": "planned",
  "wave": 1
}
```

---

## INTERNAL LINKING STRATEGY (Framework: site-architecture)

Plan internal links as you build the content plan. Every page needs outbound links TO:

| Page Type | Must Link To |
|---|---|
| Landing page | 1 related guide + 1 related FAQ + 1 related blog post |
| Blog post | 1 relevant landing page + 1 related blog or guide |
| Guide | 3–5 relevant landing pages + 1 comparison |
| FAQ page | The most relevant landing page (always) + 1 blog post |
| Comparison | Relevant landing page as "recommended option" |
| Case study | The relevant service landing page (always) |

### Hub Page (clymin.ai/resources) Link Strategy
Every page type should be discoverable from the hub:
- Services tab → landing pages
- Blog tab → blog posts
- Guides tab → guides (with lead magnet CTAs visible in summary)
- FAQs tab → FAQ pages
- Comparisons tab → comparison pages

**Missing from current nav:** The /resources hub is NOT in Clymin's main site navigation. This must be fixed. Document in navigation task for main site team.

---

## FREE TOOL STRATEGY (Framework: free-tool-strategy)

High-priority free tools to plan in the content strategy:

1. **Data Scraping ROI Calculator**
   - Input: industry, current manual hours/week, data points needed
   - Output: estimated cost savings with Clymin vs manual
   - Lead capture: email to get the full report
   - Placement: /resources/tools/roi-calculator

2. **Scraping Compliance Checker**
   - Input: target website type + country
   - Output: compliance risk level + Clymin's approach
   - Lead capture: book a consultation for complex cases

These are planned pages — add to Wave 3 content plan.

---

## LEAD MAGNET STRATEGY (Framework: lead-magnets)

One gated asset per segment (email capture):

| Segment | Lead Magnet | Format |
|---|---|---|
| E-Commerce | "2026 Competitor Price Monitoring Playbook" | PDF guide |
| Travel | "OTA Rate Parity Monitoring Checklist" | PDF checklist |
| Real Estate | "Property Data Extraction: Source Comparison Guide" | PDF |
| Food & QC | "Food Delivery Intelligence Setup Guide" | PDF |
| Financial | "Alternative Data Due Diligence Checklist" | PDF |

Add to highest-traffic guide in each segment as gated download.

---

## OUTPUT FORMAT

Save to `data/content-plan.json`:

```json
{
  "metadata": {
    "generated_date": "YYYY-MM-DD",
    "total_pages_planned": 120,
    "by_wave": { "1": 30, "2": 30, "3": 30, "4": 30 },
    "by_type": {
      "landing-page": 40,
      "blog-post": 40,
      "guide": 12,
      "faq": 15,
      "comparison": 13
    },
    "by_segment": {
      "ecommerce": 30,
      "travel": 25,
      "real-estate": 20,
      "food-delivery": 20,
      "financial": 20,
      "cross-segment": 5
    },
    "gaps_addressed": [
      "Financial Services guides added",
      "Financial Services FAQs added",
      "Case studies added for all 5 segments",
      "Competitor alternative pages added",
      "Free tool concepts added"
    ]
  },
  "pages": [ { "...page brief..." } ]
}
```
