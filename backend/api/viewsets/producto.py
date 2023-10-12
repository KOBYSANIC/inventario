
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
                stockinicial=data.get("stockinicial"),
                stockactual=data.get("stockactual")
              
            )

            return Response([], status=status.HTTP_201_CREATED)
     
        