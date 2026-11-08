# Install trvl (Windows) into %LOCALAPPDATA%\trvl for the TravelPlanner MCP config.
# Usage: powershell -ExecutionPolicy Bypass -File tools\install-trvl.ps1

$ErrorActionPreference = "Stop"
$destDir = Join-Path $env:LOCALAPPDATA "trvl"
New-Item -ItemType Directory -Force -Path $destDir | Out-Null

$rel = Invoke-RestMethod -Uri "https://api.github.com/repos/MikkoParkkola/trvl/releases/latest" -Headers @{ "User-Agent" = "personal-agents-trvl-install" }
$tag = $rel.tag_name.TrimStart("v")
$arch = if ([System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture.ToString() -match "Arm") { "arm64" } else { "amd64" }
$name = "trvl_${tag}_windows_${arch}.tar.gz"
$asset = $rel.assets | Where-Object { $_.name -eq $name } | Select-Object -First 1
if (-not $asset) { throw "Could not find asset $name in release $($rel.tag_name)" }

$tmp = Join-Path $env:TEMP $name
Write-Host "Downloading $($rel.tag_name) ($arch)..."
Invoke-WebRequest -Uri $asset.browser_download_url -OutFile $tmp -UseBasicParsing
tar -xzf $tmp -C $destDir
Remove-Item $tmp -Force

$exe = Join-Path $destDir "trvl.exe"
& $exe version
Write-Host "Installed: $exe"
Write-Host "Project MCP expects this path (see .cursor/mcp.json). Telemetry disabled via TRVL_NO_TELEMETRY in MCP env."
