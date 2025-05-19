<#
.SYNOPSIS
 Installs and runs the backend service.

.DESCRIPTION
 1. Verifies package.json (Node) or requirements.txt (Python)
 2. Installs dependencies
 3. Starts the server
#>

Param()

# Detect project type by files present
$hasNode = Test-Path -Path "./package.json"
$hasPython = Test-Path -Path "./requirements.txt"

if (-not ($hasNode -or $hasPython)) {
    Write-Error "Neither package.json nor requirements.txt found. Run from backend root."
    exit 1
}

if ($hasNode) {
    Write-Host "Detected Node.js backend."

    # Install npm deps
    Write-Host "Installing backend npm packages…"
    npm install
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

    # Start Node server (adjust script name if different)
    Write-Host " Starting Node.js server…"
    npm run dev  # or `npm start` per your package.json
}
elseif ($hasPython) {
    Write-Host "Detected Python backend."

    # Create/activate venv
    if (-not (Test-Path -Path "./venv")) {
        Write-Host "Creating virtual environment…"
        python -m venv venv
    }
    Write-Host "Activating virtual environment…"
    & .\venv\Scripts\Activate.ps1

    # Install pip deps
    Write-Host " Installing Python packages…"
    pip install -r requirements.txt
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

    # Start Python server (adjust if using Flask/FastAPI/etc)
    Write-Host "Starting Python server…"
    python main.py
}
