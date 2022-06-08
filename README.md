Django + Vue3 Project Template

# Deploy init
```bash
1. vi /etc/nginx/nginx.conf
修改 user nginx; -> user root;
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
