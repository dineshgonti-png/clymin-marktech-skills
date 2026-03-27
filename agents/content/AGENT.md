# Content Agent

## Purpose
Generate high-quality, AEO-optimized content pages that rank on Google AND get cited by AI search engines. Every page should be capable of generating leads for the company.

**Before starting:** Read `config/brand.yaml` for the company name, services, differentiators, proof points, client testimonials, design colors, canonical pages, and contact information.

## Inputs
- `config/brand.yaml` — brand voice, services, proof points, client testimonials
- `data/content-plan.json` — page brief for the specific piece being generated
- `data/serp-analysis/` — competitor analysis (if available)

## Output
- Markdown file with YAML frontmatter saved to `content/[type]/[slug].md`
- Updated `content/_index.json`

## Content Generation Process

### Step 1: Load Context
1. Read `config/brand.yaml` completely
2. Find the page brief in `data/content-plan.json`
3. Read competitor analysis from `data/serp-analysis/[keyword].json` if it exists
4. Check `content/_index.json` for related published pages (for internal linking)

### Step 2: Generate the Content

Follow the page structure template below based on page type. CRITICAL: follow the AEO formatting rules precisely.

### Step 3: Save and Update Inventory
1. Save to `content/[type]/[slug].md`
2. Update `content/_index.json` with new entry

---

## Page Structure Templates

### Landing Page Template

```markdown
---
id: "lp-XXX"
title: "{Primary Keyword} | {Company Name from brand.yaml}"
slug: "{url-friendly-slug}"
type: "landing-page"
status: "draft"
created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"

meta_title: "{Primary Keyword} | {Company Name}" # 50-60 chars
meta_description: "{Compelling description with primary keyword}" # 150-160 chars
target_keywords:
  primary: "{exact primary keyword}"
  secondary:
    - "{secondary 1}"
    - "{secondary 2}"
canonical_url: "/resources/{slug}"

cluster: "{cluster name}"
segment: "{segment name}"
buyer_stage: "evaluation"
target_persona: "{who this page is for}"

schema_type: "Service"
faqs:
  - q: ""
    a: ""

og_image: "/resources/images/{slug}-og.svg"

impressions: 0
clicks: 0
position: null
leads_attributed: 0
last_checked: null
---

{DIRECT ANSWER PARAGRAPH — 50-80 words. Immediately answers the query.
Must mention the company by full name (from brand.yaml). Must include location. No fluff.}

## {H2: The Problem/Challenge — relates to buyer's pain}

{2-3 paragraphs establishing the problem. Include location-specific context.
Reference market data or trends. Show you understand their world.}

## {H2: Unique topic section 1 — driven by THIS page's keyword}

{Content that is 100% specific to this page's topic. NOT a generic
"How [Company] Solves This" section. Ask: "What can this page
teach that NO other page on the site teaches?" That goes here.
Include 1-2 trust signals (proof points from brand.yaml, testimonial) woven in naturally.}

## {H2: Unique topic section 2}

{More unique content. Data, analysis, practical advice for this keyword.
If referencing the company's process or key differentiator, use a brief
mention (1-2 sentences) and link to the canonical page:
[our approach](/resources/{canonical_pages.main_service_page.slug from brand.yaml}#{anchor})
Do NOT write out the full process or differentiator explanation.}

## {H2: Unique topic section 3}

{Additional unique value. Tables, benchmarks, comparisons, market data.
Include a client testimonial where it naturally fits the topic.}

<!-- NOTE: Do NOT add a "Frequently Asked Questions" section in the Markdown body.
     FAQs are defined in the YAML frontmatter (faqs array) and the Astro layout
     auto-renders them as styled cards AFTER the content and testimonial strip.
     Adding FAQs in both places creates a duplicate FAQ section on the page. -->

## Ready to Build Your Team?

{Short CTA paragraph. Include contact email (from brand.yaml > business.email)
and link to the contact page. Reference a specific benefit from brand.yaml > differentiators.proof_points.}
```

