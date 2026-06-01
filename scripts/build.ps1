$ErrorActionPreference = "Stop"
Set-Location -LiteralPath $PSScriptRoot\..

if (-not (Test-Path .\node_modules)) {
  npm install
}

Write-Host "Building production bundle..." -ForegroundColor Cyan
npm run build
