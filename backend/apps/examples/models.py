from django.db import models
from django.contrib.auth import get_user_model

GENDER_CHOICES = (
    (0, '男'),
    (1, '女'),
    (2, '未指定')
)


# 一些常用字段
class EmployeeExample(models.Model):
    # id = models.AutoField()
    name = models.CharField(max_length=180, blank=True, null=True, verbose_name='姓名', help_text='姓名')
    file = models.FileField(upload_to='static/uploads', null=True, blank=True)
    gender = models.IntegerField(choices=GENDER_CHOICES, blank=True, null=True, default=0)
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, verbose_name='用户')
    is_admin = models.BooleanField(default=False)
    average = models.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        verbose_name = 'Employee'
        verbose_name_plural = verbose_name


from django.db import models
from django.db.models.functions import Cast


class Book(models.Model):
    name = models.CharField(max_length=180, blank=True, null=True)
    number = models.CharField(max_length=180, blank=True, null=True)
    price = models.IntegerField(blank=True, )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Book'
        verbose_name_plural = verbose_name
        # Order Method 1
        # ordering = ('-name',)
        #  String 转 number 排序
        ordering = ['name', Cast("number", output_field=models.IntegerField()), ]

    def __str__(self):
        return f'{self.name} - n:{self.number} - p:{self.price}'

