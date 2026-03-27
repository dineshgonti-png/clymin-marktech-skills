# Monitor Agent

## Purpose
Track performance of published content. Identify what's working, what needs refreshing, and what's generating leads. Produce weekly reports.

**Before starting:** Read `config/brand.yaml` for the company name and website URL.

## Inputs
- Google Search Console data (API or manual export)
- Content files in content/ (reads and updates frontmatter)

## Outputs
- Updated frontmatter in content files (impressions, clicks, position)
- Weekly report in reports/YYYY-MM-DD-weekly.md

## Weekly Monitoring Process

### Step 1: Pull Performance Data

From Google Search Console, get for each published URL:
- Impressions (last 7 days and last 28 days)
- Clicks (last 7 days and last 28 days)
- Average position
- Top queries driving impressions

### Step 2: Update Content Frontmatter

For each published content file, update:
```yaml
impressions: 342
clicks: 18
position: 8.3
leads_attributed: 2
last_checked: "YYYY-MM-DD"
```

### Step 3: Classify Pages

Assign each page to a category:

| Category | Criteria | Action |
|---|---|---|
| Winners | Position 1-3, clicks growing | Build backlinks, create related content |
| Opportunity | Position 4-15, decent impressions | Optimize content, add internal links |
| Emerging | Position 15-30, some impressions | Give it time, minor tweaks |
| Stalled | Published 30+ days, 0 impressions | Check indexing, rewrite title/meta |
| Declining | Position dropping week-over-week | Refresh content, update data |

### Step 4: Generate Report

Save to reports/YYYY-MM-DD-weekly.md:

```markdown
# Weekly AEO Report — {Company Name from brand.yaml}
**Period:** {start date} - {end date}
**Generated:** {report date}

## Summary
- Total published pages: {N}
- Total impressions (7d): {N}
- Total clicks (7d): {N}
- Average CTR: {N}%
- Leads this week: {N}

## Top Performers
| Page | Position | Clicks (7d) | Trend |
|---|---|---|---|
| {slug} | {position} | {clicks} | {Up/Down/Stable} |

## Opportunities (Position 4-15)
[pages that could move up with optimization]

## Action Items
1. Refresh [page X] — position dropped from {old} to {new}
2. Build backlinks to [page Y] — position {N}, needs push to top 3
3. [page Z] has 0 impressions after 30 days — check indexing

## AI Search Visibility
[Manual check: search key queries on ChatGPT/Perplexity, note if the company appears]
```

## Lead Tracking

When leads come in (form submissions, emails), attribute them:
1. Check the referring URL or UTM parameters
2. Update the relevant content file's leads_attributed count
3. Note the lead source in the weekly report

## Monthly Deep Dive

Once a month, do a more thorough analysis:
- Which segments are generating the most traffic?
- Which page types convert best (landing vs blog vs guide)?
- What new keywords are we ranking for (that we didn't target)?
- Are AI search engines citing us? (manual check on ChatGPT, Perplexity, Gemini)
- Content gap analysis: what queries are we getting impressions for but have no page?
