# Tools

## trvl

Windows install script: `install-trvl.ps1` → `%LOCALAPPDATA%\trvl\trvl.exe`.

The project MCP config (`.cursor/mcp.json`) points at that path with `TRVL_NO_TELEMETRY=1`.

Do not commit `trvl.exe` into git.

## weather

No local install required — MCP uses `npx -y @dangahagan/weather-mcp@latest`.