### Blog Post Template

```markdown
---
id: "bp-XXX"
title: "{Engaging Title with Primary Keyword}"
slug: "{slug}"
type: "blog-post"
status: "draft"
created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"

meta_title: "{Title}" # 50-60 chars
meta_description: "{Description}" # 150-160 chars
target_keywords:
  primary: "{keyword}"
  secondary: []
canonical_url: "/resources/{slug}"

cluster: "{cluster}"
segment: "{segment}"
buyer_stage: "awareness"
target_persona: "{persona}"

schema_type: "Article"
faqs:
  - q: ""
    a: ""

og_image: "/resources/images/{slug}-og.svg"

impressions: 0
clicks: 0
position: null
leads_attributed: 0
last_checked: null
---

{DIRECT ANSWER PARAGRAPH — 50-80 words. Summarizes the key takeaway.
Answers the implied question behind the keyword.}

## {H2: Context-Setting Section}

{Why this topic matters right now. Include current year, trends, data.}

## {H2: Main Content Section 1}

{Substantive content. Include specific data, examples, actionable advice.
Each paragraph 3-4 sentences max.}

## {H2: Main Content Section 2}

{Continue building the argument or guide.}

## {H2: Main Content Section 3}

{Practical, actionable section. Tips, steps, or frameworks.}

## {H2: How [Company Name] Helps (soft pitch)}

{1-2 paragraphs connecting the topic to the company's services.
Not a hard sell — position as a natural solution to the problem discussed.
Include 1-2 proof points from brand.yaml.}

## Key Takeaways

{3-5 bullet points summarizing the article. AI models often extract these.}

<!-- NOTE: Do NOT add FAQ section in Markdown body. FAQs go in frontmatter only.
     The layout auto-renders them as styled cards after the content. -->
```

### Guide Template

Same as blog post but longer (2500-4000 words), with a table of contents, more H2/H3 sections, and more comprehensive coverage. Guides should be the definitive resource on their topic.

### FAQ Page Template

```markdown
---
[standard frontmatter]
schema_type: "FAQPage"
---

{Brief intro paragraph — 2-3 sentences explaining what this FAQ covers.}

## {Question 1 — exact phrasing people search}

{Comprehensive answer. 100-200 words. Include specific data where relevant.
This should be the BEST answer to this question on the internet.}

## {Question 2}
{Answer}

[... 8-15 questions total ...]

## Still Have Questions?

{CTA to contact the company. Use email from brand.yaml > business.email.
Reference that they can speak to a human expert.}
```

### Comparison Page Template

```markdown
---
[standard frontmatter]
schema_type: "Article"
---

{Direct answer — which option is better and why, in 2-3 sentences.
Don't be wishy-washy. Take a clear position.}

## Quick Comparison

| Factor | {Option A} | {Option B} |
|---|---|---|
| Cost | ... | ... |
| Speed | ... | ... |
| Quality | ... | ... |
[... more rows ...]

## {H2: Deep Dive — Option A}
{Detailed analysis}

## {H2: Deep Dive — Option B}
{Detailed analysis}

## {H2: When to Choose Each}
{Practical decision framework}

## {H2: How [Company Name] Fits In}
{Natural bridge to the company's services — use brand.yaml for positioning}

<!-- FAQs go in frontmatter only — layout renders them automatically -->
```

---

## Imagery Guidelines (CRITICAL for SEO & Google Overviews)

Images are essential for Google AI Overviews, featured snippets, and image search traffic. Every content piece MUST include images.

### Image Types

1. **OG Image** (REQUIRED on every page — for social sharing only, NOT displayed on page)
   - Frontmatter field: `og_image`
   - Stored at: `site/public/resources/images/{slug}-og.svg`
   - Size: 1200x630px
   - Used for Open Graph / Twitter card previews when the page is shared on social media
   - The hero section uses a procedural SVG pattern (from `patterns.ts`) — do NOT add images to the hero

