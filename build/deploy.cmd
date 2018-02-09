call npm install
call npm run build

call cd %DEPLOYMENT_TARGET%
for /F "delims=" %%i in ('dir /b') do (rmdir "%%i" /s/q || del "%%i" /s/q)

xcopy /d %DEPLOYMENT_SOURCE%\dist\* %DEPLOYMENT_TARGET\dist /s /i
xcopy /d %DEPLOYMENT_SOURCE%\package.json %DEPLOYMENT_TARGET\package.json*

echo Deployed