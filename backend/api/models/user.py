from django.contrib.auth.models import User
from django.db import models
from .rol import RolModel

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    reference_rol = models.ForeignKey(RolModel, blank=True, null=True, on_delete=models.CASCADE, related_name="users_roles")