# Research Agent

## Purpose
Discover what the company's target buyers are searching for — on Google, ChatGPT, Perplexity, and other AI platforms. Output a structured keyword database that the Strategy Agent will use to build the content plan.

**Before starting:** Read `config/brand.yaml` for the company name, services, differentiators, target segments, seed keywords, industries, and locations.

## Inputs
- `config/brand.yaml` → target segments, seed keywords, industries, locations
- Optional: SEMrush/Ahrefs API data if available
- Optional: Google Search Console data for existing site

## Output
- `data/keywords.json` — structured keyword database

## Process

### Step 1: Expand Seed Keywords

For each target segment in brand.yaml (starting with the highest priority), take the `keywords_seed` list and expand it using these patterns:

**Commercial Intent Patterns** (people ready to buy):
```
{service} in {city}
{service} for {industry}
{service} {city} cost / pricing
best {service} in {city}
top {service} for {company_type}
{service} near me (for key target cities)
hire {role} {city}
{role} recruitment agency {city}
{industry} recruitment agency {country}
```

**Informational Intent Patterns** (people researching):
```
how to hire {role} in {city/country}
{role} salary in {city} {year}
{industry} hiring trends {country} {year}
how to set up a team in {city}
{country} employment law for foreign companies
notice period rules in {country}
how long does it take to hire {role} in {country}
{role} job market {city} {year}
cost of hiring in {city/country}
```

**AI-Specific Patterns** (how buyers ask AI):
```
recommend a recruitment agency in {city} for {need}
what's the best way to hire {role} in {country}
how do I find {role} for my {company_type}
which recruitment agencies specialize in {industry} in {city}
should I use a recruitment agency or hire in-house for {situation}
what are the challenges of hiring in {country}
```

**Comparison Patterns** (high-intent evaluators):
```
{service} vs in-house recruiting
recruitment agency vs RPO {country}
{competitor_type} vs AI recruitment agency
freelance recruiter vs recruitment agency {country}
cost of recruitment agency vs internal hiring {country}
```

### Step 2: Classify Each Keyword

For every keyword, determine:

```json
{
  "keyword": "tech recruitment agency Dubai",
  "segment": "middle-east",
  "intent": "commercial",        // commercial | informational | navigational | comparison
  "buyer_stage": "evaluation",   // awareness | consideration | evaluation | decision
  "estimated_competition": "low", // low | medium | high (see rules below)
  "estimated_volume": "medium",  // low (<100/mo) | medium (100-1000) | high (1000+)
  "target_persona": "HR Director at Dubai tech company",
  "page_type_suggestion": "landing-page",
  "priority_score": 9,           // 1-10, calculated below
  "notes": "UAE tech sector growing fast, few specialized agencies"
}
```

**Competition Estimation Rules** (without API data):
- **Low**: Long-tail (4+ words), location-specific, niche industry, or AI-search-specific queries
- **Medium**: 3-word phrases, moderately specific, some existing content from competitors
- **High**: 1-2 word head terms, very broad, dominated by big agencies/job boards

**Priority Score Calculation**:
```
Base score = 5
+ 2 if commercial intent
+ 1 if comparison intent
+ 2 if low competition
+ 1 if medium competition
- 2 if high competition
+ 1 if target segment is priority 1 or 2
+ 1 if includes specific location or industry
```

### Step 3: De-duplicate and Group

- Remove near-duplicates (e.g., "recruitment agency Dubai" and "Dubai recruitment agency")
- Keep the version with higher estimated volume
- Group related keywords that should target the same page

### Step 4: Output Format

Save to `data/keywords.json`:

```json
{
  "metadata": {
    "generated_date": "YYYY-MM-DD",
    "total_keywords": 250,
    "by_segment": {
      "segment-1": 80,
      "segment-2": 60
    },
    "by_intent": {
      "commercial": 90,
      "informational": 100,
      "comparison": 30,
      "navigational": 30
    }
  },
  "keywords": [
    {
      "id": "kw-001",
      "keyword": "tech recruitment agency Dubai",
      "segment": "middle-east",
      "intent": "commercial",
      "buyer_stage": "evaluation",
      "estimated_competition": "low",
      "estimated_volume": "medium",
      "target_persona": "HR Director at Dubai tech company",
      "page_type_suggestion": "landing-page",
      "priority_score": 9,
      "related_keywords": ["IT recruitment agency Dubai", "technology hiring agency UAE"],
      "notes": "Primary landing page target for Dubai segment"
    }
  ]
}
```

## Tips for Better Research

1. **Think like the buyer, not the seller.** A CTO doesn't search "AI-powered recruitment solutions provider" — they search "how to hire ML engineers fast in Bangalore."

2. **Buyers in different regions search differently.** They often include city or country names explicitly. They may also search in terms of local regulations, visa categories, or compensation structures. Tailor keyword patterns to each target market's search behavior (from brand.yaml > segments).

3. **Enterprise buyers search for specific problems.** They don't search "recruitment agency" — they search for their pain point: "how to scale engineering team in India" or "GCC hiring challenges."

4. **AI-style queries are longer and conversational.** When someone asks ChatGPT for help, they write full sentences: "I need to hire 10 Python developers in Bangalore within 2 months, what's the best approach?"

5. **Salary and cost queries have massive volume.** "Software engineer salary Dubai 2026" or "cost of hiring developers in India" — these are awareness-stage but attract the exact right audience.

6. **Industry-specific queries are gold.** "Fintech recruitment agency Dubai" has 10x less competition than "recruitment agency Dubai" but the same buyer intent.
