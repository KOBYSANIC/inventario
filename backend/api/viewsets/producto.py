
# rest_framework

from rest_framework import viewsets, authentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

# serializers

from api.serializers import ProductoSerializer
from api.models import Productos

from django.db.models import Sum, Min, Max
from django.db.models.functions import Cast, Coalesce
from django.db.models import CharField, Value, IntegerField

class ProductoViewset(viewsets.ModelViewSet):
    queryset = Productos.objects.using("DB_ORACLE").all()
    serializer_class = ProductoSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
       
            
            data = request.data

            producto_create = Productos.objects.using("DB_ORACLE").create(
                
            
                nombre=data.get("nombre"),
                precio = data.get("precio"),
                stockinicial=data.get("stockactual"),
                stockactual=data.get("stockactual")
              
            )

            return Response([], status=status.HTTP_201_CREATED)
    
    def update(self, request, pk, *args, **kwargs):
        try:
            data = request.data

            # Obtén el menú que estás actualizando usando el pk proporcionado en la URL
            producto = Productos.objects.using("DB_ORACLE").get(pk=pk)

            # Actualiza los campos del menú
            producto.nombre = data.get("nombre")
            producto.precio = data.get("precio")
            producto.stockactual = data.get("stockactual")
            
            producto.save()
                
            return Response([], status=status.HTTP_201_CREATED)
        except Productos.DoesNotExist:
            return Response({"error": "El producto no existe."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get']) 
    def reportes(self, request, *args, **kwargs):
            result = Productos.objects.using("DB_ORACLE").annotate(
                total_venta= Coalesce(Sum('detallesventa__cantidad'), Value(0), output_field=IntegerField()),
                primera_venta=Cast(Min('detallesventa__ventaid__fechaventa'), CharField()),
                ultima_venta=Cast(Max('detallesventa__ventaid__fechaventa'), CharField())
            ).order_by('-total_venta').values('id', 'nombre', 'total_venta', 'primera_venta', 'ultima_venta')

            results = list(result) # convierte el queryset en una lista de diccionarios

            formatted_results = [
                {
                    "id": item["id"],
                    "nombre": item["nombre"],
                    "primera_venta": item["primera_venta"],
                    "ultima_venta": item["ultima_venta"],
                    "total_venta": str(item["total_venta"]),
                }
                for item in results
            ]

            return Response(formatted_results, status=status.HTTP_200_OK)
        