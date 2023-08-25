from django.db import models

class RolModel(models.Model):
    nombre_rol = models.CharField(max_length=50)
