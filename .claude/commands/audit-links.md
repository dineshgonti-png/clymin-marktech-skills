# Bulk Link Audit Skill

Scan ALL published content pages for broken internal links.

## Process

1. Build the published pages registry:
   - Read every `.md` file in `content/` subdirectories
   - Extract the `slug` from each file's frontmatter
   - Build a set of valid slugs (the truth source)

2. For EVERY published `.md` file:
   - Extract all internal links matching `/resources/[^")\s]+`
   - For each link:
     a. Parse the slug (strip `/resources/` prefix and any `#anchor` suffix)
     b. Check if the slug exists in the valid slugs set
     c. If it has an `#anchor`, read the target file and search for `id="{anchor}"` in the content
     d. Record result: PASS or BROKEN

3. Also check frontmatter `canonical_url` — verify it matches `/resources/{slug}`

## Output Format

```
# LINK AUDIT REPORT
Date: {today}
Total pages scanned: {N}
Total links found: {N}
Broken links: {N}
Broken anchors: {N}

## BROKEN LINKS
{For each broken link:}
- FILE: content/{type}/{slug}.md (line ~{N})
  LINK: /resources/{target-slug}
  STATUS: TARGET NOT FOUND — no published page with slug "{target-slug}"
  SUGGESTION: {suggest closest existing slug, or "Remove link — target page not yet created"}

## BROKEN ANCHORS
{For each broken anchor:}
- FILE: content/{type}/{slug}.md
  LINK: /resources/{target-slug}#{anchor}
  STATUS: Page exists but anchor "#{anchor}" not found in target
  SUGGESTION: {suggest fix}

## ORPHAN PAGES (no incoming links)
{Pages that no other page links to — these are SEO-isolated}

## SUMMARY TABLE
| Page | Outgoing Links | Broken | Status |
|---|---|---|---|
| {slug} | {N} | {N} | OK/HAS ISSUES |
```

## After the Audit

If broken links are found, list the specific fixes needed:
1. Links to unpublished future pages → remove or replace with existing page
2. Wrong slugs → correct to actual slug
3. Broken anchors → remove anchor or add the anchor ID to the target page
4. Orphan pages → suggest which pages should link to them

Do NOT auto-fix. Present the report and ask the user what to fix.
