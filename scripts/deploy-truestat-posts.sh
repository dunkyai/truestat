#!/bin/bash
set -euo pipefail

export PATH="/Users/dunkybot/.nvm/versions/node/v22.22.0/bin:$PATH"

REPO_DIR="/Users/dunkybot/Projects/truestat"
REMOTE="git@github.com:dunkyai/truestat.git"

cd "$REPO_DIR"

# Ensure remote is set to SSH
CURRENT_REMOTE=$(git remote get-url origin 2>/dev/null || echo "")
if [ "$CURRENT_REMOTE" != "$REMOTE" ]; then
  git remote set-url origin "$REMOTE"
fi

# Check for new or modified blog content
CHANGES=$(git status --porcelain content/blog/ 2>/dev/null || true)
if [ -z "$CHANGES" ]; then
  echo "No new blog posts to deploy."
  exit 0
fi

echo "New/modified blog content detected:"
echo "$CHANGES"

# Stage blog content
git add content/blog/

# Also stage any insight or audit content if present
git add content/insights/ 2>/dev/null || true
git add content/seo-audits/ 2>/dev/null || true

# Commit
TIMESTAMP=$(date +"%Y-%m-%d %H:%M")
git commit -m "Add TrueStat content - $TIMESTAMP"

# Push to main — Vercel auto-deploys
git push origin main

echo "Pushed to main. Vercel will auto-deploy."
