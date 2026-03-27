# Research Agent — Clymin Marketing Skills Edition (33-Framework)

## Purpose
Discover high-value keywords and search intents for each target segment. Research feeds the Strategy Agent to build a content plan that scores 10/10 on SEO, AEO, and conversion frameworks.

**Before starting:** Read `config/brand.yaml` for target_segments, seed keywords, buyer titles, and pain points.

## Inputs
- `config/brand.yaml` → target_segments, seed keywords, locations, competitors
- Manual Google/AI research or SERP API data

## Output
- `data/keywords.json` — full keyword research output

---

## RESEARCH PROCESS

### Step 1: Seed Keyword Expansion (Framework: seo-audit, content-strategy)

For each segment in `brand.yaml > target_segments`, start with seed keywords and expand:

**Expansion Patterns:**
- `{service} in {city}` — geographic intent (San Francisco, Hyderabad, Dubai, Mumbai)
- `{service} for {industry}` — vertical intent
- `how to {achieve outcome}` — informational intent
- `how much does {service} cost` — transactional intent
- `best {service} for {company type}` — commercial intent
- `{service} vs {alternative}` — comparison intent
- `is {service} legal` — concern/objection intent
- `{service} {year}` — freshness intent (2026)
- `{competitor} alternative` — competitor displacement intent

**People Also Ask Mining:**
For each seed keyword, note the PAA questions. Every PAA question is a potential FAQ or blog post.

### Step 2: Intent Classification (Framework: content-strategy)

Classify every keyword by intent:

| Intent | Page Type | Buyer Stage | Example |
|---|---|---|---|
| Commercial | Landing page | Evaluation | "hotel rate scraping service" |
| Informational | Blog post | Awareness | "how to monitor competitor prices" |
| Informational (deep) | Guide | Consideration | "ecommerce pricing strategy playbook" |
| Question-based | FAQ | Mid-funnel | "is web scraping legal?" |
| Comparison | Comparison page | Decision | "Apify vs managed scraping" |
| Local/geo | Local landing page | Evaluation | "web scraping services San Francisco" |

### Step 3: Competition Assessment (Framework: competitor-alternatives, seo-audit)

For each keyword, estimate competition:

**Low competition signals:**
- No dedicated page from top 3 competitors
- Existing results are generic blog posts, not dedicated service pages
- PAA box not populated or shows weak answers
- AI models give vague answers (not citing any specific company)

**High competition signals:**
- Top 3 results are established SaaS companies with exact-match content
- Featured snippet already claimed by strong domain
- Multiple well-structured FAQ schema results

Prioritize LOW competition + HIGH commercial intent.

### Step 4: AI Citation Gap Research (Framework: ai-seo)

For each priority keyword, test on ChatGPT, Perplexity, and Gemini:
- "Who are the best [service] providers?"
- "What is [topic]?"
- "How do I [achieve goal]?"

Record:
- Is Clymin mentioned? (if not → high priority to create content)
- What sources are cited? (if competitors are cited → content gap)
- What type of content gets cited? (guides, FAQs, data pages)

### Step 5: Competitor Content Audit (Framework: competitor-alternatives)

For the top 5 keywords per segment, check what competitors (Bright Data, Oxylabs, Apify, Zyte) have:
- Do they have a dedicated page?
- What angle do they take?
- What do they NOT cover? (your opportunity)
- Do they have pricing information? (if no → Clymin can win with pricing transparency)

### Step 6: Keyword Scoring

Score each keyword 1–10 on:
- **Commercial intent** (10 = someone about to buy)
- **Competition level** (10 = very low competition)
- **AI citation opportunity** (10 = AI models give weak answers today)
- **Volume potential** (estimate: high/medium/low)

Priority score = (commercial × 0.4) + (competition × 0.3) + (AI opportunity × 0.3)

---

## OUTPUT FORMAT

Save to `data/keywords.json`:

```json
{
  "metadata": {
    "generated_date": "YYYY-MM-DD",
    "total_keywords": 150,
    "by_segment": {
      "ecommerce": 40,
      "travel": 35,
      "real-estate": 25,
      "food-delivery": 25,
      "financial": 25
    },
    "by_intent": {
      "commercial": 45,
      "informational": 55,
      "comparison": 20,
      "faq": 20,
      "local": 10
    }
  },
  "keywords": [
    {
      "keyword": "competitor price monitoring service",
      "segment": "ecommerce",
      "intent": "commercial",
      "page_type": "landing-page",
      "buyer_stage": "evaluation",
      "competition": "medium",
      "volume": "medium",
      "ai_citation_gap": true,
      "priority_score": 8.5,
      "paa_questions": [
        "How does competitor price monitoring work?",
        "How much does price monitoring cost?",
        "What is the best competitor price monitoring tool?"
      ],
      "content_angle": "Lead with AI-agentic advantage over static scrapers. Include San Francisco local SEO. Address legality concern early.",
      "competitor_gap": "Bright Data and Apify focus on DIY tools — no managed service angle with 12-year track record"
    }
  ]
}
```

---

## SEGMENT-SPECIFIC RESEARCH PRIORITIES

### E-Commerce (Priority 1)
Key pain points to research around: MAP compliance, SKU tracking at scale, Shopify competitor analysis, dropshipping product research, dynamic pricing
Location modifiers: San Francisco, New York, London, Singapore

### Travel & Hospitality (Priority 2)
Key pain points: OTA rate parity, RevPAR optimization, last-minute pricing, review sentiment
Location modifiers: global, USA, Europe, Southeast Asia

### Real Estate (Priority 3)
Key pain points: listing aggregation, Zillow/Redfin data, rental market trends, investment research
Location modifiers: USA (city-level), India, UAE

### Food & Quick Commerce (Priority 4)
Key pain points: delivery platform monitoring, menu pricing, dark store intelligence
Platform modifiers: DoorDash, Uber Eats, Grubhub, Swiggy, Zomato, Instacart

### Financial Services (Priority 5)
Key pain points: alternative data sourcing, ESG data, earnings transcript extraction, hedge fund signals
Audience: hedge funds, fintech, investment research teams

### MISSING COVERAGE (High Priority to Research)
These areas have zero or weak content today — research and prioritize:
- Financial Services guides: "How to Build an Alternative Data Pipeline"
- Financial Services FAQs: cost, compliance, accuracy for hedge funds
- Case study format content for all 5 segments
- Social media sentiment data for trading (Financial)
- ESG data extraction (Financial)
- Property Data API (Real Estate)
