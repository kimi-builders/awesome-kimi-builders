/* Rebuild the list sections of BOTH README.md (English, canonical) and
   README.zh-CN.md from data/entries/*.json.
   Order: newest-first within a category by git add time (filename tiebreak).
   Usage: node scripts/build-readme.mjs [--check] */
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CATEGORIES } from './lib/categories.mjs';
import { readEntries } from './lib/read-entries.mjs';

const ROOT = new URL('../', import.meta.url).pathname;
const entriesDir = join(ROOT, 'data/entries');
const BEGIN = '<!-- BEGIN GENERATED LIST';
const END = '<!-- END GENERATED LIST -->';

function addedAtMs(file) {
  try {
    const out = execFileSync('git', ['log', '--diff-filter=A', '--follow', '-1', '--format=%ct', '--', `data/entries/${file}`], {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'ignore'],
    }).toString().trim();
    return out ? Number(out) * 1000 : 0;
  } catch {
    return 0;
  }
}

const verified = readEntries();
const entries = verified.filter(entry => entry.publication === 'published').map(entry => {
  const file = readdirSync(entriesDir).find(file => JSON.parse(readFileSync(join(entriesDir,file),'utf8')).id === entry.id);
  return {...entry,file,addedAt:addedAtMs(file)};
});
const escapeText = text => text.replace(/[\\`*_[\]<>]/g, '\\$&').replace(/[\r\n]/g, ' ');

function renderList(lang) {
  const lines = [];
  for (const category of CATEGORIES) {
    const items = entries
      .filter((entry) => entry.category === category.id)
      .sort((a, b) => b.addedAt - a.addedAt || (a.file < b.file ? -1 : a.file > b.file ? 1 : 0));
    lines.push(`### ${category[lang]}`);
    lines.push('');
    for (const item of items) {
      const description = lang === 'zh' ? item.descriptionZh : item.descriptionEn;
      const tags = [...(item.agents ?? []).map((agent) => `\`${agent}\``)];
      if (item.official) tags.push('`official`');
      lines.push(
        `- [${escapeText(item.name)}](${item.url}) — ${escapeText(description)}${tags.length ? ` ${tags.join(' ')}` : ''}`,
      );
    }
    lines.push('');
  }
  return lines.join('\n');
}

function renderReadme(path, lang) {
  const readme = readFileSync(path, 'utf8');
  const beginIndex = readme.indexOf(BEGIN);
  const endIndex = readme.indexOf(END);
  if (beginIndex === -1 || endIndex === -1 || endIndex < beginIndex) {
    console.error(`${path}: missing BEGIN/END GENERATED LIST markers`);
    process.exit(1);
  }
  const markerLineEnd = readme.indexOf('-->', beginIndex) + 3;
  return `${readme.slice(0, markerLineEnd)}\n${renderList(lang)}\n${readme.slice(endIndex)}`;
}

const targets = [
  { path: join(ROOT, 'README.md'), lang: 'en' },
  { path: join(ROOT, 'README.zh-CN.md'), lang: 'zh' },
];

let failed = false;
for (const target of targets) {
  const current = readFileSync(target.path, 'utf8');
  const next = renderReadme(target.path, target.lang);
  if (process.argv.includes('--check')) {
    if (next !== current) {
      console.error(`✗ ${target.path} list section is stale — run node scripts/build-readme.mjs`);
      failed = true;
    } else {
      console.log(`✓ ${target.path} up to date`);
    }
  } else {
    writeFileSync(target.path, next, 'utf8');
    console.log(`✓ generated ${target.path} (${entries.length} entries)`);
  }
}
if (failed) process.exit(1);
