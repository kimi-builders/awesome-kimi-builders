import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildCatalog } from './lib/catalog.mjs';
import { readEntries, ROOT } from './lib/read-entries.mjs';
try {
  const path = join(ROOT,'data/catalog.json');
  const next = JSON.stringify(buildCatalog(readEntries()),null,2)+'\n';
  if (process.argv.includes('--check')) { if (readFileSync(path,'utf8') !== next) throw new Error('catalog is stale'); }
  else writeFileSync(path,next);
  console.log('catalog: deterministic complete snapshot verified');
} catch (error) { console.error(error.message);process.exitCode = 1; }
