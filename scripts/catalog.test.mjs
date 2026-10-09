import test from 'node:test';
import assert from 'node:assert/strict';
import { canonical, buildCatalog, validateEntry, validateCatalog, digest } from './lib/catalog.mjs';
import { readEntries } from './lib/read-entries.mjs';
test('malformed values produce diagnostics rather than crashes', () => {
  for (const v of [null,[],42,'x',{}, {agents:null,kimiEvidence:[null],author:[],review:null}]) assert.ok(validateEntry(v).length);
  const good = readEntries()[0];
  for (const file of ['../x.json','$(touch hacked).json','null.json/','a b.json']) assert.ok(validateEntry(good,file).length);
});
test('catalog rejects truncated, malformed, and unsupported snapshots', () => {
  const c = buildCatalog(readEntries());assert.deepEqual(validateCatalog(c),c);
  for (const c2 of [null,[], {...c,protocolVersion:2},{...c,entryCount:1},{...c,entries:[null]},{...c,digest:'bad'}]) assert.throws(() => validateCatalog(c2));
  const {digest:_,...payload} = c;payload.entries=[null];payload.entryCount++;
  assert.throws(() => validateCatalog({...payload,digest:digest(payload)}));
});
test('snapshot is deterministic regardless of filesystem enumeration', () => {
  const entries=readEntries();assert.equal(canonical(buildCatalog(entries)),canonical(buildCatalog(entries.reverse())));
});
