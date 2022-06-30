from django.db import models

# Create your models here.
class Department(models.Model):
    name = models.CharField(max_length=180, blank=True, null=True, verbose_name='部门名称', help_text='部门名称', unique=True)
    parent = models.ForeignKey('self', verbose_name='上级部门', help_text='上级部门', related_name='depts', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        lst = []

        if parent := self.parent:
            lst.append(str(parent))
        lst.append(self.name)
        return '-'.join(lst) or str(self.id)

    class Meta:
        verbose_name = '部门管理'
        verbose_name_plural = verbose_name