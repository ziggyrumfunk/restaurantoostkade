$ErrorActionPreference = "Stop"
Set-Location -LiteralPath $PSScriptRoot\..

# Check that node_modules is fully installed (not just partially)
$nextBin = Join-Path (Get-Location) "node_modules\.bin\next.cmd"
if (-not (Test-Path $nextBin)) {
  if (Test-Path .\node_modules) {
    Write-Host "Partial install detected. Cleaning node_modules..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force .\node_modules
  }
  Write-Host "Installing dependencies (1-3 minutes)..." -ForegroundColor Cyan
  npm install
  if ($LASTEXITCODE -ne 0) {
    Write-Host "npm install failed. Try running it manually." -ForegroundColor Red
    exit 1
  }
}

if (-not (Test-Path .\.env.local)) {
  Write-Host ".env.local not found. Copying from .env.local.example" -ForegroundColor Yellow
  Copy-Item .\.env.local.example .\.env.local
  Write-Host "Edit .env.local with your Supabase keys before submitting forms." -ForegroundColor Yellow
}

Write-Host "Starting Next.js dev server at http://localhost:3000" -ForegroundColor Green
npm run dev
