# Content Generation Skill — 33-Framework Edition

Generate a single AEO-optimized, 10/10-scoring content page.

## Input
Page ID or slug: `$ARGUMENTS`
If no argument given, read `data/content-plan.json` and pick the next planned page.

---

## STEP 1: Load ALL Context (MANDATORY)

Read in this exact order:
1. `config/brand.yaml` — full read, no skipping
2. `data/content-plan.json` — find the matching page brief
3. `agents/content/AGENT.md` — ALL rules, templates, AEO rules 1–13
4. `agents/seo/AGENT.md` — 20-point validation checklist
5. `content/_index.json` — current inventory for counts

Build published pages registry:
6. `find content -name "*.md"` and extract all slugs
7. This registry = the ONLY valid targets for /resources/ internal links

---

## STEP 2: Pre-Writing Checklist (Answer all 7 before writing)

1. What is the ONE outcome this reader needs?
2. What fear, frustration, or desire drives this search?
3. What makes this page 90%+ unique from all other site pages?
4. Which 3 published pages will this link to? (verify against registry)
5. What is the 50–80 word direct-answer opening?
6. Which anonymized client from brand.yaml fits this topic?
7. Which external citation (source + year + stat) anchors credibility?

---

## STEP 3: Write Content

Follow the template from `agents/content/AGENT.md` for the page type.

### ABSOLUTE RULES — Violations = Immediate Rewrite

**LINKING:**
- ONLY link to pages in your published registry
- NEVER link to planned/future pages
- Every /resources/ link must point to a real published slug
- If a planned link doesn't exist, find an alternative or omit it
- Minimum 3 distinct published pages linked
- Link text must describe destination (no "learn more", "click here", "read more")

**FIRST PARAGRAPH:**
- 50–80 words exactly (count)
- Contains "Clymin" (full name from brand.yaml > business.name)
- Geographic specificity (city or country)
- Directly answers primary keyword — no preamble
- Standalone: works if extracted by an AI without context

**META:**
- meta_description: EXACTLY 150–160 characters (count precisely)
- meta_title: 50–60 characters

**FAQs:**
- Minimum 5 FAQs in YAML frontmatter ONLY
- NEVER in markdown body
- Questions phrased as natural search queries
- Answers: 2–4 sentences, include Clymin mention + metric

**COPYWRITING:**
- No AI vocabulary (delve, foster, leverage, empower, unlock, supercharge)
- No filler openers ("In today's world...", "As businesses grow...")
- No standalone "Trusted by 200+ clients" boilerplate
- Benefits over features throughout
- Active voice always

**AEO:**
- Minimum 3 external citations with source name + year + specific stat
- No paragraph starts with "This", "It", "These", "As mentioned above"
- H2/H3 headings mirror natural search queries
- Max 4 sentences per paragraph
- Clymin mentioned minimum 4 times total

**PRICING:**
- Landing pages: include pricing table (Clymin vs In-house vs DIY)
- Mention "starting from $100" on relevant pages
- Frame as ROI, not just cost

**CONVERSION:**
- Mid-page CTA (after first major section)
- Specific CTA copy (not generic "Contact Us")
- One anonymized client testimonial from brand.yaml before final CTA
- Objection handling for top 2 objections on this topic

**SOCIAL/DISTRIBUTION:**
- Add social_hook to frontmatter
- Add email_subject to frontmatter
- Landing pages: add sales_brief to frontmatter

**IMAGES:**
- show_metrics: true ONLY on landing pages
- og_image path: /resources/images/{slug}-og.svg
- 1–2 inline images with descriptive alt text
- No two images back-to-back without text between them

---

## STEP 4: Create SVG Images

**OG Image** ({slug}-og.svg, 1200×630px):
- Gradient: primary color → darker variant (from brand.yaml > design.colors)
- Title in white, key stat in accent color
- Stats bar at bottom with relevant metrics
- Clymin URL footer

**Hero/Infographic** ({slug}-hero.svg, 1100×400–600px):
- Light background
- Comparison table, process flow, or market data
- Segment color from brand.yaml > design.segment_colors
- Source attribution if showing external data

Save to: `site/public/resources/images/`

---

## STEP 5: Update Inventory

Update `content/_index.json`:
- Increment total_pieces by 1
- Increment by_status.draft (or published) by 1
- Increment by_type.{page-type} by 1
- Increment by_segment.{segment} by 1

