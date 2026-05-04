#!/bin/bash
set -euo pipefail

export PATH="/Users/dunkybot/.nvm/versions/node/v22.22.0/bin:$PATH"

PAPERCLIP_URL="${PAPERCLIP_URL:-http://127.0.0.1:3100}"
COMPANY_ID="${COMPANY_ID:-116f1b11-0dbe-4611-89eb-20ec58c9d635}"
WRITER_ID="${WRITER_ID:-89ec7121-d3b3-497a-8acf-04ef83523ee8}"
ANALYST_ID="${ANALYST_ID:-041283a3-391d-453b-acfb-5dd3a4dc9d2c}"
SEO_ID="${SEO_ID:-731a3860-1c17-4285-8cd5-79c1941384c7}"

# Load env vars (Supabase keys)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
if [ -f "$SCRIPT_DIR/../.env.local" ]; then
  set -a
  source "$SCRIPT_DIR/../.env.local"
  set +a
fi
SUPABASE_URL="${NEXT_PUBLIC_SUPABASE_URL}"
SUPABASE_KEY="${SUPABASE_SERVICE_KEY}"

ISSUES_URL="$PAPERCLIP_URL/api/companies/$COMPANY_ID/issues"

# Step 1: Check Paperclip is running
if ! curl -sf "$PAPERCLIP_URL/health" > /dev/null 2>&1; then
  echo "ERROR: Paperclip not running at $PAPERCLIP_URL"
  exit 1
fi
echo "Paperclip is running."

# Step 2: Check how many verdicts are missing
MISSING_VERDICTS=$(curl -s -X POST "$SUPABASE_URL/rest/v1/rpc/count_missing_verdicts" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{}' | tr -d '"')

echo "Missing verdicts: $MISSING_VERDICTS"

# Step 3: Create verdict generation issue (50 schools) assigned to Writer
if [ "$MISSING_VERDICTS" -gt 0 ] 2>/dev/null; then
  echo "Creating verdict generation issue..."
  curl -sf -X POST "$ISSUES_URL" \
    -H "Content-Type: application/json" \
    -d "{
      \"title\": \"Generate verdicts for next 50 schools\",
      \"body\": \"$MISSING_VERDICTS schools are still missing verdicts. Generate 3-sentence data verdicts for the next 50 schools without them. Upsert to school_verdicts table.\",
      \"assigneeAgentId\": \"$WRITER_ID\"
    }" > /dev/null
  echo "Verdict issue created."
fi

# Step 4: Create FAQ generation issue (50 schools) assigned to Writer
echo "Creating FAQ generation issue..."
curl -sf -X POST "$ISSUES_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"title\": \"Generate FAQs for next 50 schools\",
    \"body\": \"Generate 3 FAQs per page for the next 50 schools missing them. Upsert to page_faqs table as JSON.\",
    \"assigneeAgentId\": \"$WRITER_ID\"
  }" > /dev/null
echo "FAQ issue created."

# Step 5: Monday — create weekly analysis issue for Analyst
DAY_OF_WEEK=$(date +%u)
if [ "$DAY_OF_WEEK" -eq 1 ]; then
  echo "Monday: Creating weekly analysis issue..."
  curl -sf -X POST "$ISSUES_URL" \
    -H "Content-Type: application/json" \
    -d "{
      \"title\": \"Weekly data analysis - $(date +%Y-W%V)\",
      \"body\": \"Run weekly analysis: state ROI rankings, outlier detection, data quality checks. Create issues for publishable findings. Compile weekly summary to content/insights/.\",
      \"assigneeAgentId\": \"$ANALYST_ID\"
    }" > /dev/null
  echo "Analyst issue created."
fi

# Step 6: Wednesday — create SEO audit issue for SEO Reviewer
if [ "$DAY_OF_WEEK" -eq 3 ]; then
  echo "Wednesday: Creating SEO audit issue..."
  curl -sf -X POST "$ISSUES_URL" \
    -H "Content-Type: application/json" \
    -d "{
      \"title\": \"SEO completeness audit - $(date +%Y-%m-%d)\",
      \"body\": \"Run completeness audit: count missing verdicts and FAQs. Create batch tasks if gaps > 50. Spot-check 5 random pages for quality. Save report to content/seo-audits/.\",
      \"assigneeAgentId\": \"$SEO_ID\"
    }" > /dev/null
  echo "SEO audit issue created."
fi

echo "Done."
