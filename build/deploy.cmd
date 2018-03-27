:: https://stackoverflow.com/questions/40007370/programatically-set-app-setting-env-variable-during-azure-kudu-deployment
echo [custom] started deployment
echo [custom] environment found: %NODE_ENV%
echo [custom] deployment_target: %DEPLOYMENT_TARGET%
echo [custom] node version %WEBSITE_NODE_DEFAULT_VERSION%

call npm install

echo [custom] try to delete dist 
set "DIR_TO_DELETE=D:\home\site\repository\build\dist\"

IF EXIST %DIR_TO_DELETE% (
    echo [custom] deleting %DIR_TO_DELETE%
    FOR /D %%p IN ("%DIR_TO_DELETE%\*.*") DO rmdir "%%p" /S /Q
    del %DIR_TO_DELETE%\*.* /F /Q
    echo [custom] finish delete dist 
)

echo [custom] search env 
IF "%NODE_ENV%" == "qa" (
    echo qa env was found
    call npm run qabuild
) ELSE (
    echo qa was not found execute prod build
    call npm run build
)

echo [custom] build succeded
call cd %DEPLOYMENT_TARGET%
REM first the directories /ad option of dir
REM for /F "delims=" %%i in ('dir /b /ad') do (echo rmdir "%%i" /s/q)
REM now the files /a-d option of dir
REM for /F "delims=" %%i in ('dir /b /a-d') do (echo del "%%i" /q)

IF EXIST %DEPLOYMENT_TARGET% (
    echo [custom] started folders cleaning
    FOR /D %%p IN ("%DEPLOYMENT_TARGET%\*.*") DO rmdir "%%p" /S /Q
    del%DEPLOYMENT_TARGET%\*.* /F /Q
)

echo [custom] deployment_source %DEPLOYMENT_SOURCE%
echo "[custom] copy dist folder" 
xcopy /d %DEPLOYMENT_SOURCE%\dist\* %DEPLOYMENT_TARGET% /s /i /Y

echo "[custom] copy web.config" 
xcopy /d %DEPLOYMENT_SOURCE%\web.config %DEPLOYMENT_TARGET%\web.config* /Y

echo [custom] Deployed