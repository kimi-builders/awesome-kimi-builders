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
| agents | registered string array | Documented Agent integrations or participation; required, deduplicated; empty allowed |
| official / officialSubject | boolean / enum | Required; true iff moonshot; subject moonshot/community/vendor/none |
| repoUrl / homepage | HTTPS URLs | Optional separate source/website |
| author | {name,url} | Original creator; required to publish |
| kind / scope | registered kind / base, eco, part | Explicit review required to publish; no category mapping |
| kimiEvidence | [{url,note}] | First-party evidence for the chosen Kimi scope; required to publish |
| review | {checkedAt,revision,note} | Required to publish/withdraw; state verification limits |
| bodyZh / bodyEn | Markdown strings | Required to publish; introduction, quick start, prerequisites, limits and checked source |
| recommendation | {url,githubLogin} | Optional actual merged recommendation PR; never implies a site account |

Agent IDs: `kimi`, `kimi-agent`, `agent-swarm`, `claude-code`, `codex`, `cursor`,
`copilot`, `windsurf`, `trae`, `cline`, `gemini`, `qoder`, `zcode`, `workbuddy`, `pi-agent`.

Kinds: `app`, `miniapp`, `website`, `extension`, `cli`, `sdk`, `bot`, `workflow`,
`skill`, `prompt`, `slides`, `demo`, `content`, `other`.

## Choosing a scope and documenting evidence

We collect interesting projects that meet real user needs. A project must have a
verifiable relationship in **at least one** of the three scopes below. It may be
built with any Agent, multiple Agents, or without a documented Agent; Kimi-assisted
development is required only for `part`.

| Scope | Relationship | Examples of first-party evidence |
| --- | --- | --- |
| `base` — Based on Kimi | Kimi models or APIs power a core capability | Project documentation or code showing its core Kimi API use |
| `eco` — For the Kimi ecosystem | The project explicitly serves Kimi users, developers, or integrations | A documented Kimi integration, compatibility guide, SDK, tool, or learning resource |
| `part` — Built with Kimi participation | Kimi participated in development | An author statement, development log, or contribution record describing Kimi's development role |

`base` and `eco` do not require Kimi to have built the project, `kimi` in `agents`,
or development evidence. Conversely, a `part` project need not use Kimi at runtime.
A general-purpose project needs an explicit, verifiable Kimi relationship to
qualify; being useful or built by an Agent alone is insufficient.

`scope` is a single value, not an array. Choose the relationship with the clearest
supporting evidence. If several apply, explain the others in `bodyZh` / `bodyEn`
and `kimiEvidence`; do not duplicate the entry or expand the protocol. Each evidence
note should explain which relationship the linked source supports. Describe what
the project does and its verified Kimi relationship in the bilingual summaries;
do not substitute a claim that it was built with Kimi when the evidence shows only
runtime use or ecosystem compatibility.

`agents` records only documented Agent integrations or participation. For example,
a Kimi-powered application built with a documented use of Codex can use `base` and
`agents: ["codex"]`; a tool with documented Kimi ecosystem support and no documented
Agent can use `eco` and `agents: []`. These are illustrative cases, not reviewed
entries. Model/API use does not prove use of a coding Agent, and missing Agent
documentation must not be filled with a guess. Eligibility is established by scope
evidence, not by whether an Agent array contains Kimi.

## Generation and validation

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
