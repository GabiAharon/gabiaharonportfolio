# GitHub Update Script - Simple and Secure
# No hardcoded tokens - uses Git credential management

# ===================================================
# הוראות: 
# 1. החלף את ה-URL של ה-Build Hook בשורה 15 עם ה-URL האמיתי שלך מ-Netlify
# 2. הרץ את הסקריפט הזה כדי לעדכן את GitHub ו-Netlify בו-זמנית
# ===================================================

param(
    [string]$CommitMessage = ""
)

# Colors for output
$Green = "Green"
$Red = "Red"
$Cyan = "Cyan"
$Yellow = "Yellow"

# Netlify build hook URL - החלף את זה עם ה-URL האמיתי שלך מ-Netlify
# כדי ליצור Build Hook:
# 1. היכנס לחשבון ה-Netlify שלך
# 2. בחר את האתר שלך (gabiaharon.com)
# 3. לחץ על "Site settings" בתפריט העליון
# 4. בתפריט הצד, בחר "Build & deploy"
# 5. גלול למטה עד שתמצא את החלק "Build hooks"
# 6. לחץ על "Add build hook"
# 7. תן לו שם (למשל "Auto Deploy")
# 8. בחר את הענף שברצונך להפעיל (בדרך כלל "master" או "main")
# 9. לחץ על "Save"
# 10. העתק את ה-URL שנוצר והדבק אותו כאן
$netlifyBuildHook = "https://api.netlify.com/build_hooks/688688c76292b35f68ccf3cb"

Write-Host "=== GitHub Portfolio Updater ===" -ForegroundColor $Cyan
Write-Host "Simple and secure update process" -ForegroundColor $Cyan
Write-Host ""

# Check if we're in a git repository
if (-not (Test-Path ".git")) {
    Write-Host "ERROR: Not in a Git repository!" -ForegroundColor $Red
    exit 1
}

# Check for changes
$changes = git status --porcelain
if (-not $changes) {
    Write-Host "No changes to upload." -ForegroundColor $Yellow
    Write-Host "Repository is up to date!" -ForegroundColor $Green
    
    # Ask if user wants to update Netlify anyway
    $updateNetlify = Read-Host "Update Netlify anyway? (y/n)"
    
    if ($updateNetlify -eq "y") {
        try {
            Write-Host "Triggering Netlify rebuild..." -ForegroundColor $Cyan
            
            # Send POST request to Netlify build hook
            $response = Invoke-WebRequest -Uri $netlifyBuildHook -Method POST -UseBasicParsing
            
            if ($response.StatusCode -eq 200) {
                Write-Host "✅ Netlify build triggered successfully!" -ForegroundColor $Green
                Write-Host "Your site will be updated in 1-2 minutes." -ForegroundColor $Yellow
            } else {
                Write-Host "❌ Failed to trigger Netlify build. Status code: $($response.StatusCode)" -ForegroundColor $Red
            }
        } catch {
            Write-Host "❌ Error triggering Netlify build: $($_.Exception.Message)" -ForegroundColor $Red
        }
    }
    
    Read-Host "Press Enter to close"
    exit 0
}

try {
    # Show changes
    Write-Host "Changes to upload:" -ForegroundColor $Cyan
    git status -s
    Write-Host ""

    # Get commit message
    if ([string]::IsNullOrWhiteSpace($CommitMessage)) {
        $CommitMessage = Read-Host "Enter commit message (or press Enter for default)"
        if ([string]::IsNullOrWhiteSpace($CommitMessage)) {
            $CommitMessage = "Portfolio update - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
        }
    }
    Write-Host "Using commit message: $CommitMessage" -ForegroundColor $Yellow

    # Configure git user if needed
    $gitUser = git config user.name
    $gitEmail = git config user.email
    
    if ([string]::IsNullOrWhiteSpace($gitUser)) {
        Write-Host "Configuring Git user..." -ForegroundColor $Cyan
        git config user.name "GabiAharon"
        git config user.email "gabiaharon@gmail.com"
    }

    # Add and commit
    Write-Host "Adding changes..." -ForegroundColor $Cyan
    git add .
    
    Write-Host "Creating commit..." -ForegroundColor $Cyan
    git commit -m $CommitMessage
    
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to create commit"
    }

    # Check current branch
    $branch = git branch --show-current
    Write-Host "Current branch: $branch" -ForegroundColor $Cyan

    # Sync with remote
    Write-Host "Syncing with remote..." -ForegroundColor $Cyan
    git pull origin $branch --rebase

    # Push to GitHub
    Write-Host "Pushing to GitHub..." -ForegroundColor $Cyan
    Write-Host "(Git will prompt for credentials if needed)" -ForegroundColor $Yellow
    
    git push origin $branch
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`nSUCCESS: Update completed!" -ForegroundColor $Green
        Write-Host "Site URL: https://GabiAharon.github.io/gabiaharonportfolio/" -ForegroundColor $Green
        Write-Host "Note: GitHub Pages may take 5-10 minutes to update." -ForegroundColor $Yellow
        
        $lastCommit = git log -1 --oneline
        Write-Host "Last commit: $lastCommit" -ForegroundColor $Cyan
        
        # Trigger Netlify deploy
        try {
            Write-Host "Triggering Netlify rebuild..." -ForegroundColor $Cyan
            
            # Send POST request to Netlify build hook
            $response = Invoke-WebRequest -Uri $netlifyBuildHook -Method POST -UseBasicParsing
            
            if ($response.StatusCode -eq 200) {
                Write-Host "✅ Netlify build triggered successfully!" -ForegroundColor $Green
                Write-Host "Your site will be updated in 1-2 minutes." -ForegroundColor $Yellow
            } else {
                Write-Host "❌ Failed to trigger Netlify build. Status code: $($response.StatusCode)" -ForegroundColor $Red
            }
        } catch {
            Write-Host "❌ Error triggering Netlify build: $($_.Exception.Message)" -ForegroundColor $Red
        }
        
        Write-Host "`nPress Enter to close..." -ForegroundColor $Cyan
        Read-Host
    } else {
        throw "Push to GitHub failed"
    }

} catch {
    Write-Host "`nERROR: $($_.Exception.Message)" -ForegroundColor $Red
    Write-Host "Press Enter to close..." -ForegroundColor $Red
    Read-Host
    exit 1
}

Write-Host "`nUpdate completed successfully!" -ForegroundColor $Green 