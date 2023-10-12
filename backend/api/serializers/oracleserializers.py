from rest_framework import serializers
from api.models import Productos, Ventas
from rest_framework import serializers

class ProductoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Productos
        fields = "__all__"

class CompraSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ventas
        fields = "__all__"
