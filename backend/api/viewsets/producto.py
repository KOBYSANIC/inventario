
# rest_framework

from rest_framework import viewsets, authentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

# serializers

from api.serializers import ProductoSerializer
from api.models import Productos

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
     
        