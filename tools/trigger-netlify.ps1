# Triggers a Netlify build using the NETLIFY_BUILD_HOOK environment variable
param(
  [string]$HookUrl = $env:NETLIFY_BUILD_HOOK
)

$ErrorActionPreference = 'Stop'

if (-not $HookUrl) {
  Write-Error "NETLIFY_BUILD_HOOK is not set. Provide -HookUrl or set the environment variable on Netlify."
}

Write-Host "Triggering Netlify build…" -ForegroundColor Cyan

try {
  $resp = Invoke-WebRequest -Uri $HookUrl -Method POST -UseBasicParsing -TimeoutSec 30
  if ($resp.StatusCode -eq 200) {
    Write-Host "Netlify build triggered successfully!" -ForegroundColor Green
  } else {
    Write-Warning "Netlify returned status $($resp.StatusCode)"
  }
} catch {
  Write-Error "Failed to call Netlify hook: $($_.Exception.Message)"
}