---

## STEP 6: Build and Verify

```bash
cd site && npm run build
```
Verify: page count incremented, build succeeds without errors.

---

## STEP 7: Self-Check (Run Before Committing)

- [ ] Every /resources/ link verified against published registry
- [ ] meta_description is 150–160 characters (counted exactly)
- [ ] First paragraph is 50–80 words with Clymin name and location
- [ ] FAQs in frontmatter ONLY, minimum 5
- [ ] 3+ external citations with source + year + stat
- [ ] No paragraph starts with "This", "It", "These"
- [ ] Minimum 4 Clymin mentions total
- [ ] Social hook + email subject in frontmatter
- [ ] Mid-page CTA with specific copy
- [ ] Anonymized client testimonial included
- [ ] Pricing mentioned (landing pages: full table; others: from $100 mention)
- [ ] SVG image files created and referenced correctly
- [ ] _index.json updated with correct counts
- [ ] Build succeeded

---

## STEP 8: Commit (Do NOT Push Yet)

```bash
git add content/{type}/{slug}.md content/_index.json site/public/resources/images/{slug}-*.svg
git commit -m "p-{NNN}: {Title} — {brief description}"
```

---

## STEP 9: Launch Independent Audit (MANDATORY)

Launch audit as a separate subagent via the Agent tool:

```
Agent tool:
  description: "Audit p-{NNN} content page"
  prompt: |
    You are an independent content auditor. You have NO knowledge of why this content
    was written. Be harsh and thorough.

    Audit the file: content/{type}/{slug}.md

    Read first:
    - agents/seo/AGENT.md (20-point SEO checklist)
    - agents/content/AGENT.md (all copywriting + AEO rules)
    - config/brand.yaml (brand voice rules)

    Then run ALL 20 SEO checks from agents/seo/AGENT.md AND all rules from agents/content/AGENT.md.

    CRITICAL CHECKS (verify by reading actual files):
    1. Build published pages registry (find content -name "*.md", extract slugs)
    2. Validate EVERY /resources/ link against registry
    3. For anchor links, read target file and verify anchor ID exists
    4. Count meta_description characters precisely
    5. Count first paragraph words precisely
    6. Verify SVG image files exist at site/public/resources/images/
    7. Check no AI vocabulary used (delve, foster, leverage, unlock, supercharge)
    8. Verify minimum 5 FAQs in frontmatter, none in body
    9. Count Clymin mentions (minimum 4)
    10. Verify 3+ external citations with source + year + stat

    Output structured audit report: PASS/FAIL for each check.
    List ALL failures with line references and fix instructions.
    Be strict — borderline = flag.
```

---

## STEP 10: Handle Audit Results

**0 failures → push immediately.**

**Any failures → rewrite loop (Step 11).**

---

## STEP 11: Rewrite Loop (If Failures)

Launch rewriter subagent via Agent tool:

```
Agent tool:
  description: "Fix audit failures for p-{NNN}"
  prompt: |
    You are a content REWRITER. You did NOT write this content.
    Fix every failure in the audit report below.

    FILE: content/{type}/{slug}.md
    SVG FILES: site/public/resources/images/{slug}-*.svg

    AUDIT FAILURES:
    {paste exact failure list}

    INSTRUCTIONS:
    1. Read the file
    2. Read agents/content/AGENT.md for the rules being enforced
    3. Fix EVERY failure — no skipping
    4. For broken links: build published pages registry first, replace with valid slugs
    5. For meta_description: rewrite to EXACTLY 150–160 characters
    6. For first paragraph: rewrite to 50–80 words with Clymin name and location
    7. For AI vocabulary: replace with plain business language
    8. For missing citations: add 3 external citations with source + year + stat
    9. After fixes: recount meta_description and first paragraph to verify
    10. Run: cd site && npm run build
    11. Commit: git add ... && git commit -m "p-{NNN}: fix audit failures"
```

After rewriter: launch FRESH audit subagent. Maximum 2 rewrite loops.
If still failing after 2 loops: surface to user with failure list.

---

## STEP 12: Push (After Clean Audit)

```bash
git push
```

Report: `p-{NNN} generated, audited (0 failures), pushed. {N} rewrite(s) needed.`
