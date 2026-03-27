#!/bin/bash
# setup.sh — Initialize the AEO project
# Run from the project root: ./scripts/setup.sh

set -e

echo "=== AEO Starter — Setup ==="
echo ""

# -------------------------------------------------------
# Step 1: Validate brand.yaml exists and has required fields
# -------------------------------------------------------
BRAND_FILE="config/brand.yaml"

if [ ! -f "$BRAND_FILE" ]; then
  echo "ERROR: $BRAND_FILE not found."
  echo "Copy the template and fill in your brand details first."
  exit 1
fi

# Check that business.name is not empty or placeholder
BRAND_NAME=$(grep -A1 '^business:' "$BRAND_FILE" | grep 'name:' | head -1 | sed 's/.*name: *"\{0,1\}//' | sed 's/"\{0,1\} *$//')
if [ -z "$BRAND_NAME" ] || [ "$BRAND_NAME" = "Your Company Name" ]; then
  echo "ERROR: business.name in $BRAND_FILE is empty or still a placeholder."
  echo "Fill in your company name before running setup."
  exit 1
fi

# Check that business.website is not empty or placeholder
BRAND_WEBSITE=$(grep 'website:' "$BRAND_FILE" | head -1 | sed 's/.*website: *"\{0,1\}//' | sed 's/"\{0,1\} *$//')
if [ -z "$BRAND_WEBSITE" ] || [ "$BRAND_WEBSITE" = "https://www.example.com" ]; then
  echo "ERROR: business.website in $BRAND_FILE is empty or still a placeholder."
  echo "Fill in your website URL before running setup."
  exit 1
fi

echo "Brand: $BRAND_NAME"
echo "Website: $BRAND_WEBSITE"
echo ""

# -------------------------------------------------------
# Step 2: Install site dependencies
# -------------------------------------------------------
echo "Installing site dependencies..."
cd site
npm install
cd ..
echo "Dependencies installed."
echo ""

# -------------------------------------------------------
# Step 3: Initialize content/_index.json if it doesn't exist
# -------------------------------------------------------
INDEX_FILE="content/_index.json"

if [ ! -f "$INDEX_FILE" ]; then
  echo "Initializing $INDEX_FILE..."
  echo '{ "pages": [], "last_updated": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'" }' > "$INDEX_FILE"
  echo "Created $INDEX_FILE"
else
  echo "$INDEX_FILE already exists — skipping."
fi
echo ""

# -------------------------------------------------------
# Step 4: Test build
# -------------------------------------------------------
echo "Running test build..."
cd site
npm run build
cd ..
echo "Build successful."
echo ""

# -------------------------------------------------------
# Done
# -------------------------------------------------------
echo "=== Setup Complete ==="
echo ""
echo "Next steps:"
echo "  1. Run 'research' to generate keyword data for your target segments"
echo "  2. Run 'plan' to create a content plan from keyword research"
echo "  3. Run 'generate [topic]' or 'batch [N]' to create content"
echo "  4. Review content, set status to 'published' in frontmatter"
echo "  5. Run './scripts/publish.sh' to build and deploy"
echo ""
echo "For full workflow details, see CLAUDE.md"
