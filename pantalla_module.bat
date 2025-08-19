@echo off
REM Ruta de Google Chrome (ajusta si es necesario)
set CHROME_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"

REM URL de la página que deseas abrir
set URL=https://admiopro.roanexus.com/public/turn-list-screen.php

REM Ejecutar Chrome en modo kiosco optimizado
start "" %CHROME_PATH% --kiosk %URL% --no-first-run --disable-infobars --disable-session-crashed-bubble --disable-translate --disable-notifications --disable-extensions --disable-plugins --disable-background-networking --disable-sync --disable-component-update --disable-default-apps --disable-popup-blocking --disable-features=TranslateUI

exit