2. **Inline Content Images** (minimum 1-2 per page)
   - Placed within the Markdown body using standard syntax: `![alt text](/resources/images/{slug}-{descriptor}.webp)`
   - Follow each image with an italic caption: `*Caption describing the image*`
   - Stored at: `site/public/resources/images/{slug}-{descriptor}.webp`
   - Size: 820x500px for standard, 1100x600px for wide infographics

3. **Process Flow Diagrams** (recommended for landing pages)
   - Visual representation of the company's process or segment-specific workflows
   - Use: `![Process diagram alt text](/resources/images/{slug}-process.webp)`
   - Size: 1100x600px

4. **Infographics** (recommended for blog posts and guides)
   - Data visualizations, comparison charts, market statistics
   - Use: `![Infographic alt text](/resources/images/{slug}-infographic.webp)`
   - Size: 1100x800px (can be taller for vertical infographics)

5. **Comparison Tables as Images** (for comparison pages)
   - Visual side-by-side comparisons that Google can feature in image results
   - Size: 1100x600px

### Image Naming Convention
```
{slug}-hero.webp          → Hero/banner image
{slug}-og.webp            → Open Graph social sharing image
{slug}-process.webp       → Process flow diagram
{slug}-infographic.webp   → Data infographic
{slug}-comparison.webp    → Visual comparison chart
{slug}-market-data.webp   → Market statistics visualization
{slug}-{custom}.webp      → Any other descriptive name
```

### Image Spacing Rule (CRITICAL)
NEVER place two or more images back-to-back without a substantial text section (at least 2-3 paragraphs) between them. Stacked images create a poor reading experience and look like a broken layout. Also consider that the Astro layout auto-generates visual elements from content patterns (e.g., "Step N:" paragraphs become a visual process flow timeline). An inline process diagram image placed before auto-generated process steps creates redundant stacked visuals. When the layout already auto-renders a visual for a content pattern, do NOT add a separate image for the same content.

**BAD:** Image → Image → Image (or Image → auto-generated visual → Image)
**GOOD:** Text section → Image → Text section → Image → Text section

### Image Alt Text Rules
- MUST describe the image content specifically
- MUST include the primary keyword naturally (not stuffed)
- MUST be under 125 characters
- Include location names where relevant
- Example: "AI-powered recruitment process for tech hiring in UAE — 4-step validation workflow"

### Image Placement Guidelines by Page Type

**Landing Pages:**
- 1 comparison or data infographic (placed after a text section)
- 1 market data visualization (placed after a different text section)
- Do NOT add a process diagram if using the `**Step N:**` pattern (layout auto-generates a visual timeline)

**Blog Posts:**
- 1-2 inline images: supporting data charts, frameworks, or illustrative diagrams
- Key takeaways as a visual summary (optional)

**Guides:**
- 2-3 inline images: section-specific diagrams, flowcharts, data visualizations

**FAQ Pages:**
- 1 infographic summarizing key answers (optional)

**Comparison Pages:**
- 1 comparison table as image (for Google Image search)
- 1 decision framework diagram

### Image Generation Workflow

When generating content, include image specifications as HTML comments in the Markdown:

```markdown
<!-- IMAGE: hero
  Description: [Detailed description for AI image generation or designer brief]
  Text overlay: [Any text that should appear on the image]
  Style: [professional/corporate/modern/tech/infographic]
  Colors: Use brand colors from brand.yaml > design.colors
  Size: 1120x720px
-->

<!-- IMAGE: inline - process
  Description: [Detailed description of the process diagram]
  Elements: [Step 1 label, Step 2 label, ...]
  Style: [flowchart/timeline/circular]
  Colors: Brand colors from brand.yaml > design.colors
  Size: 1100x600px
-->
```

These comments serve as briefs for image creation (AI-generated or designed). The actual image files are created separately and placed in `site/public/resources/images/`.

---

## Anti-Repetition Rules (CRITICAL)

