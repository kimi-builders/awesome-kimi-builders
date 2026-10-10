# Awesome publication protocol v1

**English** (canonical) · [中文](./DATA-FLOW.zh-CN.md)

## Status and authority

This is the local implementation contract authorized for this workflow. Production
publication is not enabled. Earlier claims about runtime pulling were proposals,
not implemented behavior. GitHub `kimi-builders/awesome-kimi-builders`, branch `main`,
is the authority for external project information; the site's existing `works`
table is its database projection. Merged changes approve publication. PR validation
checks structure, not factual truth or permission to publish.
The canonical GitHub organization is `kimi-builders`; the former `kimibuilders`
address redirects to this same repository. Use the canonical address explicitly
so production source reads can continue to reject redirects.

```text
Community PR → validation + maintainer review → main
  data/entries/*.json → deterministic data/catalog.json at the same commit
  server weekly/manual authenticated job → fixed main commit SHA → one catalog
  validate entire snapshot → transaction → existing works + source mapping
  Route Handler expires public caches → /awesome + /works/<existing-id>
```

## Entry identity and content

`protocolVersion: 1` adds immutable `id` and `publication` (`pending`, `published`,
`withdrawn`). Existing fields and file locations remain. Bootstrap IDs derive from
current filenames once; never change an ID when renaming a project, moving a repo,
or renaming a source file. `author: {name,url}` identifies the original author;
`repoUrl` identifies source code and `homepage` its separate website when present.
`official` means Moonshot AI only. `officialSubject` is `moonshot`, `community`,
`vendor`, or `none`; community maintenance and vendor ownership are not Moonshot
endorsement. Pending entries retain original material and are excluded from public
README lists and publishable payloads.

Published entries require explicitly reviewed `kind` and one `scope`: `base`
(Kimi models or APIs power a core capability), `eco` (the project explicitly serves
the Kimi ecosystem), or `part` (Kimi participated in development). Any one of these
relationships is sufficient; projects may be built with any Agent, multiple Agents,
or without a documented Agent. Only `part` requires evidence of Kimi's participation
in development. `base` and `eco` require evidence of their own relationship, not
Kimi-assisted development or a `kimi` Agent ID. Curation favors interesting projects
that meet real user needs; usefulness alone does not establish a Kimi relationship.

`scope` remains a single value. When several relationships are verified, choose the
best-supported scope and explain the others in the body and evidence. `category`
organizes this repository only; it does not imply kind or scope.
`kimiEvidence: [{url,note}]` records first-party support for the chosen relationship,
such as core Kimi API usage, documented Kimi compatibility, or a record of Kimi's
development contribution. Evidence for one scope need not prove the other two.
`review: {checkedAt,revision,note}` states what was checked, never implies the
project was installed or tested. `bodyZh` and `bodyEn` store original, concise
Markdown introductions and quick-start guidance inline in the entry. They render
in the existing work description, with one work ID, comments, votes and share URL.
Any optional `recommendation: {url,githubLogin}` must point to a real merged PR;
it never manufactures a site user ID. Unknown provenance remains unknown.

For repository imports, agent IDs identify documented Agent integrations or
participation; a model name or API use alone does not establish a coding Agent.
When no Agent integration or participation is documented, use an empty array.
`agents` does not determine eligibility or scope. The UI calls this association,
not build proof. This guidance clarifies protocol v1; it adds no fields, changes no
publication state, and does not qualify pending entries without review.

The agent IDs exactly match the site's `src/lib/agents.ts`; a new ID requires a
coordinated registry change. Structural validation is strict for all entries and
publication requirements apply only to published entries.

## Complete snapshot and fetch

`data/catalog.json` is generated, not edited. It contains protocol/repository,
`entryCount`, sorted `pendingIds`, sorted published/withdrawn `entries`, and a SHA-256
`digest` of the canonical payload without `digest`. No timestamps, local paths, or
git-history sort are used. CI checks both generated READMEs and the catalog.
Every source file belongs to one approved main commit. The server resolves fixed
main via GitHub, then reads the catalog at that exact 40-character commit SHA;
no caller can choose a repo, URL, path or branch. Requests have timeouts, byte caps
and forbidden redirects. Count, digest, identity, registry and protocol checks are
atomic: any failure rejects the entire snapshot. A public repository needs no
GitHub credential; an optional read-only token may address API rate limits.

## Ownership, matching and failure semantics

Only a reviewed deployment-side ID → work ID mapping binds existing projects.
Exact repo/website matches are conflict signals requiring that mapping, never name
matching. Member works stay `source=site`; their creator, fields and `also_awesome`
opt-in remain theirs. Binding adds provenance, not an external duplicate or an
implicit opt-in. External mapped works preserve their ID and real recommender.
Repository-owned fields are name, bilingual summaries/body, public URLs, author,
agents, kind and scope. Site-owned fields are visibility, hidden/moderation state,
creation time, user/recommender, votes, comments, feature choices, media and all
other member metadata. Local edits to repository-owned fields block that entry as
a conflict until an editor resolves it; later sync cannot silently overwrite them.

MySQL advisory locking serializes sync and rollback. One transaction owns the
batch. Content hashes avoid unnecessary updates; dry-run changes no business data.
Run records retain revision, counts, safe failure code and field-level before/after
images. Explicit `withdrawn` entries remove external projections from public
surfaces without deleting works or discussion. Missing IDs, pending IDs, empty or
truncated catalogs and fetch/parse failures never infer withdrawal. Withdrawal of
a member binding removes only catalog provenance; member visibility is unchanged.
Rollback checks current owned fields against the recorded post-sync state before
restoring owned fields/mapping. It never restores interactive or moderation state;
new imported works become withdrawn rather than being deleted. Cache invalidation
runs after commit in an authenticated Next.js Route Handler; a failed invalidation
is recorded and retried even on an unchanged snapshot.

## Operations and rollout

The server-owned schedule runs weekly Monday 03:27 UTC, using the same protected
endpoint as a manual run. Its installed script follows the current atomic release,
checks a capability marker, uses the deploy lock, reads release credentials and
uses existing health logging/alerts. Locks use bounded waits (90 seconds each).
Lock timeout is deferred (exit 75), not success; a durable pending request retries
every 15 minutes, at most eight attempts. Manual sync re-arms the same queue;
idle retries do not publish. A daily health check detects pending/exhausted local
requests, failed runs and more than eight days without success. Deferred alerts
wait for safe credential loading after the deployment lock is acquired. No external PR job holds production secrets.
Installation, disabling and rollback are explicit operator steps after independent
acceptance; writing cron configuration does not enable it.

Before first activation: approve the verified initial subset on main, apply the
site migration, review the explicit binding map using read-only production data,
run dry-run, review conflicts, run manual sync, verify both locales and caches,
then install the schedule. This local task does not commit, push, deploy, register
cron, change permissions or create production credentials.
