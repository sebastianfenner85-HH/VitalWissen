#!/usr/bin/env bash
set -u

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

CRED="$HOME/.vitalwissen/credentials.env"

pass() { echo "PASS  $1"; }
warn() { echo "WARN  $1"; }
fail() { echo "FAIL  $1"; exit 1; }

echo "=== VitalWissen local healthcheck ==="
echo "repo: $ROOT"

[ -f "$CRED" ] || fail "credentials file missing: $CRED"
# shellcheck disable=SC1090
source "$CRED"

echo "=== tools ==="
for t in git gh psql netlify npm node curl; do
  command -v "$t" >/dev/null 2>&1 && pass "$t found" || fail "$t missing"
done

echo "=== git ==="
BRANCH="$(git branch --show-current)"
[ "$BRANCH" = "main" ] && pass "on main" || warn "not on main: $BRANCH"

STATUS="$(git status --short)"
[ -z "$STATUS" ] && pass "working tree clean" || warn "working tree not clean"

git fetch origin >/dev/null 2>&1 || fail "git fetch failed"
LOCAL="$(git rev-parse HEAD)"
REMOTE="$(git rev-parse origin/main)"
[ "$LOCAL" = "$REMOTE" ] && pass "local HEAD equals origin/main" || warn "local HEAD differs from origin/main"

gh repo view "${VW_GITHUB_REPO:-sebastianfenner85-HH/VitalWissen}" --json nameWithOwner,url,defaultBranchRef >/dev/null \
  && pass "GitHub read ok" || fail "GitHub read failed"

echo "=== supabase read-only ==="
[ -n "${VW_SUPABASE_DB_URL:-}" ] && pass "Supabase URL present" || fail "Supabase URL missing"
PGCONNECT_TIMEOUT=10 psql "$VW_SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -c "SELECT COUNT(*) AS laborwerte_count FROM laborwerte;" \
  && pass "Supabase read ok" || fail "Supabase read failed"

echo "=== netlify read-only ==="
[ -n "${NETLIFY_SITE_ID:-}" ] && pass "Netlify site id present" || fail "Netlify site id missing"
netlify status >/dev/null && pass "Netlify status ok" || fail "Netlify status failed"

echo "=== live site ==="
[ -n "${VW_LIVE_URL:-}" ] && pass "live URL present" || fail "live URL missing"
curl -fsSI "$VW_LIVE_URL" | head -n 1 | grep -E "HTTP/[0-9.]+ 200|HTTP/2 200" >/dev/null \
  && pass "live site HTTP 200" || fail "live site not HTTP 200"

echo "=== secret scan ==="
SECRET_HITS="$(
  {
    grep -R "VW_SUPABASE_DB_URL=" -n . --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=.netlify --exclude=vw_local_healthcheck.sh || true
    grep -R "NETLIFY_AUTH_TOKEN=" -n . --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=.netlify --exclude=vw_local_healthcheck.sh || true
    grep -R "postgresql://" -n . --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=.netlify --exclude=vw_local_healthcheck.sh | grep -v './pipelines/.env.example:.*DEIN_PASSWORT' || true
  }
)"
[ -z "$SECRET_HITS" ] && pass "no real credential pattern found" || { echo "$SECRET_HITS"; fail "possible secret hit"; }

echo "=== npm audit read-only ==="
npm audit --audit-level=high >/tmp/vw_npm_audit_high.txt 2>&1 \
  && pass "npm audit high: no high/critical vulnerabilities" \
  || warn "npm audit high found issues or audit failed; see /tmp/vw_npm_audit_high.txt"

echo "=== result ==="
echo "VW_LOCAL_HEALTHCHECK_DONE"
