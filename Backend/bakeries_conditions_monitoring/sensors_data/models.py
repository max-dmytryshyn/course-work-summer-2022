from django.utils import timezone
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from bakery.models import Bakery


class TemperatureSensorData(models.Model):
    temperature = models.FloatField()
    bakery = models.ForeignKey(Bakery, on_delete=models.deletion.CASCADE, related_name="temperature_records")
    date = models.DateTimeField(default=timezone.now, editable=False, null=False)


class HumiditySensorData(models.Model):
    humidity = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)])
    bakery = models.ForeignKey(Bakery, on_delete=models.deletion.CASCADE, related_name="humidity_records")
    date = models.DateTimeField(default=timezone.now, editable=False, null=False)
