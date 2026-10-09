# Contributing

**English**(canonical) · [中文](./CONTRIBUTING.zh-CN.md)

## What gets listed

**Bar: Kimi participation is enough — 100%-built-by-Kimi is NOT required.**

Listable:

- Projects built with Kimi models, Kimi Code, or other agents (tag participants in `agents`)
- Apps built for the Kimi ecosystem (MCP servers, IDE plugins, prompt/skill packs, integrations)
- Apps using Kimi as their base model
- Official Moonshot tools and models

Not listable:

- Projects unrelated to Kimi (including "you could technically also use Kimi here")
- **Abandoned or deprecated projects** — no matter how good they were. If the upstream
  README says maintenance has moved elsewhere, the entry comes off the list.
- Anything not publicly accessible (private repos, invite-only pages)
- Pure marketing pages with nothing runnable or readable
- Your own project if it doesn't exist yet or is still an empty shell — build first

## Process

1. Fork, then create `data/entries/<slug>.json` (slug = lowercase letters/digits/hyphens,
   usually the repo name). **One project per PR** — cleanups to other entries go in
   separate PRs.
2. Fill the fields per the schema in [`data/README.md`](./data/README.md); both
   `descriptionZh` and `descriptionEn` are required — one sentence each covering
   "what it does + how Kimi is involved".
3. Verify locally:
   ```bash
   node scripts/validate.mjs
   node scripts/build-readme.mjs   # regenerates BOTH READMEs' list sections
   git add data/ README.md README.zh-CN.md
   ```
4. Open the PR titled `add: <project name>` with the link and a one-line rationale.
   CI re-runs validation and a "READMEs are up to date" check.
5. Reviewers check: link works, project is actively maintained, description is accurate
   and bilingual, `agents` tags are correct, category fits. Minor fixes come as
   suggestions; scope questions are discussed in the PR.

## Quality bar

- Factual descriptions only — no "best/strongest/first", no copying the vendor's ad copy.
- No links inside descriptions (the entry has `url`); no emoji.
- Newer entries sort first within a category (handled by the generator).
- `url` prefers the GitHub repo; use the `homepage` field only when there is no repo.
- Entries may be removed when a project is abandoned, deprecated, renamed, or goes 404
  long-term — removals also go through PRs.

## Code of conduct

Be respectful and argue on merits. Harassment, discrimination, or spam gets you blocked
and reported to GitHub. (Short version: talk like you're in a public engineering community.)

## Publication review

Follow protocol v1 in `data/README.md`. New submissions may remain `pending` while
reviewers verify first-party evidence, author/official subject, explicit kind/scope,
and equivalent bilingual body/quick start. Only `published` entries merged to main
enter the weekly snapshot. `withdrawn` is an explicit reviewed action, not file deletion.
Regenerate `data/catalog.json` with `node scripts/build-catalog.mjs`; CI checks it.
Formatting validation does not prove functionality. Keep unverified claims out of
published content. Repository transfers preserve the ID; do not remove an entry
solely to rename it. Existing site bindings are reviewed separately on the site.
