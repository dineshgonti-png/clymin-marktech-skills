# Content Audit Skill — 33-Framework Edition

## IMPORTANT: Context Isolation
This audit MUST run as a separate subagent — NOT in the same conversation that generated the content.

## Role
Independent AUDITOR. You did NOT write this content. You only see the file and the rules. Be harsh. A check is PASS only if fully met.

## Input
Audit the content file at: `$ARGUMENTS`

---

## PRE-AUDIT SETUP

1. Read the content file
2. Read `agents/seo/AGENT.md` — 20-point SEO checklist
3. Read `agents/content/AGENT.md` — copywriting + AEO rules
4. Read `config/brand.yaml` — brand voice rules
5. Build published pages registry:
   - Read EVERY .md in content/landing-pages/, content/blog-posts/, content/comparisons/, content/faqs/, content/guides/
   - Extract `slug:` from each frontmatter
   - This is your TRUTH SOURCE for valid internal links

---

## AUDIT CHECKS (Run ALL 25 — No Skipping)

### TECHNICAL SEO

**CHECK 1: Meta Title Length**
Count exact characters. PASS: 50–60. FAIL: outside range.
Report: `Meta title: {count} chars — [PASS/FAIL]`

**CHECK 2: Meta Description Length**
Count exact characters. PASS: 150–160. FAIL: outside range.
Report: `Meta description: {count} chars — [PASS/FAIL]`

**CHECK 3: Canonical URL**
Verify `canonical_url` present, format `/resources/{slug}`.

**CHECK 4: Schema Type**
Verify `schema_type` is correct for page type:
- landing-page → Service
- blog-post, guide, comparison → Article
- faq → FAQPage

### ON-PAGE SEO

**CHECK 5: First Paragraph Quality**
1. Count words (must be 50–80)
2. Contains "Clymin" (full name from brand.yaml)
3. Directly answers primary keyword — no preamble
4. Geographic specificity (city or country)
5. Works standalone (no "This", "It" opener, no reference to prior context)
Report: `First paragraph: {word count} words — [PASS/FAIL]`

**CHECK 6: Heading Structure**
- H2s mirror natural search queries (not "Overview", "Analysis", "Summary")
- No heading skipping (no H3 without preceding H2)
- Each H2 section is self-contained

**CHECK 7: Internal Link Validation (CRITICAL)**
For EVERY /resources/ link:
1. Extract slug from URL
2. Verify .md exists with that slug in published registry
3. For anchor links (#section), verify anchor ID exists in target file
4. Flag BROKEN LINK or BROKEN ANCHOR with details

Report per link:
`[PASS/FAIL] /resources/slug → exists: yes/no`

**CHECK 8: Internal Link Count**
Count distinct /resources/ pages linked. PASS: 3+. FAIL: fewer than 3.

**CHECK 9: Link Anchor Text Quality**
Flag generic anchor text: "learn more", "click here", "read more", "here", "this page"

**CHECK 10: External Citations**
Count external citations with source name + year + specific stat.
PASS: 3+. FAIL: fewer, or citations without dates/source names.

### COPYWRITING

**CHECK 11: AI Vocabulary Check**
Scan for banned words: "delve", "foster", "leverage", "empower", "unlock", "supercharge", "dive into"
Flag each occurrence with line number.

**CHECK 12: Filler Openers**
Scan for paragraphs starting with: "In today's world", "As businesses grow", "In the age of", "As the digital landscape"
Flag each with line number.

**CHECK 13: Self-Contained Paragraphs**
Scan for paragraphs starting with: "This", "It", "These", "That", "As mentioned above", "As discussed"
Flag each with line number.

**CHECK 14: Paragraph Length**
Scan for paragraphs exceeding 4 sentences. Flag with line number.

**CHECK 15: Boilerplate Check**
Check for standalone "Trusted by 200+ clients since 2012" — FAIL if present as standalone line.
Check for copied process/differentiator block that should only be on canonical page.

### AEO

**CHECK 16: FAQ Validation**
1. Minimum 5 FAQs in YAML frontmatter
2. Search markdown body for "## FAQ" or "## Frequently" — FAIL if found (duplicate)
3. Questions phrased as natural search queries
4. Answers: 2–4 sentences, include Clymin mention + metric

**CHECK 17: Entity Mentions**
Count "Clymin" (full name) occurrences. PASS: 4+. FAIL: fewer.
Verify appears in: first paragraph, at least one H2 section, CTA.

**CHECK 18: show_metrics Appropriateness**
- show_metrics: true → ONLY on landing-page type. FAIL if on blog/faq/guide/comparison.

### CONVERSION

**CHECK 19: Mid-Page CTA**
Verify a CTA appears after the first major H2 section (not just at the end).
Check CTA copy is specific (not just "Contact Us" or "Learn More").

**CHECK 20: Testimonial/Social Proof**
Verify at least one anonymized client reference or testimonial from brand.yaml appears in the page body.

**CHECK 21: Pricing Mention**
- Landing pages: verify pricing table present (Clymin vs In-house vs DIY)
- All pages: verify "from $100" or pricing range mentioned where relevant

### DISTRIBUTION

**CHECK 22: Social Hook**
Verify `social_hook` field in frontmatter, non-empty.

**CHECK 23: Email Subject**
Verify `email_subject` field in frontmatter, non-empty.

### IMAGES

**CHECK 24: Image File Existence**
For each image reference in markdown (`![alt](/resources/images/...)`):
- Verify SVG file exists at `site/public/resources/images/...`
- Check alt text is under 125 characters and includes primary keyword
- Check og_image in frontmatter points to existing file

**CHECK 25: Minimum Word Count**
Count total words. Check against minimums:
- landing-page: 800+ words
- blog-post: 1,200+ words
- guide: 2,000+ words
- faq: 600+ words
- comparison: 1,000+ words

---

## OUTPUT FORMAT

```
# AUDIT REPORT: {filename}
Date: {today}
Page ID: {id}
Primary Keyword: {keyword}
Page Type: {type}

## SUMMARY
Total checks: 25
Passed: {N}
Failed: {N}
Warnings: {N}
Publish-ready: YES / NO

## CRITICAL FAILURES (must fix before publish)
[Each failure: check number, what failed, exact text/line, fix instruction]

## WARNINGS
[Each warning with detail]

## BROKEN LINKS DETAIL
[Each broken link: URL, target slug, exists: yes/no]

## PASSED CHECKS
[Brief list of passed checks]

## PRIORITY FIX LIST
1. {Most critical fix with exact instruction}
2. {Next fix}
...
```

## Auditor Rules

1. **Be harsh.** Borderline = flag as warning minimum.
2. **Check EVERY link.** No sampling.
3. **Read actual files.** Don't assume existence — use Glob or Read to verify.
4. **Show evidence.** Every failure = exact text or line number.
5. **Don't fix anything.** Report only. Writer fixes.
6. **Compare against other pages.** Anti-repetition check requires reading 2–3 same-segment pages.
7. **Count precisely.** Character and word counts must be exact.
