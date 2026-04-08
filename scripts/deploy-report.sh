#!/usr/bin/env bash
set -e

REPORT_DIR="allure-report"
REMOTE_URL=$(git remote get-url origin)
HISTORY_DIR="allure-results/history"

# Restore history from previous gh-pages report to preserve trends
echo "Fetching history from gh-pages..."
rm -rf "$HISTORY_DIR"
git fetch origin gh-pages 2>/dev/null && \
  git checkout origin/gh-pages -- history 2>/dev/null && \
  mv history "$HISTORY_DIR" || \
  echo "No previous history found, starting fresh."

echo "Generating Allure report..."
npx allure generate allure-results --clean -o "$REPORT_DIR"

echo "Deploying to gh-pages..."
cd "$REPORT_DIR"
git init -b gh-pages
git add .
git commit -m "Deploy Allure report $(date '+%Y-%m-%d %H:%M:%S')"
git push --force "$REMOTE_URL" gh-pages
cd ..
rm -rf "$REPORT_DIR/.git"

echo "Done. Report published to GitHub Pages."
