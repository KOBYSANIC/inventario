from rest_framework import serializers
from api.models import Productos
from rest_framework import serializers

class ProductoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Productos
        fields = "__all__"
