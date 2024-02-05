Django + Vue3 Project Template
# Env
Python 3.10.3

# 数据库配置
## Mysql配置
copy backend\django_vue_template\my.cnf.bak backend\django_vue_template\my.cnf
修改 my.cnf
修改 backend\django_vue_template 99行取消注释

# Deploy init
```bash
1. vi /etc/nginx/nginx.conf
修改 user nginx; -> user root;
2. pip3 install uwsgi
ln -sf /usr/local/python-3.10.0/bin/uwsgi /usr/bin/uwsgi


```

# Deploy
after ssh

```
cd /home/kali/sites/backend
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py collectstatic --no-input
-- pkill -9 python3 && nohup ./run.sh &
uwsgi --stop /tmp/backend-master.pid
nohup uwsgi --ini 01_socket.ini &
sudo systemctl restart nginx
```

# Get started

**Client install**

```
cd client
pnpm install
```
Backend install
```
cd backend
pip install -r requirements.txt
```

**Config Database**

set Your Database in settings.py
```
# mysql
cp backend/django_vue_template/my.cnf.bak backend/django_vue_template/my.cnf
```

**Start proejct**

```
# client
cd client
pnpm dev

# backend
cd backend
python3 manage.py runserver
```