These rules prevent the content library from becoming a collection of near-identical pages with swapped keywords. Every page must earn its existence with unique, genuinely useful content.

### Rule 1: No Boilerplate Sections
Each page must be 90%+ unique content. Do NOT copy-paste the same sections (differentiator explanations, step-by-step process, industries list) across pages. If a concept was explained in detail on one page, other pages should reference it briefly (1-2 sentences max) and link to that page instead.

### Rule 2: Vary Page Structure
Do NOT follow the same H2 structure on every page. Each page's sections should be driven by its specific keyword and topic, not by a fixed template. A page about "hire Indian developers for Dubai" should have sections about India-specific topics (notice periods, visa, CTC comparison) — not generic sections about the company's process.

### Rule 3: Trust Signals: Brief, Not Boilerplate
Mention the company's proof points (from brand.yaml > differentiators.proof_points) naturally within topic-relevant paragraphs. Do NOT create dedicated sections like "How [Company] Solves This" or "What Sets [Company] Apart" on every page. One brief trust signal per page is enough.

### Rule 4: Process Mentions: Link, Don't Repeat
The company's full process should be explained on ONE page only (the canonical main service page from brand.yaml > canonical_pages.main_service_page). All other pages should mention it in 1-2 sentences and link to that page. Do NOT write out the full process on every page.

### Rule 5: Industries: Only When Relevant
Only include an industries section when the page's keyword is specifically about industries. "Hire Indian developers for Dubai" does not need an "Industries We Serve" section.

### Rule 6: Unique Value Per Page
Before writing, ask: "What can this page teach that NO other page on the site teaches?" That content should make up the majority of the page. Generic company marketing copy should be minimal.

---

## Internal Linking Rules (CRITICAL)

### Canonical Page
The canonical main service page (from brand.yaml > canonical_pages.main_service_page) is the CANONICAL page for:
- The full differentiator/methodology explanation (anchor from brand.yaml > canonical_pages.main_service_page.anchors)
- The full step-by-step process (anchor from brand.yaml > canonical_pages.main_service_page.anchors)
- Industries list and roles list

All other pages should link TO these anchors when referencing these topics, not repeat them.

### Link Requirements
1. Every page MUST link to at least 2 DISTINCT other /resources pages (not the same page with different anchors)
2. Link text MUST accurately describe what the user will find at the destination. "Learn more" is bad. "See our 4-step hiring process for Dubai tech roles" is good.
3. Use anchor links when pointing to a specific section: `/resources/{canonical-slug}#{anchor}`
4. The canonical page should link OUT to other pages too — bidirectional linking
5. When adding anchor IDs to content, use HTML: `<h3 id="anchor-name">Heading</h3>` in Markdown

### Available Anchors on Canonical Page
Define these in brand.yaml > canonical_pages.main_service_page.anchors. For example:
- `/resources/{slug}#methodology` → Main methodology/differentiator section
- `/resources/{slug}#process` → Step-by-step process section

---

## AEO Formatting Rules (CRITICAL)

These rules are NON-NEGOTIABLE. They directly affect whether AI models cite the content.

### Rule 1: Direct Answer First
The very first paragraph of EVERY page must directly answer the target query in 50-80 words. No introductions, no "In today's fast-paced world..." openers. This paragraph must also work as a **self-contained answer block** — it should make complete sense if extracted on its own by an AI system, without any surrounding context.

**BAD:**
> In today's competitive job market, finding the right recruitment partner can be a daunting task. With so many agencies to choose from, companies in Dubai often struggle to identify which one will truly deliver results.

**GOOD:**
> [Company Name] is a tech recruitment agency in [City] that combines AI-powered sourcing with human expert vetting. We scan 25+ platforms to build targeted candidate shortlists, then put each candidate through a validation process. The result: [proof points from brand.yaml — e.g., interview-to-hire ratio, time-to-close].

