# tar --exclude='venv' -czvf  ../$(date +%F).tar.gz .
unzip -o xxb_hse_qrcode.zip "backend/**"
. venv/bin/activate
python3 manage.py makemigrations
python3 manage.py migrate
