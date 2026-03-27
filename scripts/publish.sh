#!/bin/bash
# publish.sh — Build Astro site and deploy to Vercel
# Run from the project root: ./scripts/publish.sh

set -e

echo "=== AEO Publisher ==="
echo ""

# Read site URL from brand.yaml
BRAND_FILE="config/brand.yaml"
if [ ! -f "$BRAND_FILE" ]; then
  echo "ERROR: config/brand.yaml not found. Run ./scripts/setup.sh first."
  exit 1
fi

SITE_URL=$(grep 'website:' "$BRAND_FILE" | head -1 | sed 's/.*website: *"\{0,1\}//' | sed 's/"\{0,1\} *$//')
if [ -z "$SITE_URL" ]; then
  echo "ERROR: business.website not set in config/brand.yaml"
  exit 1
fi

# Step 1: Count publishable content
PUBLISHED=$(grep -rl 'status: "published"' content/ 2>/dev/null | wc -l)
DRAFT=$(grep -rl 'status: "draft"' content/ 2>/dev/null | wc -l)
echo "Content: $PUBLISHED published, $DRAFT drafts"
echo ""

if [ "$PUBLISHED" -eq 0 ]; then
  echo "No published content found. Change status to 'published' in content files first."
  exit 1
fi

# Step 2: Build Astro site
echo "Building Astro site..."
cd site
npm run build
echo "Build complete."
echo ""

# Step 3: Deploy to Vercel
echo "Deploying to Vercel..."
npx vercel --prod
echo ""

echo "=== Deploy complete ==="
echo "Site live at: ${SITE_URL}/resources"
echo ""
echo "Next steps:"
echo "  1. Verify pages load correctly"
echo "  2. Check Google Search Console for indexing"
echo "  3. Submit sitemap if needed"
