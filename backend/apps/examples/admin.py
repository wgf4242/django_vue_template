from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportActionModelAdmin

from . import models

admin.site.register(models.EmployeeExample)


class BookResource(resources.ModelResource):
    def get_export_headers(self):  # 通过 resource 自定义header
        meta = self._meta.model._meta
        headers = [field.verbose_name for field in meta.fields]
        # from django.utils.encoding import force_str
        # headers = [force_str(field.column_name) for field in self.get_export_fields()]
        return headers

    class Meta:
        model = models.Book


class BookAdmin(ImportExportActionModelAdmin, admin.ModelAdmin):
    resource_class = BookResource


admin.site.register(models.Book, BookAdmin)
