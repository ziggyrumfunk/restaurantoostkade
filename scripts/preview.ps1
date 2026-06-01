$ErrorActionPreference = "Stop"
Set-Location -LiteralPath $PSScriptRoot\..

if (-not (Test-Path .\.next)) {
  Write-Host "No build found. Running build first..." -ForegroundColor Yellow
  npm run build
}

Write-Host "Starting production server on http://localhost:3000" -ForegroundColor Green
npm run start
