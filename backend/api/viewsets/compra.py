
# rest_framework

from rest_framework import viewsets, authentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from api.models import Productos
# serializers

from api.serializers import CompraSerializer
from api.models import Ventas, Detallesventa

class CompraViewset(viewsets.ModelViewSet):
    queryset = Ventas.objects.all().order_by('-fechaventa')
    serializer_class = CompraSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        data = request.data

        selected_items = data.get("selectedItems")  # Obtén los elementos seleccionados de la solicitud

        totalventa = sum(float(item["subtotal"]) for item in selected_items)

        # validar stock
        for item in selected_items:
            producto = Productos.objects.get(id=item["id"])
            if producto.stockactual < item["cantidad"]:
                return Response({"error": "Stock insuficiente para " + item["nombre"]}, status=status.HTTP_400_BAD_REQUEST)
            else:
                producto.stockactual -= item["cantidad"]
                producto.save()

        compra_create = Ventas.objects.create(
            clienteid_id=data.get("clientes"),
            fechaventa=data.get("fechaventa"),
            totalventa=totalventa,  # Almacena la suma de los subtotales en totalventa
            anulado=0,
        )

        compra_id = Ventas.objects.latest('id').id

        # Crea registros en Detallesventa para cada elemento en selectedItems
        for item in selected_items:
            Detallesventa.objects.create(
                ventaid_id=compra_id,  # Utiliza el registro creado en Ventas
                productoid_id=item["id"],  # Utiliza el ID del producto recibido
                cantidad=item["cantidad"],
                preciounitario=item["preciounitario"],
                subtotal=item["subtotal"],
            )

        return Response([], status=status.HTTP_201_CREATED)
    
    def destroy(self, request, pk):

            anulate = Ventas.objects.filter(id=pk).update(anulado=1)

            return Response([], status=204)
        