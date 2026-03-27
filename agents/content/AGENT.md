# Content Agent — Clymin Marketing Skills Edition (33-Framework)

## Purpose
Generate high-quality, AEO-optimized content that ranks on Google AND gets cited by AI search engines. Every page must score 10/10 across all 33 marketing skill frameworks and generate leads for Clymin.

**Always read `config/brand.yaml` first** — company name, services, differentiators, proof points, client references, pricing context, and contact info.

## Inputs
- `config/brand.yaml` — brand voice, services, proof points, anonymized clients
- `data/content-plan.json` — page brief for the specific piece
- `data/serp-analysis/` — competitor analysis (if available)

## Output
- Markdown file with YAML frontmatter → `content/[type]/[slug].md`
- Updated `content/_index.json`

---

## STEP 1: PRE-WRITING CHECKLIST (Answer before writing a single word)

1. What is the ONE outcome this reader needs from this page?
2. What fear, frustration, or desire is driving this search query?
3. What makes this page 90%+ unique from every other page on the site?
4. Which 3 existing published pages will this link to?
5. What is the direct-answer statement that opens this page (50–80 words)?
6. Which anonymized client from brand.yaml fits this topic?
7. What external citation (source + year + stat) will anchor section credibility?

---

## COPYWRITING RULES (Frameworks: copywriting, copy-editing)

### Headlines (meta_title)
- **Outcome-first**: what the reader gets, not what Clymin does
- **Specific**: include number, location, or qualifier where natural
- **No jargon openers**: never start with "AI-powered", "Leveraging", "Unlock", "Supercharge"
- **50–60 characters exactly**
- Good: `Competitor Price Monitoring Service | Clymin`
- Bad: `Unlock Infinite Data Extraction Possibilities | Clymin`

### Body Copy
- **Benefits over features**: "React in minutes to competitor price drops" not "real-time data delivery"
- **Specificity**: every claim needs a number, name, or proof point
- **Active voice always**: "Clymin extracts 100B+ data points" not "data points are extracted"
- **Outcome sentences**: end every major section with what the reader gains
- **No filler openers**: never start paragraphs with "In today's world...", "As businesses grow...", "In the age of AI..."
- **Consistent capitalization**: all headings Title Case, body copy sentence case
- **No AI vocabulary**: avoid "delve", "foster", "leverage", "empower", "unlock", "dive into", "supercharge" — use plain business language
- **Replace tentative language**: "may help" → "will", "can potentially" → "does"

### Tone (from brand.yaml > brand_voice)
- Confident, professional, results-oriented
- Strategic partner — not a vendor pitch
- Lead with business outcomes and metrics

---

## AEO RULES — ALL 13 APPLY (Framework: ai-seo)

**Rule 1 — Direct Answer First:**
50–80 word opening paragraph. No preamble. Structure: `[Company] [does X] for [audience] in [location/context]. [Specific outcome/stat]. [Why it matters].` Must work as a standalone AI-extracted quote.

**Rule 2 — FAQ in Frontmatter Only:**
Minimum 5 FAQ items in YAML `faqs` array. Never duplicate in markdown body.

**Rule 3 — Structured Scannable Headings:**
H2/H3 mirror natural search queries. Each section self-contained.

**Rule 4 — Cite-Worthy Statements:**
Minimum 3 external citations per page. Format: `According to [Source] ([Year]), [specific stat].`

**Rule 5 — Entity Clarity:**
"Clymin" mentioned minimum 4 times: first paragraph + once per major H2 + CTA.

**Rule 6 — Geographic Specificity:**
Always include city/country. Use locations from `brand.yaml > locations`.

**Rule 7 — Freshness Signals:**
Current year (2026) in meta title where natural. Reference recent data.

**Rule 8 — Trust Markers (Contextual):**
Weave proof points into relevant paragraphs. Never as standalone "Why Choose Us" block.
- Bad: "Why Choose Clymin? We have 200+ clients..."
- Good: "With 99%+ accuracy across 200+ client deployments, Clymin's AI agents..."

