@echo off
echo Cleaning target folder...
if exist target (
    rmdir /s /q target
    echo Target folder deleted successfully!
) else (
    echo Target folder does not exist.
)
echo.
echo Please restart your Spring Boot application now.
pause
