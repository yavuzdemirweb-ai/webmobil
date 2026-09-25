$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = "O:\xampp\htdocs\webmobil"
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true
$watcher.NotifyFilter = [System.IO.NotifyFilters]'FileName, LastWrite, Size'

$filter = @("*.html", "*.css", "*.js", "*.json", "*.svg")

$action = {
    $path = $Event.SourceEventArgs.FullPath
    $extension = [System.IO.Path]::GetExtension($path)
    if ($filter -contains "*$extension") {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        Write-Host "[$timestamp] Değişiklik algılandı: $path" -ForegroundColor Cyan
        Write-Host "Commit ve push yapılıyor..." -ForegroundColor Yellow
        cmd.exe /c "cd /d O:\xampp\htdocs\webmobil && git add -A && git commit -m Auto-update: $timestamp && git push"
        Write-Host "Push tamamlandı!" -ForegroundColor Green
    }
}

Register-ObjectEvent $watcher "Changed" -Action $action | Out-Null
Register-ObjectEvent $watcher "Created" -Action $action | Out-Null

Write-Host "Auto-push dinleyici çalışıyor. Dosya değişiklikleri otomatik olarak GitHub'a yükleniyor." -ForegroundColor Magenta
Write-Host "Durdurmak için Ctrl+C basın." -ForegroundColor Gray

while ($true) { Start-Sleep -Seconds 1 }
