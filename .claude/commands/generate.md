# Content Generation Skill

Generate a single AEO-optimized content page for the resource hub.

## Input

Page ID or slug to generate: `$ARGUMENTS`

If no argument given, read `data/content-plan.json` and pick the next planned page.

## Step 1: Load ALL Context (MANDATORY — Do Not Skip)

Read these files in this exact order before writing anything:

1. `config/brand.yaml` — brand voice, services, proof points, testimonials
2. `data/content-plan.json` — find the page brief matching the input
3. `agents/content/AGENT.md` — ALL formatting rules, templates, AEO rules 1-13
4. `content/_index.json` — current inventory (to set correct counts)

Then build the published pages registry:
5. Run `find content -name "*.md"` and extract all slugs from published pages
6. This registry is needed for internal linking — you can ONLY link to pages that exist

## Step 2: Identify What Makes This Page Unique

Before writing, answer these questions (write them down):
- What can this page teach that NO other page on the site teaches?
- What unique data, analysis, or practical advice does this page offer?
- Which 2-3 existing pages should this page link to? (ONLY from published registry)
- Which existing pages could link back to this page?

## Step 3: Write the Content

Follow the template from `agents/content/AGENT.md` for the page type.

### Absolute Rules (Violations = Immediate Rewrite)

**LINKING:**
- ONLY link to pages that exist in your published registry from Step 1
- NEVER link to future/planned pages that haven't been created yet
- Every `/resources/` link must point to a real, published slug
- If the content plan says to link to a future page that doesn't exist yet, DO NOT link to it — find an alternative published page or omit the link
- Minimum 2 distinct published pages linked
- Link text must describe the destination (not "learn more" or "click here")

**FIRST PARAGRAPH:**
- 50-80 words, directly answers the primary keyword query
- Mentions the company name from `brand.yaml > business.name` by full name
- Includes geographic specificity (city/country) where relevant
- Works as a standalone statement if extracted by AI

**META:**
- meta_description: EXACTLY 150-160 characters (count precisely)
- meta_title: 50-60 characters

**FAQs:**
- Minimum 3 FAQs in YAML frontmatter ONLY
- NEVER add FAQ sections in the markdown body
- Questions phrased as natural search queries

**ANTI-REPETITION:**
- 90%+ unique content — no boilerplate sections from other pages
- Process/differentiator details: 1-2 sentence mention + link to the canonical main service page (`brand.yaml > canonical_pages.main_service_page`), not full explanation
- No repeated "How [Company] Solves..." boilerplate sections
- No "Industries We Serve" unless keyword is industry-specific

**AEO RULES:**
- Rule 11: Minimum 2-3 external citations with source names and dates
- Rule 12: No paragraph starts with "This", "It", "As mentioned above"
- Rule 13: H2/H3 headings mirror natural query phrasing
- Max 4 sentences per paragraph
- Company name (from `brand.yaml > business.name`) mentioned 3+ times total

**IMAGES:**
- `show_metrics: true` ONLY on direct service pitch landing pages
- `og_image` path: `/resources/images/{slug}-og.svg`
- 1-2 inline images with descriptive alt text
- No two images back-to-back without text between them

## Step 4: Create SVG Images

For each page, create:

1. **OG Image** (`{slug}-og.svg`, 1200x630px)
   - Gradient background using colors from `brand.yaml > design.colors` (primary → darker variant)
   - Title in white, key stat in accent color (`brand.yaml > design.colors.accent_1`)
   - Stats bar at bottom with key metrics
   - Brand footer: use URL from `brand.yaml > content_config.base_url`

2. **1-2 Inline Infographics** (1100x400-600px)
   - Light background (use `brand.yaml > design.colors.bg_light`)
   - Data comparison cards, process flows, or market data
   - Brand colors from `brand.yaml > design.colors` (primary, accent_1, accent_2)
   - Source attribution at bottom

Save SVGs to: `site/public/resources/images/`

## Step 5: Update Inventory

Update `content/_index.json`:
- Increment `total_pieces` by 1
- Increment the correct `by_status.published` count
- Increment the correct `by_type.{page-type}` count
- Increment the correct `by_segment.{segment}` count

## Step 6: Build and Verify

Run `cd site && npm run build` and verify:
- Page count incremented by 1
- Build completes without errors

## Step 7: Self-Check Before Committing

Run through this quick checklist mentally:
- [ ] Every `/resources/` link points to a published page (verified against registry)
- [ ] meta_description is 150-160 characters (counted)
- [ ] First paragraph is 50-80 words with company name and location
- [ ] FAQs are in frontmatter ONLY, not in markdown body
- [ ] 2+ external citations with source names and dates
- [ ] No paragraph starts with "This", "It", or references prior context
- [ ] All SVG image files created and referenced correctly
- [ ] `_index.json` updated with correct counts
- [ ] Build succeeded

