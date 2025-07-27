# GitHub Auto-Update Script for Gabi's Portfolio
param(
    [string]$CommitMessage = "",
    [string]$Token = ""
)

# Colors
$Green = "Green"
$Red = "Red"
$Cyan = "Cyan"
$Yellow = "Yellow"

# Configuration
$GITHUB_USER = "GabiAharon"
$GITHUB_REPO = "gabiaharonportfolio"

Write-Host "GitHub Portfolio Updater" -ForegroundColor $Cyan
Write-Host "Starting automated update..." -ForegroundColor $Cyan

# Get token from parameter or environment variable
$GITHUB_TOKEN = $Token
if ([string]::IsNullOrWhiteSpace($GITHUB_TOKEN)) {
    $GITHUB_TOKEN = $env:GITHUB_TOKEN
}

if ([string]::IsNullOrWhiteSpace($GITHUB_TOKEN)) {
    Write-Host "ERROR: GitHub token not provided!" -ForegroundColor $Red
    Write-Host "Usage: .\github-update.ps1 -Token YOUR_TOKEN" -ForegroundColor $Yellow
    Write-Host "Or set environment variable: `$env:GITHUB_TOKEN = 'YOUR_TOKEN'" -ForegroundColor $Yellow
    exit 1
}

# Test API connection
Write-Host "Testing GitHub API..." -ForegroundColor $Cyan
try {
    $headers = @{
        "Authorization" = "Bearer $GITHUB_TOKEN"
        "Accept" = "application/vnd.github.v3+json"
        "User-Agent" = "Portfolio-Updater"
        "X-GitHub-Api-Version" = "2022-11-28"
    }
    
    $response = Invoke-RestMethod -Uri "https://api.github.com/repos/$GITHUB_USER/$GITHUB_REPO" -Headers $headers
    Write-Host "SUCCESS: Connected to $($response.full_name)" -ForegroundColor $Green
}
catch {
    Write-Host "ERROR: GitHub API failed - $($_.Exception.Message)" -ForegroundColor $Red
    exit 1
}

# Check for changes to commit
$changes = git status --porcelain
if ($changes) {
    Write-Host "Found local changes to commit." -ForegroundColor $Yellow
    try {
        # Show changes
        Write-Host "Changes to upload:" -ForegroundColor $Cyan
        git status -s
        
        # Commit message
        if ([string]::IsNullOrWhiteSpace($CommitMessage)) {
            $CommitMessage = "Portfolio update - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
        }
        Write-Host "Commit message: $CommitMessage" -ForegroundColor $Cyan

        # Configure git
        $gitUser = git config user.name
        if ([string]::IsNullOrWhiteSpace($gitUser)) {
            Write-Host "Configuring Git user..." -ForegroundColor $Cyan
            git config user.name $GITHUB_USER
            git config user.email "gabiaharon@gmail.com"
        }

        # Add and commit
        Write-Host "Adding changes..." -ForegroundColor $Cyan
        git add .
        
        Write-Host "Creating commit..." -ForegroundColor $Cyan
        git commit -m $CommitMessage
    }
    catch {
        Write-Host "ERROR creating commit: $($_.Exception.Message)" -ForegroundColor $Red
        exit 1
    }
} else {
    Write-Host "No new local changes to commit." -ForegroundColor $Green
}

# Check if we need to push
git fetch origin
$status = git status -sb
if ($status -notlike "*ahead*") {
    Write-Host "Local branch is not ahead of remote. No push needed." -ForegroundColor $Green
    Write-Host "Update process completed successfully!" -ForegroundColor $Green
    exit 0
}

Write-Host "Local branch is ahead of remote. Pushing changes..." -ForegroundColor $Yellow

# Push execution
try {
    # Get branch
    $branch = git branch --show-current
    Write-Host "Branch: $branch" -ForegroundColor $Cyan

    # Sync with remote before pushing
    Write-Host "Syncing with remote..." -ForegroundColor $Cyan
    git pull origin $branch --no-edit --rebase

    # Set remote with token authentication
    Write-Host "Setting up authentication..." -ForegroundColor $Cyan
    $originalRemote = git config --get remote.origin.url
    $authenticatedRemote = "https://$GITHUB_USER`:$GITHUB_TOKEN@github.com/$GITHUB_USER/$GITHUB_REPO.git"
    git remote set-url origin $authenticatedRemote

    # Push
    Write-Host "Pushing to GitHub..." -ForegroundColor $Cyan
    $pushResult = git push origin $branch 2>&1
    $pushExitCode = $LASTEXITCODE
    
    # Restore original remote URL for security
    git remote set-url origin $originalRemote

    if ($pushExitCode -eq 0) {
        # Success
        Write-Host "SUCCESS: Push completed!" -ForegroundColor $Green
        Write-Host "Site URL: https://$GITHUB_USER.github.io/$GITHUB_REPO/" -ForegroundColor $Green
        Write-Host "Note: GitHub Pages may take 5-10 minutes to update." -ForegroundColor $Yellow
        
        $lastCommit = git log -1 --oneline
        Write-Host "Last commit: $lastCommit" -ForegroundColor $Cyan
    } else {
        throw "Push failed: $pushResult"
    }

}
catch {
    Write-Host "ERROR during push: $($_.Exception.Message)" -ForegroundColor $Red
    
    # Clean up on error
    try {
        $originalRemote = git config --get remote.origin.url
        if ($originalRemote -match $GITHUB_TOKEN) {
            git remote set-url origin "https://github.com/$GITHUB_USER/$GITHUB_REPO.git"
        }
    } catch { }
    
    exit 1
}

Write-Host "Update completed successfully!" -ForegroundColor $Green 