
# rest_framework

from rest_framework import viewsets, authentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

# serializers

from api.serializers import MenuSerializer
from api.models import MenuModel, RolMenuModel, UserProfile

class MenuViewset(viewsets.ModelViewSet):
    queryset = MenuModel.objects.all()
    serializer_class = MenuSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        try:
            
            data = request.data
            admin = data.get("admin", False)
            vendedor = data.get("vendedor", False)

            menu_create = MenuModel.objects.create(
                nombre_opcion=data.get("nombre_opcion"),
                link=data.get("link"),
            )


            if admin:
                admin_create = RolMenuModel.objects.create(
                menu_id=menu_create.id,
                rol_id=1,
            )
                
            if vendedor:
                vendedor_create = RolMenuModel.objects.create(
                menu_id=menu_create.id,
                rol_id=2,
            )
                
            return Response([], status=status.HTTP_201_CREATED)
        except:
            return Response([], status=status.HTTP_400_BAD_REQUEST)
        
    def list(self, request, *args, **kwargs):
        user = request.user

        if user.is_superuser:
            queryset = MenuModel.objects.all()
            serializer = MenuSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        try:
            role = UserProfile.objects.get(user_id=user.id).reference_rol_id

            queryset = RolMenuModel.objects.filter(rol_id=role)

            ids = [] 
            for query in queryset:
                ids.append(query.menu_id)
        except:
            ids = []

        try:
            queryset = MenuModel.objects.filter(id__in=ids).order_by("id").distinct()
            serializer = MenuSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response([], status=status.HTTP_400_BAD_REQUEST)
