import { readEntries } from './lib/read-entries.mjs';
try { console.log(`validate: ${readEntries().length} entries pass structural checks (not factual verification)`); }
catch (error) { console.error(String(error.message));process.exitCode = 1; }
