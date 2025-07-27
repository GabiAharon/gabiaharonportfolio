# GitHub Auto-Update Script for Gabi's Portfolio
param(
    [string]$CommitMessage = ""
)

# Colors
$Green = "Green"
$Red = "Red"
$Cyan = "Cyan"
$Yellow = "Yellow"

# Configuration
$GITHUB_TOKEN = "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"
$GITHUB_USER = "GabiAharon"
$GITHUB_REPO = "gabiaharonportfolio"

Write-Host "GitHub Portfolio Updater" -ForegroundColor $Cyan
Write-Host "Starting automated update..." -ForegroundColor $Cyan

# Check token
if ([string]::IsNullOrWhiteSpace($GITHUB_TOKEN)) {
    Write-Host "ERROR: GitHub token not configured!" -ForegroundColor $Red
    exit 1
}

# Test API connection
Write-Host "Testing GitHub API..." -ForegroundColor $Cyan
try {
    $headers = @{
        "Authorization" = "token $GITHUB_TOKEN"
        "Accept" = "application/vnd.github.v3+json"
        "User-Agent" = "Portfolio-Updater"
    }
    
    $response = Invoke-RestMethod -Uri "https://api.github.com/repos/$GITHUB_USER/$GITHUB_REPO" -Headers $headers
    Write-Host "SUCCESS: Connected to $($response.full_name)" -ForegroundColor $Green
}
catch {
    Write-Host "ERROR: GitHub API failed - $($_.Exception.Message)" -ForegroundColor $Red
    exit 1
}

# Check for changes
$changes = git status --porcelain
if (-not $changes) {
    Write-Host "No changes to upload." -ForegroundColor $Yellow
    Write-Host "Repository is up to date!" -ForegroundColor $Green
    exit 0
}

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

    # Add, commit, push
    Write-Host "Adding changes..." -ForegroundColor $Cyan
    git add .
    
    Write-Host "Creating commit..." -ForegroundColor $Cyan
    git commit -m $CommitMessage
    
    # Get branch
    $branch = git branch --show-current
    Write-Host "Branch: $branch" -ForegroundColor $Cyan

    # Set remote with token
    $remoteUrl = "https://$GITHUB_TOKEN@github.com/$GITHUB_USER/$GITHUB_REPO.git"
    git remote set-url origin $remoteUrl

    # Push
    Write-Host "Pushing to GitHub..." -ForegroundColor $Cyan
    git push origin $branch
    
    # Clean up
    git remote set-url origin "https://github.com/$GITHUB_USER/$GITHUB_REPO.git"

    # Success
    Write-Host "SUCCESS: Update completed!" -ForegroundColor $Green
    Write-Host "Site URL: https://$GITHUB_USER.github.io/$GITHUB_REPO/" -ForegroundColor $Green
    Write-Host "Note: GitHub Pages may take 5-10 minutes to update." -ForegroundColor $Yellow
    
    $lastCommit = git log -1 --oneline
    Write-Host "Last commit: $lastCommit" -ForegroundColor $Cyan

}
catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor $Red
    
    # Clean up on error
    try {
        git remote set-url origin "https://github.com/$GITHUB_USER/$GITHUB_REPO.git"
    } catch { }
    
    exit 1
}

Write-Host "Update completed successfully!" -ForegroundColor $Green 