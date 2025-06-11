@echo off
echo ===================================================
echo English to Hindi Translator - Deployment Script
echo ===================================================

echo.
echo Installing dependencies...
echo ---------------------------------------------------
pip install -r requirements.txt

echo.
echo Starting the web application...
echo ---------------------------------------------------
echo Access the translator at http://127.0.0.1:5000
echo Press Ctrl+C to stop the server
echo.
python app.py
