import { createRequire } from 'node:module';
import { existsSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);

// Node 20.9 parses astronomy-engine's ESM entry as CommonJS because the
// package has no "type": "module". A nested package.json marks only the ESM
// folder, so the CJS entry stays valid. Stdout must stay empty for MCP.
const astronomyEntry = require.resolve('astronomy-engine');
const esmPackageJson = join(dirname(astronomyEntry), 'esm', 'package.json');
if (existsSync(dirname(esmPackageJson)) && !existsSync(esmPackageJson)) {
  writeFileSync(esmPackageJson, '{"type":"module"}\n');
}

const serverEntry = require.resolve('@dangahagan/weather-mcp/dist/index.js');
await import(pathToFileURL(serverEntry).href);
