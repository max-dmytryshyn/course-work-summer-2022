from django.contrib import admin
from bakery.models import Bakery


@admin.register(Bakery)
class BakeryAdmin(admin.ModelAdmin):
    fields = ("name", "owner", "address", "logo")
