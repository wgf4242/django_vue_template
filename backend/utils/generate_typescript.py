# https://github.com/adenh93/django-typomatic
import os
import sys
from pathlib import Path

from django_typomatic import ts_interface, generate_ts

pwd = os.path.dirname(os.path.relpath(__file__))
sys.path.append(pwd + "../")

for f in Path('../').rglob('**/settings.py'):
    proj = f.parent.name
os.environ.setdefault("DJANGO_SETTINGS_MODULE", f"{proj}.settings")

import django

django.setup()

from apps.hse import serializers

for name in dir(serializers):
    if name.endswith("Serializer"):
        obj = getattr(serializers, name)
        ts_interface()(obj)

# @ts_interface()
# class Foo(serializers.Serializer):
#     some_field = serializers.CharField()
#     another_field = serializers.DateTimeField()
# ts_interface()(serializers.EmployeeSerializer)

generate_ts('./output.ts')
