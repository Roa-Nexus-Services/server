@echo off
REM Ruta de Google Chrome (ajusta si es necesario)
set CHROME_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"

REM URL de la página que deseas abrir
set URL=https://admiopro.roanexus.com/public/print-ticket-screen.php

REM Ejecutar Chrome en modo kiosco
start "" %CHROME_PATH% --kiosk %URL%

exit
