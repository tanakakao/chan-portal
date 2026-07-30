@echo off
setlocal
chcp 65001 > nul
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo [エラー] Node.js が見つかりません。Node.js 18 以上をインストールしてください。
  goto :error
)
where npm >nul 2>&1
if errorlevel 1 (
  echo [エラー] npm が見つかりません。Node.js と npm の設定を確認してください。
  goto :error
)

if not exist "node_modules\" (
  echo 依存パッケージをインストールしています...
  call npm install
  if errorlevel 1 goto :error
)

netstat -ano -p tcp | findstr /R /C:":5172 .*LISTENING" >nul
if not errorlevel 1 (
  echo [エラー] ポート 5172 は既に使用されています。使用中のアプリを終了してから再実行してください。
  goto :error
)

echo ポータルを http://127.0.0.1:5172 で起動します...
call npm run dev
if errorlevel 1 goto :error
exit /b 0

:error
echo.
echo 起動に失敗しました。上記のメッセージを確認してください。
pause
exit /b 1
