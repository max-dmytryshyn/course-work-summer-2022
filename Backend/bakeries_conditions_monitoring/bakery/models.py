from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import User


def validate_owner(user_pk):
    user = User.objects.get(pk=user_pk)
    if 1 not in [group.id for group in user.groups.all()]:
        raise ValidationError("Bakery owner must be in Bakery owners group")


class Bakery(models.Model):
    name = models.CharField(max_length=50)
    owner = models.ForeignKey(User, on_delete=models.deletion.CASCADE, validators=[validate_owner],
                              related_name="bakeries")
    address = models.CharField(max_length=50)
    logo = models.ImageField(upload_to="bakery/logo/")
