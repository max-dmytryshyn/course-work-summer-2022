from django.contrib import admin
from sensors_data.models import TemperatureSensorData, HumiditySensorData


@admin.register(TemperatureSensorData)
class TemperatureSensorDataAdmin(admin.ModelAdmin):
    fields = ('temperature', 'bakery')
    list_display = ('id', 'temperature', 'bakery', 'date')


@admin.register(HumiditySensorData)
class HumiditySensorDataAdmin(admin.ModelAdmin):
    fields = ('humidity', 'bakery')
    list_display = ('id', 'humidity', 'bakery', 'date')
