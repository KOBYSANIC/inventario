
# rest_framework

from rest_framework import viewsets, authentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

# serializers

from api.serializers import ClienteSerializer
from api.models import Clientes

class ClientesViewset(viewsets.ModelViewSet):
    queryset = Clientes.objects.using("DB_ORACLE").all()
    serializer_class = ClienteSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [AllowAny]
    
        