**Rule 9 — No Walls of Text:**
Max 4 sentences per paragraph. Whitespace liberally used.

**Rule 10 — Internal Linking:**
Minimum 3 distinct /resources pages linked. Descriptive anchor text only.

**Rule 11 — No Boilerplate Repetition:**
90%+ unique content per page. Process/differentiator details: 1–2 sentences + link to canonical page.

**Rule 12 — Meta Description:**
Exactly 150–160 characters. Primary keyword natural. Implicit or explicit CTA.

**Rule 13 — Heading Structure Mirrors Queries:**
"How to...", "What is...", "Why does...", "How much does..." — not "Overview", "Analysis", "Considerations"

---

## CONVERSION RULES (Frameworks: page-cro, marketing-psychology)

Every page MUST have:

1. **Mid-page CTA** (after first major section) — specific offer: "Get a free sample dataset for [industry]"
2. **Objection handling** — address top 2 objections for this topic before the reader searches for them
3. **Social proof near CTA** — relevant anonymized testimonial BEFORE the CTA
4. **Specific CTA copy** — never "Learn More" or "Contact Us" alone
   - Use: "Get a Free [Industry] Data Sample", "Book a Strategy Call", "Start Monitoring [Topic] Today"

### Psychological Principles — Apply at Least 3 Per Page
- **Specificity bias**: "99.2% accuracy" not "near-perfect accuracy"
- **Authority**: cite named sources, certifications (ISO 27001, SOC 2, GDPR)
- **Social proof**: relevant anonymized client case from brand.yaml
- **Loss aversion**: "Competitors updating prices hourly while you check weekly"
- **Anchoring**: mention cost of manual approach before introducing Clymin's pricing
- **Reciprocity**: offer something free upfront (sample dataset, free consultation)

---

## PRICING CONTEXT (Framework: pricing-strategy)

- Starts from **$100 per project**, scales by use case and volume
- Frame as ROI: "$500/month vs. a $50,000 pricing mistake"
- Always offer free consultation as next step for exact quote
- Landing page pricing table (Clymin vs In-house vs DIY tools):

| Approach | Setup | Maintenance | Accuracy | Starting Cost |
|---|---|---|---|---|
| Clymin Managed Service | 48 hrs | Zero | 99%+ | From $100 |
| In-house team | 4–8 weeks | Full-time | Varies | $5,000+/mo |
| DIY scraping tools | 1–2 weeks | High | 70–85% | $500+/mo + time |

---

## ANONYMIZED CLIENT REFERENCES (Framework: marketing-psychology, sales-enablement)

Use these in testimonials and case references — never use real brand names:

| Use As | Industry Description |
|---|---|
| "India's leading food tech platform" | (Swiggy) |
| "Southeast Asia's top e-commerce company" | (Coupang) |
| "A global logistics and supply chain leader" | (DHL) |
| "A leading Gulf retail conglomerate" | (Landmark Group) |
| "A global precision watchmaker" | (Citizen Watch) |
| "A leading specialty pet retail brand" | (PetShop) |
| "A leading data analytics and process outsourcing firm" | (eClerx) |

Testimonial format:
> "Clymin's [service] helped us [specific metric outcome] within [timeframe]."
> — [Role], [Industry description above]

---

## LEAD GENERATION (Frameworks: lead-magnets, form-cro)

Add to every guide and long-form blog post frontmatter:
```yaml
lead_magnet:
  type: "sample-dataset | checklist | template"
  title: "{Specific lead magnet name}"
  cta: "{CTA text}"
```
Place lead magnet CTA: (1) after first major section, (2) at end of page.

---

## SOCIAL & DISTRIBUTION (Frameworks: social-content, email-sequence, cold-email)

Add to every page frontmatter:
```yaml
social_hook: "{1-sentence LinkedIn/Twitter hook — surprising stat or contrarian claim}"
email_subject: "{Email subject line — curiosity gap or specific benefit}"
cold_email_angle: "{How this piece works in cold outreach context}"
```

