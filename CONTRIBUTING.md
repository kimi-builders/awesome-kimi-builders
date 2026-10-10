# Contributing

**English**(canonical) · [中文](./CONTRIBUTING.zh-CN.md)

## What gets listed

**Projects do not have to be built with Kimi.** Any Agent, several Agents working
together, or development without an Agent is welcome. We look for interesting,
useful projects that meet real user needs and have a verifiable connection to
**at least one** of these scopes:

| Scope | What qualifies | Suitable first-party evidence |
| --- | --- | --- |
| **Built on Kimi** (`base`) | The project's core functionality uses Kimi models or APIs, regardless of how it was developed. | Source code, configuration or documentation showing implemented Kimi model/API use. |
| **For the Kimi ecosystem** (`eco`) | Tools, integrations, SDKs, skills or resources explicitly serving Kimi users or developers, regardless of how they were developed. | Documentation or source showing the concrete Kimi integration or intended ecosystem use. |
| **Kimi helped build** (`part`) | Kimi models or Agents actually participated in development; partial participation is enough, and the finished project need not use Kimi at runtime. | An author's development record or explanation documenting Kimi's contribution. |

These are alternatives, not three requirements to meet together. Describe who the
project serves, what need it meets and what makes it interesting or useful. There
is no minimum star count or project size. Official Moonshot tools and models can
also qualify; official status is separate from the scope and must be verified.

For illustration only, not additional listings:

| Example | Scope |
| --- | --- |
| An app developed with Codex whose core functionality calls the Kimi API | `base` |
| A Kimi integration developed with Claude Code | `eco` |
| A puzzle game developed with help from Kimi Code, with no Kimi dependency at runtime | `part` |
| A project developed with another Agent that has no concrete Kimi connection | Not eligible |

`scope` remains one value: choose the best-supported connection and describe any
others in the body or review evidence. Agent tags record documented integrations
or participation, not eligibility. Leave `agents` empty when unknown; do not add
`kimi` merely because a project uses its API or serves its ecosystem.

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
   "what it does + its Kimi connection". Provide evidence for the selected scope;
   Kimi development evidence is required only for `part`.
3. Verify locally:
   ```bash
   node scripts/validate.mjs
   node --test scripts/catalog.test.mjs
   node scripts/build-readme.mjs   # Regenerates both READMEs' list sections
   node scripts/build-catalog.mjs
   git add data/ README.md README.zh-CN.md
   ```
4. Open the PR titled `add: <project name>` with the link, intended users/use case
   and evidence for the selected scope. CI re-runs validation, tests and drift
   checks for both READMEs and the catalog.
5. Reviewers check: link works, project is actively maintained, its user value and
   at least one Kimi connection are supported, description is accurate and bilingual,
   `agents` tags are correct, category fits. Minor fixes come as
   suggestions; scope questions are discussed in the PR.

## Quality bar

- Factual descriptions only — no "best/strongest/first", no copying the vendor's ad copy.
- No links inside descriptions (the entry has `url`); no emoji.
- Newer entries sort first within a category (handled by the generator).
- `url` is the public project entry point and prefers the repository. Record the
  repository and homepage separately in `repoUrl` and `homepage` when available.
- Entries may be withdrawn when a project is abandoned, deprecated or goes 404
  long-term — withdrawals also go through PRs. Renames and repository transfers
  update the existing entry while preserving its ID.

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
