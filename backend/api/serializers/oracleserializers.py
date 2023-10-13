from rest_framework import serializers
from api.models import Productos, Ventas, Clientes
from rest_framework import serializers

class ProductoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Productos
        fields = "__all__"

class CompraSerializer(serializers.ModelSerializer):
    clienteid = serializers.SerializerMethodField()
    class Meta:
        model = Ventas
        fields = "__all__"

    def get_clienteid(self, cliente):
        try :
            name = cliente.clienteid.nombre
        except:
            name = "Sin cliente"
        return name


class ClienteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Clientes
        fields = "__all__"