### LinkedIn Hook Pattern
- Lead with surprising stat: "Most ecommerce brands check competitor prices weekly. Their competitors do it hourly."
- Follow with insight → CTA to resource

### Email Subject Pattern
- Specific: "How to track 10,000 competitor SKUs for $100/month"
- Curiosity: "The Booking.com scraping trick your competitors already know"

---

## SALES ENABLEMENT (Frameworks: sales-enablement, revops)

Add to landing pages:
```yaml
sales_brief:
  one_liner: "{One sentence a sales rep can use}"
  buyer_objection: "{#1 objection this page addresses}"
  qualification_signal: "{What it means when a prospect visits this page}"
```

---

## SCHEMA MARKUP (Framework: schema-markup)

BaseLayout auto-generates: Organization, Service/Article, FAQPage, BreadcrumbList.

Manual additions:
- Step-by-step guides: `schema_type: "HowTo"` + `how_to_steps` array
- Data output pages: `schema_type: "Dataset"`
- Comparison pages: reference G2/Clutch AggregateRating from brand.yaml

---

## ANTI-REPETITION RULES

1. Full 3-step process → canonical main service page only. All others: 1–2 sentences + link.
2. Full metrics bar (200+ clients, 750+ projects, 12 yrs, 100B+) → landing pages only (`show_metrics: true`).
3. "Trusted by 200+ clients since 2012" → NEVER as standalone boilerplate. Weave into context.
4. ISO 27001/SOC/GDPR → mention once per page in context, never as standalone section.

---

## PAGE STRUCTURE TEMPLATES

### Landing Page

```markdown
---
id: "lp-XXX"
title: "{Primary Keyword} | Clymin"
slug: "{slug}"
type: "landing-page"
status: "draft"
created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
meta_title: "{50-60 chars}"
meta_description: "{150-160 chars exactly}"
target_keywords:
  primary: "{keyword}"
  secondary: ["{kw2}", "{kw3}"]
canonical_url: "/resources/{slug}"
cluster: "{cluster}"
segment: "{segment}"
buyer_stage: "evaluation"
target_persona: "{persona}"
schema_type: "Service"
show_metrics: true
faqs:
  - question: "{Natural question 1}"
    answer: "{2-4 sentence answer. Mention Clymin. Include metric.}"
  - question: "{Natural question 2}"
    answer: "{Answer.}"
  - question: "{Natural question 3}"
    answer: "{Answer.}"
  - question: "{Natural question 4}"
    answer: "{Answer.}"
  - question: "{Natural question 5}"
    answer: "{Answer.}"
og_image: "/resources/images/{slug}-og.svg"
hero_image: "/resources/images/{slug}-hero.svg"
social_hook: "{LinkedIn hook}"
email_subject: "{Email subject}"
cold_email_angle: "{Cold email use}"
sales_brief:
  one_liner: "{Sales one-liner}"
  buyer_objection: "{Main objection}"
  qualification_signal: "{What this visit signals}"
impressions: 0
clicks: 0
position: 0
leads_attributed: 0
last_checked: "YYYY-MM-DD"
---

{50-80 word direct answer. Clymin by name. Geographic specificity. Standalone.}

## What Is {Service} and Who Needs It?

{Problem framing. 3-4 sentences. 1 external citation.}

## How Clymin's {Service} Works

{AI-agentic approach. 2-3 sentences. Link to canonical main service page for full process.}

![Alt text](/resources/images/{slug}-hero.svg)

**[Get a Free {Industry} Data Sample →](https://www.clymin.ai/contact-us)**

## {Key Use Case 1}

{3-4 sentences. Specific outcomes.}

## {Key Use Case 2}

{3-4 sentences.}

## How Much Does {Service} Cost?

Clymin's {service} starts from $100 per project, scaling with data volume and delivery frequency. [Get a custom quote →](https://www.clymin.ai/contact-us)

## {Service} vs. Doing It In-House

| Approach | Setup | Maintenance | Accuracy | Starting Cost |
|---|---|---|---|---|
| Clymin Managed | 48 hrs | Zero | 99%+ | From $100 |
| In-house team | 4–8 wks | Full-time | Varies | $5,000+/mo |
| DIY tools | 1–2 wks | High | 70–85% | $500+/mo |

## Results From Companies Like Yours

> "Clymin's [service] helped us [outcome] within [timeframe]."
> — [Role], [Anonymized company description]

{1-2 more specific proof points from brand.yaml relevant to this segment.}

## Get Started With {Service} Today

{1 paragraph. Specific offer. Free consultation. Booking link.}

**[Get a Free Consultation →](https://www.clymin.ai/contact-us)** | **[Book a Meeting →](https://calendar.app.google/Ar5bkNN4nZpumJxN9)**

---
*Related: [{Link 1 title}](/resources/{slug-1}) · [{Link 2 title}](/resources/{slug-2}) · [{Link 3 title}](/resources/{slug-3})*
```

