from django.db import models
from django.contrib.auth.models import AbstractUser
from .rol import RolModel

class User(AbstractUser):
    reference_rol = models.ForeignKey(RolModel, blank=True, null=True, on_delete=models.CASCADE, related_name="users_roles")
    groups = models.ManyToManyField(
            'auth.Group',
            verbose_name='groups',
            blank=True,
            related_name='user_custom_set',  # Cambia este nombre
            help_text='The groups this user belongs to.',
        )
    user_permissions = models.ManyToManyField(
            'auth.Permission',
            verbose_name='user permissions',
            blank=True,
            related_name='user_custom_set',  # Cambia este nombre
            help_text='Specific permissions for this user.',
            related_query_name='user_custom',
        )