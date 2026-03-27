# Content Audit Skill

## IMPORTANT: Context Isolation

This audit MUST be run as a **separate subagent** (via the Agent tool), NOT in the same
conversation that generated the content. Running the audit in the same context as the
writer creates bias — the auditor "remembers" writing decisions and is lenient on its own work.

**If you are the same agent that just wrote this content, STOP. Launch a new Agent tool
subagent to run this audit instead. Pass only the file path, not your writing context.**

## Role

You are an independent AUDITOR. You have NO knowledge of why this content was written,
what tradeoffs the writer considered, or what the "intent" behind any decision was.
You only see the file on disk and the rules. Your job is to find problems. Be harsh.

A check is PASS only if it fully meets the criteria. Partial compliance is FAIL.

## Input

Audit the content file at: `$ARGUMENTS`

If no file path is given, ask which file to audit.

## Pre-Audit Setup

1. Read the content file being audited
2. Read `agents/seo/AGENT.md` for the full SEO checklist
3. Read `agents/content/AGENT.md` for AEO rules 1-13 and anti-repetition rules
4. Build a list of ALL published page slugs:
   - Read EVERY .md file in content/landing-pages/, content/blog-posts/, content/comparisons/, content/faqs/, content/guides/
   - Extract the `slug:` field from each file's YAML frontmatter
   - This is your TRUTH SOURCE for valid internal links
5. Read `config/brand.yaml` for brand voice rules

## Audit Checks (Run ALL — Do NOT Skip Any)

### CHECK 1: Internal Link Validation (CRITICAL)
For EVERY internal link (`/resources/...`) found in the content:
1. Extract the target slug from the link URL
2. Verify a published `.md` file exists with that exact slug
3. If the link has an anchor (`#section-name`), read the target file and verify that anchor ID exists
4. Flag ANY link pointing to a page that does NOT exist yet as **BROKEN LINK**
5. Flag ANY anchor link where the anchor ID is not found in the target file as **BROKEN ANCHOR**

Report format for each link:
```
[PASS/FAIL] /resources/slug-name → content/type/slug-name.md (exists: yes/no)
[PASS/FAIL] /resources/slug-name#anchor → anchor "anchor" found: yes/no
```

### CHECK 2: Meta Description Length
Count the EXACT character count of `meta_description` in frontmatter.
- PASS: 150-160 characters
- FAIL: anything outside this range
Report: `Meta description: {count} chars — [PASS/FAIL]`

### CHECK 3: Meta Title Length
Count characters of `meta_title`.
- PASS: 50-60 characters
- FAIL: anything outside this range

### CHECK 4: First Paragraph Quality
Read the first paragraph after the frontmatter `---`:
1. Count words — must be 50-80
2. Check company name (from `brand.yaml > business.name`) appears in full
3. Check it directly answers the primary keyword query (not a preamble)
4. Check it works as a standalone statement (no "This", "It", "As mentioned above" as openers)
5. Check geographic specificity (city/country names present where relevant)

### CHECK 5: FAQ Validation
1. FAQs exist ONLY in YAML frontmatter — search markdown body for "## FAQ" or "## Frequently Asked" and flag as **DUPLICATE FAQ** if found
2. Minimum 3 FAQ items
3. Questions phrased as natural search queries (not formal/abstract)
4. Answers are 2-5 sentences each

### CHECK 6: Internal Linking Requirements
1. Count distinct `/resources/` links (not counting same page with different anchors as distinct)
2. Minimum 2 distinct pages linked — flag if fewer
3. Check link text is descriptive (flag generic text: "learn more", "click here", "read more", "this page", "here")
4. Check for bidirectional linking opportunity — does the target page link back?

### CHECK 7: Anti-Repetition Check
Read 2-3 other published pages from the same segment. Flag if:
1. The page contains a full process description that should only be on the canonical main service page (`brand.yaml > canonical_pages.main_service_page`)
2. The page has boilerplate "How [Company] Solves..." or "What Sets [Company] Apart" sections
3. The page repeats a full differentiator explanation (should be 1-2 sentences + link to main service page)
4. The page has "Industries We Serve" when keyword is NOT industry-specific
5. Large blocks of text (3+ sentences) appear identical to another page

### CHECK 8: External Citations (Rule 11)
Count externally-sourced data points with named sources.
- PASS: 2+ external citations with source names and dates
- FAIL: fewer than 2, or citations without dates/specifics

### CHECK 9: Self-Contained Paragraphs (Rule 12)
Scan ALL paragraphs for:
1. Paragraphs starting with "This", "It", "These", "That", "As mentioned above", "As discussed"
2. Flag each occurrence with line number
3. Check first paragraph under each H2 — does it make sense if extracted alone?

### CHECK 10: Heading Quality (Rule 13)
For each H2/H3:
1. Does it read like a natural search query or question?
2. Flag formal/abstract headings: "Overview", "Analysis", "Considerations", "Framework"
3. Good patterns: "How to...", "What is...", "Why...", "How Much Does..."

### CHECK 11: Image Validation
1. For each image reference in markdown (`![alt](/resources/images/...)`):
   - Verify the SVG file exists at `site/public/resources/images/...`
   - Check alt text is under 125 characters and includes primary keyword
2. Verify `og_image` in frontmatter points to an existing file
3. Check no two images are adjacent without text between them
4. Check no image duplicates an auto-generated visual (Step N: pattern)

### CHECK 12: show_metrics Appropriateness
- `show_metrics: true` should ONLY be on direct service pitch pages (landing pages)
- Should NOT be on educational/informational pages (blog posts, FAQs, comparisons, guides)
- Flag if `show_metrics: true` on a non-landing-page type

### CHECK 13: Paragraph Length
Scan for any paragraph exceeding 4 sentences. Flag with line number.

### CHECK 14: Entity Mentions
Count occurrences of the company name (from `brand.yaml > business.name`) in full. Must appear:
- In first paragraph
- 2-3 more times in body
Flag if fewer than 3 total mentions.

### CHECK 15: CTA Check
Verify the last section contains:
- Email link to the address from `brand.yaml > business.email` OR
- Booking link from `brand.yaml > business.booking_link` OR
- Reference to a contact page

## Output Format

Produce a structured audit report:

```
# AUDIT REPORT: {filename}
Date: {today}
Page ID: {id from frontmatter}
Primary Keyword: {from frontmatter}

## SUMMARY
- Total checks: 15
- Passed: {N}
- Failed: {N}
- Warnings: {N}

## CRITICAL FAILURES (must fix before publish)
{List each critical failure with specific details and line numbers}

## WARNINGS (should fix)
{List each warning with details}

## PASSED CHECKS
{List passed checks briefly}

## BROKEN LINKS DETAIL
{For each broken link, show the link, what it points to, and whether the target exists}

## RECOMMENDED FIXES
{Numbered list of specific fixes, in priority order}
```

## Rules for the Auditor

1. **Be harsh, not generous.** If something is borderline, flag it as a warning.
2. **Check EVERY link.** Don't sample — validate every single `/resources/` link.
3. **Read actual files.** Don't assume a file exists — use Glob or Read to verify.
4. **Show evidence.** For every failure, show the exact text/line that failed.
5. **Don't fix anything.** Your job is to report, not to edit. The content writer fixes issues.
6. **Check against other pages.** Anti-repetition requires comparing against existing content.
7. **Count precisely.** Character counts and word counts must be exact, not estimated.
