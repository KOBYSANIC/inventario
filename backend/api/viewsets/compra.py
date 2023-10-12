
# rest_framework

from rest_framework import viewsets, authentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

# serializers

from api.serializers import CompraSerializer
from api.models import Ventas

class CompraViewset(viewsets.ModelViewSet):
    queryset = Ventas.objects.using("DB_ORACLE").all()
    serializer_class = CompraSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
       
            
            data = request.data

            Compra_create = Ventas.objects.using("DB_ORACLE").create(
                
            
                #clienteid=data.get(),
                fechaventa = data.get("fechaventa"),
                totalventa=data.get("totalventa"),
            )

            return Response([], status=status.HTTP_201_CREATED)
     
        