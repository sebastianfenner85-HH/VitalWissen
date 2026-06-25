# VitalWissen Local Connection Runbook

## Purpose

This runbook documents the stable local working setup for VitalWissen on Sebastian's Mac.

## Canonical local repo clone

```text
~/VitalWissen_DEV/00_REPO/vitalwissen_ship
```

Use this clone for controlled GitHub, Supabase, Netlify and build checks.

## Local credentials

Credentials are stored locally outside the repository:

```text
~/.vitalwissen/credentials.env
```

Never paste secrets into ChatGPT, Cowork, GitHub, docs, commits, issues or PR bodies.

Expected variables:

```text
VW_GITHUB_REPO
VW_LIVE_URL
VW_SUPABASE_DB_URL
NETLIFY_SITE_ID
```

## Standard healthcheck

Run from the repo:

```bash
bash scripts/ops/vw_local_healthcheck.sh
```

The check verifies:

- required tools
- GitHub read access
- clean Git state
- Supabase read access
- Netlify link/status
- live site HTTP 200
- local secret scan
- npm audit high-level read-only status

## Safety rules

- No DB write without explicit approval.
- Supabase write tests should use `BEGIN` + `ROLLBACK` unless explicitly approved otherwise.
- No Netlify production deploy without explicit approval.
- Draft deploy is allowed only when intentionally requested.
- Work via branch + PR; no direct main push.
- Keep package scope narrow and document side effects.

## Last verified connection status

Connection setup was verified on Sebastian's Mac:

- GitHub read/write/PR/merge: PASS
- Supabase read: PASS
- Supabase rollback write test: PASS
- Netlify login/link: PASS
- Netlify draft deploy: PASS
- Live site smoke: PASS
- Secret scan: PASS
