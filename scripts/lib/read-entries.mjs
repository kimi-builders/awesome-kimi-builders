import { readdirSync, readFileSync, lstatSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateEntry } from './catalog.mjs';
export const ROOT = fileURLToPath(new URL('../../', import.meta.url));
export function readEntries(directory = join(ROOT,'data/entries')) {
  const entries = [], errors = [], ids = new Set(), urls = new Set();
  for (const file of readdirSync(directory).sort()) {
    if (!file.endsWith('.json') || !lstatSync(join(directory,file)).isFile()) { errors.push(`${file}: unsupported file or symlink`); continue; }
    let entry;
    try { entry = JSON.parse(readFileSync(join(directory,file),'utf8')); } catch { errors.push(`${file}: invalid JSON`);continue; }
    errors.push(...validateEntry(entry,file).map(e => `${file}: ${e}`));
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) continue;
    if (ids.has(entry.id)) errors.push(`${file}: duplicate id`);ids.add(entry.id);
    if (typeof entry.url === 'string') { const url = entry.url.toLowerCase(); if (urls.has(url)) errors.push(`${file}: duplicate url`);urls.add(url); }
    entries.push({...entry,sourceFile:`data/entries/${file}`});
  }
  if (!entries.length) errors.push('no entries');
  if (errors.length) throw new Error(errors.join('\n'));
  return entries;
}
