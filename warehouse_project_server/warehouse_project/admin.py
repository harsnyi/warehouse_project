from django.contrib import admin
from .models import Storage, Occupier, DebtLog

admin.site.register(Storage)
admin.site.register(Occupier)
admin.site.register(DebtLog)