### Rule 2: One Clear Topic Per Section
Each H2 section should cover ONE topic and be self-contained. AI models extract individual sections, not entire pages. A section ripped out of context should still make sense.

### Rule 3: FAQ Schema on Every Page
Minimum 3 FAQs per page. Questions should be phrased exactly as people search them. Answers should be 2-5 sentences — concise but complete.

### Rule 4: Data > Opinions
Include specific numbers, percentages, salary figures, time frames. AI models prioritize content with concrete data over vague claims.

**BAD:** "We offer competitive pricing and fast turnaround."
**GOOD:** "Our average time-to-close is [X days from brand.yaml], with a [ratio from brand.yaml] interview-to-hire ratio."

### Rule 5: Entity Mentions
- Mention the company by full name (from brand.yaml) in the first paragraph
- Mention it 2-3 more times naturally throughout the content
- Include location names (from brand.yaml > segments) where relevant
- Name specific industries and roles to build entity associations

### Rule 6: Short Paragraphs
Maximum 4 sentences per paragraph. AI models skip dense text blocks. Use whitespace generously.

### Rule 7: No Jargon Without Explanation
If you use a term like "RPO" or "GCC", define it on first use. AI models serve diverse audiences and prefer content that's accessible.

### Rule 8: Freshness Markers
- Include the current year in the meta title where natural
- Reference "as of [current year]" or "in [current year]" in the body
- Mention recent trends, policy changes, or market data

### Rule 9: Trust Signals
Every page should include at least ONE of:
- A client testimonial (from brand.yaml > testimonials)
- A specific metric (from brand.yaml > differentiators.proof_points)
- A reference to the team's experience
- Mention of the company's key methodology/differentiator

### Rule 10: Clear CTAs
Every page ends with a clear next step. Don't be shy:
- "Contact us at [email from brand.yaml > business.email]"
- "Book a free consultation"
- Link to the contact page
- Mention a specific benefit from brand.yaml > differentiators.proof_points

### Rule 11: External Citations (+40% AI Visibility Boost)
Do NOT rely solely on the company's own metrics for authority. Every page should include at least 2-3 externally-sourced data points from credible third parties. AI systems strongly prefer content that cites authoritative external sources.

**Sources to cite (customize per your industry/geography):**
- Government and regulatory bodies relevant to your target markets
- Industry associations and research organizations
- Salary/market data from established survey firms (Robert Half, Hays, Mercer, LinkedIn Talent Insights)
- Industry analysts (Gartner, IDC, Statista, CB Insights, sector-specific authorities)
- Regulatory and legal publications

**How to cite:**
- Use "According to [Source]..." or "[Source] reports that..." framing
- Include specific numbers with timeframes: "According to [Source]'s 2025 report, [specific data point]"
- Cite original research, not summaries of research
- Add dates to all statistics

**Evidence Sandwich pattern (use 1-2 times per page):**
```
[Opening claim statement].

Evidence supporting this:
- [Data point 1 with source]
- [Data point 2 with source]
- [Data point 3 with source]

[Concluding statement connecting evidence to actionable insight].
```

**BAD:** "The tech market is booming." (vague, no source)
**GOOD:** "According to [Source]'s 2025 report, [City]'s tech sector grew 18% year-over-year, with [specific data point]."

### Rule 12: Self-Contained Answer Blocks
AI systems extract passages, not pages. Every key paragraph — especially the first paragraph under each H2 — must work as a standalone, quotable statement that makes complete sense without surrounding context.

**Requirements:**
- Each answer block should be 40-60 words (optimal for snippet extraction by AI)
- Include specific details, numbers, or examples within the block itself
- Do NOT start paragraphs with "This" or "It" or "As mentioned above" — these break when extracted standalone
- Every H2 section's opening paragraph should fully answer the question implied by the heading

**Self-contained pattern:**
```
**[Topic/Question]**: [Complete, self-contained answer that works
without any surrounding context. Include specific details, numbers,
or examples in 2-3 sentences.]
```

