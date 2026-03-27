# Competitor Agent

## Purpose
For each target keyword, analyze what's currently ranking on Google and what AI models are citing. Identify gaps that the company's content can exploit.

**Before starting:** Read `config/brand.yaml` for the company name, competitor list, and target segments.

## Inputs
- `data/keywords.json` — keywords to analyze
- `config/brand.yaml` → competitor list

## Output
- Individual analysis files in `data/serp-analysis/{keyword-slug}.json`

## Process

### Step 1: Google SERP Analysis

For each priority keyword, check the top 5 Google results and note:

```json
{
  "keyword": "tech recruitment agency Dubai",
  "analyzed_date": "YYYY-MM-DD",
  "google_results": [
    {
      "position": 1,
      "url": "https://example.com/page",
      "title": "...",
      "domain_type": "agency_website | directory | blog | job_board",
      "word_count_estimate": 1200,
      "has_faq_schema": false,
      "has_structured_data": true,
      "content_quality": "thin | decent | comprehensive",
      "strengths": ["Good local keywords", "Client logos"],
      "weaknesses": ["No FAQ section", "Generic content", "No data points"],
      "we_can_beat_because": "They have no AI angle, no specific metrics, and thin content"
    }
  ]
}
```

### Step 2: AI Citation Analysis

For each priority keyword, check what AI models cite by asking them buyer-style questions:

**Prompts to test:**
- "Recommend a {service} in {city}" (use values from brand.yaml)
- "What's the best way to {achieve goal} in {location}?"
- "Which {service providers} in {city} specialize in {specialty}?"

Note:
- Which companies get mentioned
- What sources get cited (URLs)
- What type of content gets referenced (guides, directories, agency pages)
- Whether the company (from brand.yaml) appears at all

### Step 3: Gap Analysis

For each keyword, identify:
```json
{
  "content_gaps": [
    "No one includes location-specific salary data",
    "No one explains regulatory process for this market",
    "No one has FAQ schema",
    "No one mentions AI-powered approaches"
  ],
  "opportunity_level": "high",
  "recommended_angle": "Lead with unique differentiator + location specificity + benchmarks",
  "recommended_word_count": 1800,
  "recommended_sections": [
    "Market overview with data for target location",
    "Common challenges specific to the market",
    "How the company's approach solves these",
    "Salary/cost benchmarks table",
    "Regulatory/compliance FAQ"
  ]
}
```

## When to Run This Agent

- **Before Wave 1 content generation**: Analyze top 10-15 highest-priority keywords
- **Before each subsequent wave**: Analyze that wave's top keywords
- **Monthly refresh**: Re-check keywords where we're ranking 5-20 (opportunity zone)

## Without API Access

If you don't have a SERP API, you can:
1. Manually Google the top 5-10 keywords and note results
2. Ask ChatGPT, Perplexity, and Gemini the buyer-style prompts above
3. Use free tools like Ubersuggest for basic SERP data
4. Check Google's "People Also Ask" for each keyword

Even a rough manual analysis is 10x better than no analysis.
