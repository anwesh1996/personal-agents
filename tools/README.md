# Tools

## trvl

Windows install script: `install-trvl.ps1` → `%LOCALAPPDATA%\trvl\trvl.exe`.

The project MCP config (`.cursor/mcp.json`) points at that path with `TRVL_NO_TELEMETRY=1`.

Do not commit `trvl.exe` into git.

## weather

Pinned `@dangahagan/weather-mcp` 1.35.7 with launcher `tools/weather-mcp/start.mjs`.

On Node 20.9, `npx` starts the server and then crashes: `astronomy-engine` ships ESM as `esm/astronomy.js` without `"type": "module"`, so Node parses `export` as CommonJS. The launcher writes the missing `esm/package.json` marker before import.

After a fresh clone, run `npm install` in `tools/weather-mcp`. MCP command is `node` with args `tools/weather-mcp/start.mjs` and `WEATHER_UNITS=metric`.
