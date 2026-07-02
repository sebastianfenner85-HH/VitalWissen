# Codex Context

This folder contains reviewed context packages that Codex Cloud must read before executing code packages.

Rule:

Every Codex code package must have a matching folder:

codex_context/<CODE_PACKAGE_ID>/

Without that folder, Codex must stop with:

BLOCKED_MISSING_CONTEXT

Workspace-only specs are not enough, because Codex Cloud only sees the GitHub checkout.

Do not store secrets, credentials, personal health data, raw scratch files, or unreviewed medical drafts here.
