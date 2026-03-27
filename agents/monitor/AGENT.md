# Monitor Agent — Clymin Marketing Skills Edition (33-Framework)

## Purpose
Track performance of published content. Identify what's converting, what needs refreshing, and what's generating leads. Produce weekly reports. Feed insights back into the content and strategy agents.

**Before starting:** Read `config/brand.yaml` for company name, website URL, and segments.

## Inputs
- Google Search Console data (API or manual export)
- Content files in `content/` (reads and updates frontmatter)
- Analytics data (if available)

## Outputs
- Updated frontmatter in content files
- Weekly report: `reports/YYYY-MM-DD-weekly.md`
- Monthly deep-dive: `reports/YYYY-MM-monthly.md`

---

## WEEKLY MONITORING PROCESS

### Step 1: Pull Performance Data (Framework: analytics-tracking)

From Google Search Console, get for each published URL:
- Impressions (last 7 days and last 28 days)
- Clicks (last 7 days and last 28 days)
- Average position
- Top queries driving impressions (including ones we didn't target)
- CTR by page

From site analytics (if available):
- Time on page
- Bounce rate
- Scroll depth
- CTA click rate (if tracked)

### Step 2: Update Content Frontmatter

For each published content file, update:
```yaml
impressions: 342
clicks: 18
position: 8.3
ctr: 5.3
leads_attributed: 2
last_checked: "YYYY-MM-DD"
```

### Step 3: Classify Pages (Framework: analytics-tracking, content-strategy)

| Category | Criteria | Action |
|---|---|---|
| Winners | Position 1–3, clicks growing | Build backlinks, create related spoke content |
| Opportunity | Position 4–15, decent impressions | Optimize content, add internal links, refresh data |
| Emerging | Position 16–30, some impressions | Give it time, add 1–2 internal links from high-authority pages |
| Stalled | Published 30+ days, 0 impressions | Check indexing, rewrite title + meta, check for technical issues |
| Declining | Position dropping week-over-week | Refresh content, update stats, add new sections |

### Step 4: A/B Test Tracking (Framework: ab-test-setup)

Track active tests and their results. Tests to set up:

**High-priority tests for clymin.ai/resources:**
1. **CTA copy test**: "Get a Free Consultation" vs. "Get a Free Sample Dataset" vs. "Book a Strategy Call"
   - Metric: CTA click-through rate
   - Duration: 4 weeks minimum

2. **Hero tagline test**: Current generic tagline vs. outcome-specific tagline
   - Variant A: "Clymin is an AI-powered managed web scraping service..."
   - Variant B: "Get clean, real-time competitive data without building scrapers."
   - Metric: Time on page, scroll depth, CTA clicks

3. **Card CTA test**: "Read more →" vs. "Get a sample dataset →" vs. "Start monitoring →"
   - Metric: Card click-through rate

Record test results:
```yaml
# In frontmatter of tested pages
ab_tests:
  - test_id: "cta-copy-v1"
    hypothesis: "Specific offer CTA outperforms generic Contact Us"
    variant_a: "Get a Free Consultation"
    variant_b: "Get a Free Sample Dataset"
    start_date: "YYYY-MM-DD"
    end_date: "YYYY-MM-DD"
    winner: "B"
    lift: "+34% CTR"
```

### Step 5: Lead Attribution (Framework: revops)

When leads come in (form submissions, meeting bookings), attribute them:
1. Check referring URL or UTM parameters
2. Update the relevant content file's `leads_attributed` count
3. Record which page type and segment converted best
4. Flag pages with high impressions + low leads (conversion optimization needed)

Lead scoring signals from content interactions:
- Visited a landing page + FAQ page + comparison page → High intent (sales-ready)
- Downloaded a guide → Medium intent (nurture sequence triggered)
- Read a blog post only → Low intent (top of funnel)

### Step 6: AI Citation Monitoring (Framework: ai-seo)

Weekly manual check (rotate through 5 queries each week):
- Ask ChatGPT, Perplexity, Gemini: "Who provides [target service] for [target segment]?"
- Record: Is Clymin mentioned? Which page is cited? What competitors appear?

Track in: `reports/ai-citation-tracker.json`
```json
{
  "date": "YYYY-MM-DD",
  "queries_tested": 5,
  "clymin_mentioned": 2,
  "clymin_cited_urls": ["/resources/competitor-price-monitoring"],
  "competitors_cited": ["Bright Data", "Apify"],
  "queries_where_clymin_absent": ["alternative data for hedge funds", "real estate data scraping service"],
  "action_items": ["Refresh /resources/web-scraping-for-hedge-funds — Clymin not appearing"]
}
```

---

## WEEKLY REPORT FORMAT

Save to `reports/YYYY-MM-DD-weekly.md`:

```markdown
# Weekly AEO Report — Clymin
**Period:** {start date} - {end date}
**Generated:** {report date}

## Summary
- Total published pages: {N}
- Total impressions (7d): {N}
- Total clicks (7d): {N}
- Average CTR: {N}%
- New leads attributed this week: {N}
- Pages newly indexed: {N}

## Top Performers
| Page | Position | Clicks (7d) | Trend | Leads |
|---|---|---|---|---|
| {slug} | {position} | {clicks} | ↑ Up | {N} |

## Opportunities (Position 4–15)
| Page | Position | Impressions | Recommended Action |
|---|---|---|---|
| {slug} | {position} | {N} | Add internal links from [high-authority page] |

## Stalled / Declining
| Page | Issue | Action |
|---|---|---|
| {slug} | 0 impressions after 30 days | Rewrite meta title, check indexing |

## AI Search Visibility
- Clymin cited on {N}/{N} queries tested
- Not appearing for: {list queries}
- Action: Refresh {page slugs}

## Active A/B Tests
| Test | Status | Current Leader | Lift |
|---|---|---|---|
| CTA copy v1 | Running | Variant B | +18% |

## Content Actions for Next Week
1. Refresh {page} — position dropped from {old} to {new}
2. Create {new page} — ranking for query with no dedicated page
3. Add internal links from {high-authority page} to {target page}
4. {A/B test action}
```

---

## MONTHLY DEEP DIVE (Framework: analytics-tracking, content-strategy)

Monthly analysis — save to `reports/YYYY-MM-monthly.md`:

1. **Segment performance**: Which segment drives most traffic? Most leads?
2. **Page type conversion**: Landing pages vs. guides vs. FAQs — which type converts?
3. **New keyword discovery**: What queries are we ranking for that we didn't target? → Feed into Research Agent
4. **Churn prevention angle** (Framework: churn-prevention): Are any existing clients visiting content? Which pages? Add client-specific nurture flags.
5. **Content gap from GSC data**: Queries with 10+ impressions but no dedicated page → add to content plan
6. **Referral program signal** (Framework: referral-program): Which pages are being shared? Track with UTM parameters.
7. **Paid ads insight** (Framework: paid-ads): Which organic pages perform best → these are the best candidates for paid amplification
8. **Social content performance**: Which social hooks drove the most traffic back? Update `social_hook` in frontmatter for top performers.
