# GitHub & Netlify Portfolio Updater
# =================================
# This script commits local changes, pushes to GitHub and triggers a Netlify rebuild.
# Replace anything only if repository or hook changes.

param(
    [string]$CommitMessage = ""
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

# ─── Verify inside git repo ────────────────────────────────────────────────────
if (-not (Test-Path ".git")) {
    Write-Host "ERROR: Not in a Git repository." -ForegroundColor $Red
    exit 1
}

# ─── Detect changes ────────────────────────────────────────────────────────────
$changes = git status --porcelain
if (-not $changes) {
    Write-Host "No changes to commit. Repo is clean." -ForegroundColor $Yellow
    goto TriggerNetlify
}

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
Write-Host "Syncing with origin/$branch…" -ForegroundColor $Cyan
 git pull origin $branch --rebase | Out-Null

Write-Host "Pushing to GitHub…" -ForegroundColor $Cyan
if (!(git push origin $branch)) {
    Write-Host "ERROR: Git push failed." -ForegroundColor $Red
    exit 1
}

:TriggerNetlify
# ─── Trigger Netlify build ─────────────────────────────────────────────────────
Write-Host "Triggering Netlify build…" -ForegroundColor $Cyan
try {
    $resp = Invoke-WebRequest -Uri $netlifyBuildHook -Method POST -UseBasicParsing
    if ($resp.StatusCode -eq 200) {
        Write-Host "Netlify build triggered successfully!" -ForegroundColor $Green
    } else {
        Write-Host "Netlify hook returned status $($resp.StatusCode)." -ForegroundColor $Red
    }
} catch {
    Write-Host "Failed to call Netlify hook: $($_.Exception.Message)" -ForegroundColor $Red
}

Write-Host "All done." -ForegroundColor $Green 