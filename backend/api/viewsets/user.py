# django

from django.contrib.auth import login, logout, authenticate

# rest_framework

from rest_framework import viewsets, permissions, authentication, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny

# serializers

from api.serializers import UserSerializer

# models

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'], authentication_classes=[], permission_classes=[AllowAny])
    def create_user(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            login(request, user)
            response_data = {
                "message": "Usuario creado exitosamente",
                "token": token.key,
                "user": serializer.data,

            }
            return Response(response_data, status=201)
        return Response(serializer.errors, status=400)

    @action(detail=False, methods=['post'], authentication_classes=[], permission_classes=[AllowAny])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({
                "message": "Por favor, proporciona nombre de usuario y contraseña"
            }, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "message": "Inicio de sesión exitoso",
                "token": token.key,
                "user": UserSerializer(user).data,
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "message": "Credenciales inválidas"
            }, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['post'], authentication_classes=[], permission_classes=[AllowAny])
    def logout(self, request):
        print("jajfadfa")
        user = request.user
        print(user)
        if user:
            token = Token.objects.get(user_id=1)
            token.delete()
            logout(request)
            return Response({"message": "Sesión cerrada exitosamente"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No se encontró ninguna sesión activa"}, status=status.HTTP_400_BAD_REQUEST)