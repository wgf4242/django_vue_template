@echo off
call :check_nodejs
:: δ��װ nodejs
if %errorlevel% neq 0 (
   exit /b
)


echo ���������ݿ�
echo mysql��Ҫʹ��8���ϰ汾 ����:
echo 1. copy backend\django_vue_template\my.cnf.bak Ϊ my.cnf���޸�����
echo 2. backend\django_vue_template\settings.py 99�м�����ȡ��ע��
echo --- �������ݿ������޸� settings.py ����
pause

::backend
Pushd %~dp0
call pip install virtualenv
cd backend
call virtualenv venv
call venv\Scripts\activate.bat
call pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py shell -c "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'admin@example.com', 'pass')"
popd 
echo �Ѿ���������Ա�˺� admin/pass


Pushd %~dp0
cd client
call npm install -g pnpm
call pnpm i
popd 


goto :EOF







:: -----------labels---------
:check_nodejs
node -v > nul 2>&1

if %errorlevel% equ 0 (
  echo yes
) else (
  echo "nodejsδ��װ �� δ��ӵ� Path·��"
  exit /b
)
goto :EOF

