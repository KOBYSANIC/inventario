from django.db import models

class MenuModel(models.Model):
    nombre_opcion = models.CharField(max_length=50)
    link = models.CharField(max_length=300)
