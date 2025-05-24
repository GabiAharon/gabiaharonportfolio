# Script for automatic GitHub updates
# Gabi Aharon Portfolio Updater

# Color definitions
$successColor = "Green"
$errorColor = "Red"
$infoColor = "Cyan"
$warningColor = "Yellow"

Write-Host "=== Updating Portfolio on GitHub ===" -ForegroundColor $infoColor
Write-Host "Starting update process..." -ForegroundColor $infoColor

# Check if there are changes to update
$hasChanges = git status --porcelain
if ($null -eq $hasChanges -or $hasChanges -eq "") {
    Write-Host "No new changes to upload to GitHub." -ForegroundColor $warningColor
    Write-Host "Closing in 3 seconds..." -ForegroundColor $infoColor
    Start-Sleep -Seconds 3
    exit 0
}

try {
    # Show current changes
    Write-Host "`nChanges to be uploaded:" -ForegroundColor $infoColor
    git status -s
    Write-Host ""

    # Request commit message from user
    $commitMessage = Read-Host "Enter commit message (Enter = 'Site update')"
    
    # If user didn't enter a message, use default
    if ([string]::IsNullOrWhiteSpace($commitMessage)) {
        $commitMessage = "Site update"
    }

    # Add all changes
    Write-Host "`nAdding all changes..." -ForegroundColor $infoColor
    git add .

    # Create commit
    Write-Host "Creating commit with message: '$commitMessage'..." -ForegroundColor $infoColor
    git commit -m $commitMessage

    # Push to GitHub
    Write-Host "Pushing to GitHub..." -ForegroundColor $infoColor
    git push origin master

    # Success message
    Write-Host "`n✓ Update completed successfully! 🎉" -ForegroundColor $successColor
    Write-Host "Site will update soon at:" -ForegroundColor $successColor
    Write-Host "https://gabiaharon.github.io/gabiaharonportfolio/" -ForegroundColor $successColor
    
    # Note about update time
    Write-Host "`nNote: It may take a few minutes for changes to appear on the site." -ForegroundColor $infoColor
    
    # 5-second countdown before closing
    Write-Host "`nClosing in..." -ForegroundColor $infoColor
    for ($i = 5; $i -gt 0; $i--) {
        Write-Host "$i seconds" -ForegroundColor $warningColor
        Start-Sleep -Seconds 1
    }
}
catch {
    # Error message in case of failure
    Write-Host "`n✗ An error occurred during the update process:" -ForegroundColor $errorColor
    Write-Host $_.Exception.Message -ForegroundColor $errorColor
    
    # Wait longer on error so user can see the error
    Write-Host "`nClosing in 10 seconds..." -ForegroundColor $infoColor
    Start-Sleep -Seconds 10
} 