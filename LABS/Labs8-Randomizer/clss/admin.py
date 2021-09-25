from django.contrib import admin

from .models import ClssName, StudentName, Participation
# Register your models here.


class ClssNameAdmin(admin.ModelAdmin):
    readonly_fields=('created_at','last_modified')


admin.site.register(ClssName, ClssNameAdmin)
admin.site.register(StudentName)
admin.site.register(Participation)