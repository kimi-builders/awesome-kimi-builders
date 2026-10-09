# Entry schema — protocol v1

**English** (canonical) · [中文](./README.zh-CN.md)

One project per `data/entries/<slug>.json`; this directory is the sole entry source.
See [DATA-FLOW.md](../DATA-FLOW.md) for the publication and ownership contract.

| Field | Type | Requirement |
| --- | --- | --- |
| protocolVersion / id | 1 / immutable slug string | Required; ID survives rename/transfer |
| publication | pending / published / withdrawn | Required; pending is not public |
| name / url | strings | Name ≤60; public HTTPS URL, ≤500, no trailing slash |
| descriptionZh / descriptionEn | strings | Equivalent factual sentence with Kimi connection; ≤120 / ≤160 |
| category | registered string | official, cli-agents, sdks, apps, integrations, learning; repository grouping only |
| agents | registered string array | Required, deduplicated; empty allowed |
| official / officialSubject | boolean / enum | Required; true iff moonshot; subject moonshot/community/vendor/none |
| repoUrl / homepage | HTTPS URLs | Optional separate source/website |
| author | {name,url} | Original creator; required to publish |
| kind / scope | registered kind / base, eco, part | Explicit review required to publish; no category mapping |
| kimiEvidence | [{url,note}] | First-party relationship evidence; required to publish |
| review | {checkedAt,revision,note} | Required to publish/withdraw; state verification limits |
| bodyZh / bodyEn | Markdown strings | Required to publish; introduction, quick start, prerequisites, limits and checked source |
| recommendation | {url,githubLogin} | Optional actual merged recommendation PR; never implies a site account |

Agent IDs: `kimi`, `kimi-agent`, `agent-swarm`, `claude-code`, `codex`, `cursor`,
`copilot`, `windsurf`, `trae`, `cline`, `gemini`, `qoder`, `zcode`, `workbuddy`, `pi-agent`.

Kinds: `app`, `miniapp`, `website`, `extension`, `cli`, `sdk`, `bot`, `workflow`,
`skill`, `prompt`, `slides`, `demo`, `content`, `other`.

`sourceFile` is added by the generator for an exact source link. Do not author it
in entries. URLs and IDs are unique. Unknown fields, invalid types, paths and
symlinks are rejected. Published README lists use git add-time order with filename
as a tiebreak; the catalog sorts by immutable ID. Generated fields are deterministic.

```bash
node scripts/validate.mjs
node scripts/build-readme.mjs
node scripts/build-catalog.mjs
node --test scripts/catalog.test.mjs
```

`initial-review.json` preserves the original 52 submissions and records incomplete
checks. It is an audit artifact, never an alternative source or publication input.
