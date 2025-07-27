# GitHub & Netlify Portfolio Updater
# =================================
# This script commits local changes, pushes to GitHub and triggers a Netlify rebuild.
# Replace anything only if repository or hook changes.

param(
    [string]$CommitMessage = "",
    [switch]$ForceNetlify = $false
)

# ─── Settings ──────────────────────────────────────────────────────────────────

# Netlify build hook URL
$netlifyBuildHook = "https://api.netlify.com/build_hooks/688688c76292b35f68ccf3cb"

# Git user fallback (only used if git user not configured)
$defaultGitUser  = "GabiAharon"
$defaultGitEmail = "gabiaharon@gmail.com"

# ─── Helper Colors ─────────────────────────────────────────────────────────────
$Green  = "Green"
$Red    = "Red"
$Cyan   = "Cyan"
$Yellow = "Yellow"

Write-Host "=== GitHub & Netlify Portfolio Updater ===" -ForegroundColor $Cyan
Write-Host "Started at: $(Get-Date)" -ForegroundColor $Cyan
Write-Host "Working directory: $(Get-Location)" -ForegroundColor $Cyan

# ─── Verify inside git repo ────────────────────────────────────────────────────
if (-not (Test-Path ".git")) {
    Write-Host "ERROR: Not in a Git repository." -ForegroundColor $Red
    exit 1
}

# ─── Detect changes ────────────────────────────────────────────────────────────
$changes = git status --porcelain
if (-not $changes) {
    Write-Host "No changes to commit. Repo is clean." -ForegroundColor $Yellow
    # במקום goto נשתמש בקפיצה ישירה לחלק של Netlify
    $skipToNetlify = $true
} else {
    Write-Host "Found changes to commit:" -ForegroundColor $Cyan
    $changes | ForEach-Object { Write-Host "  $_" }
}

# אם לא צריך לדלג, נבצע את תהליך ה-git
if (-not $skipToNetlify) {
    # ─── Build commit message ──────────────────────────────────────────────────────
    if ([string]::IsNullOrWhiteSpace($CommitMessage)) {
        $CommitMessage = Read-Host "Enter commit message (blank = auto)"
        if ([string]::IsNullOrWhiteSpace($CommitMessage)) {
            $CommitMessage = "Portfolio update - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
        }
    }

    # ─── Ensure git user configured ────────────────────────────────────────────────
    if (-not (git config user.name)) { git config user.name  $defaultGitUser }
    if (-not (git config user.email)) { git config user.email $defaultGitEmail }

    # ─── Commit & push ─────────────────────────────────────────────────────────────
    Write-Host "Staging files…" -ForegroundColor $Cyan
    git add .
    Write-Host "Creating commit…" -ForegroundColor $Cyan
    if (!(git commit -m $CommitMessage)) {
        Write-Host "Nothing to commit." -ForegroundColor $Yellow
    }

    # Rebase pull (safer than merge)
    $branch = git branch --show-current
    Write-Host "Current branch: $branch" -ForegroundColor $Cyan
    Write-Host "Syncing with origin/$branch…" -ForegroundColor $Cyan
    
    try {
        git pull origin $branch --rebase
        Write-Host "Pull successful!" -ForegroundColor $Green
    } catch {
        Write-Host "WARNING: Git pull failed. Continuing anyway..." -ForegroundColor $Yellow
    }

    Write-Host "Pushing to GitHub…" -ForegroundColor $Cyan
    try {
        git push origin $branch
        Write-Host "Push successful!" -ForegroundColor $Green
    } catch {
        Write-Host "ERROR: Git push failed: $_" -ForegroundColor $Red
        Write-Host "Will still try to update Netlify..." -ForegroundColor $Yellow
    }
}

# ─── Trigger Netlify build ─────────────────────────────────────────────────────
Write-Host "Triggering Netlify build…" -ForegroundColor $Cyan
Write-Host "Using build hook: $netlifyBuildHook" -ForegroundColor $Cyan

try {
    $resp = Invoke-WebRequest -Uri $netlifyBuildHook -Method POST -UseBasicParsing
    if ($resp.StatusCode -eq 200) {
        Write-Host "Netlify build triggered successfully!" -ForegroundColor $Green
        Write-Host "Response: $($resp.Content)" -ForegroundColor $Green
        Write-Host "Your site will be updated in 1-2 minutes." -ForegroundColor $Green
    } else {
        Write-Host "Netlify hook returned status $($resp.StatusCode)." -ForegroundColor $Red
        Write-Host "Response content: $($resp.Content)" -ForegroundColor $Red
    }
} catch {
    Write-Host "Failed to call Netlify hook: $($_.Exception.Message)" -ForegroundColor $Red
    Write-Host "Check your internet connection and the build hook URL." -ForegroundColor $Red
    Write-Host "Build hook used: $netlifyBuildHook" -ForegroundColor $Yellow
    exit 1
}

Write-Host "All done at $(Get-Date)." -ForegroundColor $Green
Write-Host "Your site should be updated at: https://gabiaharon.com" -ForegroundColor $Green 