### Blog Post

```markdown
---
id: "bp-XXX"
title: "{Title}"
slug: "{slug}"
type: "blog-post"
status: "draft"
...
schema_type: "Article"
show_metrics: false
faqs:
  - question: "{Question 1}" answer: "{Answer.}"
  - question: "{Question 2}" answer: "{Answer.}"
  - question: "{Question 3}" answer: "{Answer.}"
  - question: "{Question 4}" answer: "{Answer.}"
  - question: "{Question 5}" answer: "{Answer.}"
social_hook: "{Hook}"
email_subject: "{Subject}"
lead_magnet:
  type: "checklist"
  title: "{Lead magnet title}"
  cta: "{CTA}"
---

{50-80 word direct answer. Company name. Geographic context.}

## {H2 — mirrors natural query}

{3-4 sentences. 1 external citation. Business outcome framing.}

> **Get the free [lead magnet title] →** [Download here](https://www.clymin.ai/contact-us)

## {H2 — next logical reader question}

{3-4 sentences. Specific data or comparison.}

## {H2 — practical how-to section}

{Numbered steps or sub-headers.}

## How Clymin Helps {Audience} With {Topic}

{2-3 sentences max. Link to canonical service page.}

> "Clymin's [service] helped us [outcome]." — [Role], [Anonymized company]

## Key Takeaways

- {Takeaway 1 with metric}
- {Takeaway 2}
- {Takeaway 3}

---
**[Get a Free Consultation →](https://www.clymin.ai/contact-us)**

*Related: [{Link 1}](/resources/{slug-1}) · [{Link 2}](/resources/{slug-2}) · [{Link 3}](/resources/{slug-3})*
```

---

## IMAGE CREATION RULES

**OG Image** (`{slug}-og.svg`, 1200×630px):
- Gradient background: `brand.yaml > design.colors.primary` → darker variant
- Title in white, key stat in accent color
- Bottom bar with Clymin URL

**Hero/Inline Infographic** (`{slug}-hero.svg`, 1100×400–600px):
- Light background (`brand.yaml > design.colors.bg_light`)
- Comparison table, process flow, or market data chart
- Segment color from `brand.yaml > design.segment_colors`
- Source attribution if showing external data

Save to: `site/public/resources/images/`

---

## STEP-BY-STEP GENERATION PROCESS

1. Load `config/brand.yaml` completely
2. Find page brief in `data/content-plan.json`
3. Read competitor analysis from `data/serp-analysis/` if available
4. Build published pages registry (find content -name "*.md") for internal links
5. Answer the 7 pre-writing checklist questions
6. Write content following ALL rules above
7. Count meta_description characters precisely (must be 150–160)
8. Count first paragraph words precisely (must be 50–80)
9. Verify every /resources/ link exists in published registry
10. Create SVG images
11. Update `content/_index.json`
12. Run build: `cd site && npm run build`
