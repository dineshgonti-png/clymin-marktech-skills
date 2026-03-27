# Strategy Agent

## Purpose
Turn the keyword research into an actionable content plan. Cluster keywords, assign page types, map to buyer journey, and create a prioritized publishing schedule.

**Before starting:** Read `config/brand.yaml` for the company name, services, segments, and industries.

## Inputs
- `data/keywords.json` — from Research Agent
- `config/brand.yaml` — services, segments, industries
- `content/_index.json` — existing content (to avoid duplicates)

## Output
- `data/content-plan.json` — the full content blueprint

## Process

### Step 1: Cluster Keywords into Topic Groups

Group keywords that should be served by the SAME page. A single page should target 1 primary keyword + 2-5 secondary/related keywords.

**Clustering Rules:**
- Same intent + same topic + same location → one cluster
- Same intent + same topic + different locations → separate clusters (location pages)
- Different intents + same topic → could be same or different pages depending on depth
- Never put commercial and informational intent in the same cluster

**Example Cluster:**
```json
{
  "cluster_id": "cl-001",
  "cluster_name": "Tech Recruitment Agency Dubai",
  "primary_keyword": "tech recruitment agency Dubai",
  "secondary_keywords": [
    "IT recruitment agency Dubai",
    "technology recruitment company UAE",
    "software recruitment agency Dubai"
  ],
  "intent": "commercial",
  "segment": "middle-east",
  "estimated_total_volume": "medium"
}
```

### Step 2: Assign Page Type to Each Cluster

| Intent | Typical Page Type |
|---|---|
| Commercial + specific location/service | Landing Page |
| Informational + "how to" / trends | Blog Post |
| Informational + comprehensive topic | Guide |
| Question-based (what, why, how) | FAQ Page |
| "vs" or comparison queries | Comparison Page |

### Step 3: Map to Buyer Journey

```
Awareness    → Blog posts, guides (salary data, market trends, hiring challenges)
Consideration → Comparisons, FAQs (agency vs in-house, what to look for)
Evaluation   → Landing pages (specific service + location pages)
Decision     → Case study references, contact CTAs
```

### Step 4: Create Page Briefs

For each cluster, create a page brief:

```json
{
  "page_id": "p-001",
  "cluster_id": "cl-001",
  "title_suggestion": "{Primary Keyword} | {Company Name from brand.yaml}",
  "slug": "{url-friendly-slug}",
  "page_type": "landing-page",
  "segment": "{segment from brand.yaml}",
  "primary_keyword": "{exact primary keyword}",
  "secondary_keywords": ["{secondary 1}", "{secondary 2}"],
  "intent": "commercial",
  "buyer_stage": "evaluation",
  "target_persona": "{who this page is for}",
  "content_angle": "Position the company using its differentiators from brand.yaml. Lead with proof points from brand.yaml > differentiators.proof_points. Address segment-specific concerns from brand.yaml > segments.",
  "must_include": [
    "Direct answer: what the company offers for this query",
    "Market context with growth stats",
    "Company's unique approach (brief mention, link to canonical page)",
    "Location/segment-specific hiring challenges",
    "Relevant salary benchmark data",
    "FAQ section (3-5 questions)",
    "Contact CTA"
  ],
  "internal_links_to": ["p-005", "p-012"],
  "word_count_target": 1500,
  "priority_score": 9,
  "status": "planned",
  "wave": 1
}
```

### Step 5: Prioritize and Assign Waves

**Wave Assignment Rules:**
- Wave 1: Priority 1 segment (from brand.yaml) + highest priority scores
- Wave 2: Priority 2 segment + high priority scores
- Wave 3: Priority 3 segment + medium-high priority
- Wave 4: Remaining segments + cross-cutting + gap fills

**Within each wave, order by:**
1. Commercial intent pages first (they convert faster)
2. Highest priority score first
3. Landing pages before blog posts (direct lead generation)
4. Comparison pages early (these rank fast and convert well)

### Step 6: Output Format

Save to `data/content-plan.json`:

```json
{
  "metadata": {
    "generated_date": "YYYY-MM-DD",
    "total_pages_planned": 100,
    "by_wave": { "1": 30, "2": 25, "3": 25, "4": 20 },
    "by_type": {
      "landing-page": 36,
      "blog-post": 36,
      "guide": 10,
      "faq": 10,
      "comparison": 8
    }
  },
  "pages": [
    { "...page brief..." }
  ]
}
```

## Internal Linking Strategy

Plan internal links as you build the content plan:

- Every **landing page** should link to 1 related guide + 1 related blog post
- Every **blog post** should link to 1 relevant landing page + 1 related blog
- Every **guide** should link to 3-5 relevant landing pages
- Every **FAQ page** should link to the most relevant landing page
- Every **comparison** should link to the relevant landing page as the "recommended option"

This creates a web of internal links that both Google and AI crawlers follow to discover related content.
