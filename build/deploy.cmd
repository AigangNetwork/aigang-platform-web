:: https://stackoverflow.com/questions/40007370/programatically-set-app-setting-env-variable-during-azure-kudu-deployment
echo [custom] started deployment
echo [custom] environment found:
echo %NODE_ENV%
echo [custom] deployment_target: %DEPLOYMENT_TARGET%

call npm install

IF %NODE_ENV% == "qa" (
    echo qa env was found
)
ELSE (
    echo qa was not found execute prod build
    call npm run build
)

call cd %DEPLOYMENT_TARGET%
for /F "delims=" %%i in ('dir /b') do (rmdir "%%i" /s/q || del "%%i" /s/q)

xcopy /d %DEPLOYMENT_SOURCE%\dist\* %DEPLOYMENT_TARGET% /s /i
xcopy /d %DEPLOYMENT_SOURCE%\web.config %DEPLOYMENT_TARGET%\web.config*

echo [custom] Deployed