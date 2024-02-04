start /d "%cd%\client" pnpm dev
start /d backend cmd /k "call venv\scripts\activate.bat && python manage.py runserver"