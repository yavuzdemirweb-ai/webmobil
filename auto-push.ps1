$projectPath = "O:\xampp\htdocs\webmobil"

Write-Host "Auto-push baslatildi. Dosya degisiklikleri izleniyor..." -ForegroundColor Magenta
Write-Host "Ctrl+C ile durdur." -ForegroundColor Gray

while ($true) {
    Start-Sleep -Seconds 2
    $status = cmd.exe /c "cd /d $projectPath && git status --porcelain"
    if ($null -ne $status -and $status -ne "") {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH-mm-ss"
        Write-Host "[$timestamp] Degisiklik algilandi, push yapiliyor..." -ForegroundColor Yellow
        $result = cmd.exe /c "cd /d $projectPath && git add -A && git commit -m ""Auto-update $timestamp"" && git push"
        Write-Host $result -ForegroundColor Green
    }
}