## Step 8: Commit (Do NOT Push Yet)

```
git add content/{type}/{slug}.md content/_index.json site/public/resources/images/{slug}-*.svg
git commit -m "p-{NNN}: {Title} — {brief description}"
```

Do NOT push yet. The audit must pass first.

## Step 9: Launch Independent Audit (MANDATORY — Do NOT Skip)

You MUST launch the audit as a **separate subagent** using the Agent tool. This is critical for eliminating context bias — the auditor must NOT share your conversation context.

Use the Agent tool with this exact pattern:

```
Agent tool call:
  description: "Audit p-{NNN} content page"
  prompt: |
    You are an independent content auditor. You have NO knowledge of why this content
    was written or what decisions the writer made. Your job is to be harsh and thorough.

    Audit the file: content/{type}/{slug}.md

    Read these instruction files first:
    - agents/seo/AGENT.md (SEO checklist)
    - agents/content/AGENT.md (AEO rules 1-13, anti-repetition rules)
    - config/brand.yaml (brand voice rules)

    Then run ALL 15 checks from .claude/commands/audit.md against the content file.

    CRITICAL CHECKS (must verify by reading actual files, not assumptions):
    1. Build published pages registry (find content -name "*.md", extract slugs)
    2. Validate EVERY /resources/ link against registry — read target files to confirm they exist
    3. For anchor links (#something), read the target file and verify the anchor ID exists
    4. Count meta_description characters precisely
    5. Count first paragraph words precisely
    6. Verify SVG image files exist at site/public/resources/images/

    Output a structured audit report with PASS/FAIL for each check.
    List ALL failures with specific line references and fix instructions.
    Do NOT be lenient. If something is borderline, flag it.
```

## Step 10: Handle Audit Results

**If audit returns 0 failures:** Skip to Step 12 (push).

**If audit returns failures:** Proceed to Step 11 (rewrite loop).

NEVER push code that has audit failures.

## Step 11: Rewrite Loop (Only If Audit Found Failures)

The rewrite MUST also be done by a **separate subagent** — NOT by the original writer.
This prevents the writer from making minimal patches based on its writing context.

Launch a rewriter subagent using the Agent tool:

```
Agent tool call:
  description: "Fix audit failures for p-{NNN}"
  prompt: |
    You are a content REWRITER. You did NOT write this content. You are receiving a file
    and an audit report, and your job is to fix every failure listed in the report.

    FILE TO FIX: content/{type}/{slug}.md
    SVG FILES (if image issues): site/public/resources/images/{slug}-*.svg

    AUDIT FAILURES TO FIX:
    {paste the exact failure list from the audit report}

    INSTRUCTIONS:
    1. Read the file
    2. Read agents/content/AGENT.md for the rules being enforced
    3. Fix EVERY failure listed above — do not skip any
    4. For broken links: build the published pages registry first
       (read all .md files in content/ subdirectories, extract slugs)
       and replace broken links with valid published page slugs
    5. For meta_description length: rewrite to EXACTLY 150-160 characters (count precisely)
    6. For first paragraph issues: rewrite to 50-80 words with company name (from brand.yaml) and location
    7. For orphaned "This"/"It" paragraph starts: rewrite opening to be self-contained
    8. For missing external citations: add 2-3 citations with source names and dates
    9. For image issues: create/fix SVG files as needed
    10. After ALL fixes, re-count meta_description characters and first paragraph words
        to verify they're in range

    Use the Edit tool to make changes. Do NOT rewrite the entire file — only fix the
    specific failures listed. Preserve all content that passed the audit.

    After fixing, run: cd site && npm run build
    Verify it builds successfully.

    Then stage and commit:
    git add content/{type}/{slug}.md [any other changed files]
    git commit -m "p-{NNN}: fix audit failures — {brief summary of fixes}"
```

After the rewriter finishes, launch a **FRESH audit subagent** (Step 9 again — new instance,
no context from the previous audit or the rewriter). This is the re-validation pass.

**Maximum 2 rewrite loops.** If the audit still fails after 2 rewrites:
- Do NOT push
- Surface the remaining failures to the user with:
  > p-{NNN} has {N} remaining audit failures after 2 rewrite attempts.
  > Failures: {list them}
  > Manual intervention needed. Run `/audit content/{type}/{slug}.md` to review.

## Step 12: Push (Only After Clean Audit)

```
git push
```

Tell the user:
> p-{NNN} generated, audited (0 failures), and deployed.
> Audit was run by an isolated subagent. {N} rewrite(s) needed before passing.

If no rewrites were needed:
> p-{NNN} generated, audited (0 failures, first pass), and deployed.
