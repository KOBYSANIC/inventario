from django.db import models
from .rol import RolModel
from .menu import MenuModel

class RolMenuModel(models.Model):
    rol = models.ForeignKey(RolModel, blank=False, null=False, on_delete=models.CASCADE, related_name="rol")
    menu = models.ForeignKey(MenuModel, blank=False, null=False, on_delete=models.CASCADE, related_name="menu")