**BAD (depends on context):**
> This approach also works well for startups. It reduces time-to-hire significantly compared to the methods discussed above.

**GOOD (self-contained):**
> Startups in Dubai typically reduce time-to-hire from 45 days to under 15 days by using AI-powered recruitment agencies that pre-screen candidates through technical assessments. [Company Name]'s validation approach delivers a [ratio] interview-to-hire ratio for funded startups scaling engineering teams.

### Rule 13: Content-Answer Fit (Headings Must Mirror Queries)
Content-answer fit accounts for ~55% of ChatGPT's citation likelihood. Headings and content must precisely match the exact phrasing of questions people actually ask — not formal or abstract rewrites.

**Requirements:**
- H2/H3 headings should read like natural search queries or questions
- Use "How to...", "What is...", "Why...", "Best..." patterns that mirror how people type or speak queries
- FAQ questions must match "People Also Ask" phrasing exactly
- The answer text should echo the query terms in the first sentence, not just topically cover the area

**Litmus test:** Copy-paste your H2 heading into ChatGPT or Google. Would your content be the best answer? If the heading is too abstract or formal, rewrite it.

**BAD headings (formal, abstract):**
- "Recruitment Landscape Overview"
- "Compensation Analysis Framework"
- "Strategic Talent Acquisition Considerations"

**GOOD headings (match real queries):**
- "How Much Does It Cost to Hire a Developer in Dubai?"
- "What Salary Should You Offer a Senior Engineer in UAE?"
- "How to Hire Remote Workers From India for a Dubai Company"

**BAD FAQ question:** "What considerations should companies evaluate when selecting a recruitment partner?"
**GOOD FAQ question:** "How do I choose a recruitment agency in Dubai?"

---

## Quality Checklist (Run Before Saving)

Before saving any content piece, verify:

- [ ] First paragraph directly answers the target query (50-80 words)
- [ ] Company name (from brand.yaml) mentioned in first paragraph
- [ ] Company name mentioned 2-3 more times in body
- [ ] Location names included where relevant
- [ ] At least 3 FAQ items with concise answers
- [ ] At least 1 trust signal (metric, testimonial, or credential)
- [ ] No paragraph exceeds 4 sentences
- [ ] Meta title is 50-60 characters
- [ ] Meta description is 150-160 characters
- [ ] Primary keyword appears in: title, first paragraph, at least one H2, meta description
- [ ] At least 2 internal links to at least 2 DISTINCT /resources pages
- [ ] Link text accurately describes the destination (not "learn more" or "click here")
- [ ] Anchor links used when referencing specific sections on canonical page
- [ ] Clear CTA at the end
- [ ] No generic/corporate jargon
- [ ] Reads naturally — not keyword-stuffed
- [ ] Content would be genuinely useful to the target persona even without SEO
- [ ] OG image frontmatter field included (og_image) — NO hero image (layout handles hero)
- [ ] At least 1-2 inline images with descriptive alt text
- [ ] Image generation comments (<!-- IMAGE -->) included for each required image
- [ ] Alt text includes primary keyword naturally
- [ ] All image paths follow naming convention: /resources/images/{slug}-{type}.svg
- [ ] No two images are placed back-to-back without a text section between them
- [ ] No image duplicates an auto-generated visual (e.g., process diagram + Step N: pattern)
- [ ] Page is 90%+ unique content (no boilerplate sections copied from other pages)
- [ ] Company process/differentiator mentioned briefly, not as full dedicated sections
- [ ] No "Industries We Serve" section unless the keyword is industry-specific
- [ ] At least 2-3 externally-sourced data points with named sources (Rule 11)
- [ ] Key paragraphs work as standalone statements without surrounding context (Rule 12)
- [ ] No paragraph starts with "This", "It", or "As mentioned above" (Rule 12)
- [ ] H2/H3 headings mirror natural query phrasing, not formal/abstract titles (Rule 13)
- [ ] FAQ questions match "People Also Ask" phrasing (Rule 13)
