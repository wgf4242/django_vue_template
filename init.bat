@echo off
call :check_nodejs
:: 未安装 nodejs
if %errorlevel% neq 0 (
   exit /b
)


echo 请配置数据库
echo mysql需要使用8以上版本 如下:
echo 1. copy backend\django_vue_template\my.cnf.bak 为 my.cnf并修改内容
echo 2. backend\django_vue_template\settings.py 99行及下面取消注释
echo --- 其他数据库自行修改 settings.py 配置
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
echo 已经创建管理员账号 admin/pass


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
  echo "nodejs未安装 或 未添加到 Path路径"
  exit /b
)
goto :EOF

