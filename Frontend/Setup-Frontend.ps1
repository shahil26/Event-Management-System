<#
.SYNOPSIS
 Installs and runs the React/Tailwind frontend.

.DESCRIPTION
 1. Verifies package.json
 2. Installs npm deps
 3. Builds Tailwind CSS (if configured)
 4. Starts the dev server
#>

Param()

# 1) Check for package.json
if (!(Test-Path -Path "./package.json")) {
    Write-Error "package.json not found. Run this from the frontend root."
    exit 1
}

# 2) Install dependencies
Write-Host "Installing frontend npm packages…"
npm install
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

# 3) Build/watch Tailwind (if present)
if (Test-Path -Path "./tailwind.config.js" -and Test-Path -Path "./src/index.css") {
    Write-Host "Building & watching Tailwind CSS…"
    # Runs in background; comment out --watch if you want one‑off build
    Start-Process -NoNewWindow npx -ArgumentList "tailwindcss","-i","./src/index.css","-o","./dist/output.css","--watch" -PassThru | Out-Null
} else {
    Write-Host " Skipping Tailwind build (no config or src/index.css found)."
}

# 4) Start React dev server
Write-Host "Starting frontend dev server…"
npm run dev
