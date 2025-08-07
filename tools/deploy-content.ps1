# Safe deploy helper – pushes current changes to a new branch and prints a PR link
param(
  [string]$Message = "Content update",
  [string]$BaseBranch = "master",
  [switch]$OpenPr
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path -LiteralPath '.git')) {
  Write-Error "This folder is not a git repository."
  exit 1
}

$branchName = "content-update-" + (Get-Date -Format 'yyyyMMdd-HHmm')

git add .
git commit -m $Message 2>$null | Out-Null
git fetch origin --quiet
git checkout -b $branchName
git push -u origin $branchName

# Detect repo URL
$remoteUrl = git remote get-url origin
if ($remoteUrl -match 'github.com[:/](.+?)/(.+?)(\.git)?$') {
  $owner = $Matches[1]
  $repo = $Matches[2]
  $prUrl = "https://github.com/$owner/$repo/compare/$BaseBranch...$branchName?expand=1"
  Write-Host "PR URL: $prUrl" -ForegroundColor Cyan
  if ($OpenPr) { Start-Process $prUrl }
} else {
  Write-Warning "Could not parse origin URL for PR link."
}

