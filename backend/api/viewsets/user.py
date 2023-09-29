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
from api.models import UserProfile
from rest_framework.authtoken.models import Token
from api.models import UserProfile

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'], authentication_classes=[], permission_classes=[AllowAny])
    def create_user(self, request):
        serializer = UserSerializer(data=request.data)
        rol_user = request.data.get('rol_user', 2)
        if serializer.is_valid():
            # Obtén los datos del usuario del serializer
            user_data = serializer.validated_data
            
            # Crea un nuevo usuario, pero NO guardes la contraseña en texto plano
            user = User(
                username=user_data['username'],
                email=user_data['email'],
            )

            # Encripta la contraseña utilizando set_password
            user.set_password(user_data['password'])
            user.save()

            # Genera un token
            token, _ = Token.objects.get_or_create(user=user)
            
            # Inicia sesión al usuario
            login(request, user)

            create_user_profile = UserProfile.objects.create(
                user=user,
                reference_rol_id=rol_user
            )

            user_role = UserProfile.objects.filter(user=user).values('reference_rol__nombre_rol')
            try:
                user_role = user_role[0].get('reference_rol__nombre_rol')
            except:
                user_role = "Sin Rol"


            response_data = {
                "message": "Usuario creado exitosamente",
                "token": token.key,
                "user": serializer.data,
                "user_role": user_role,
            }
            return Response(response_data, status=201)
        return Response(serializer.errors, status=400)

    # login
    @action(detail=False, methods=['post'], authentication_classes=[], permission_classes=[AllowAny])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({
                "message": "Por favor, proporciona nombre de usuario y contraseña"
            }, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=username, password=password)

        user_role = UserProfile.objects.filter(user=user).values('reference_rol__nombre_rol')

        try:
            user_role = user_role[0].get('reference_rol__nombre_rol')
        except:
            user_role = "Sin Rol"

        if user is not None:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "message": "Inicio de sesión exitoso",
                "token": token.key,
                "user": UserSerializer(user).data,
                "user_role": user_role,
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "message": "Credenciales inválidas"
            }, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def logout(self, request):
        user = request.user
        if user.is_authenticated:
            # Elimina el token de autenticación del usuario actual
            Token.objects.filter(user=user).delete()
            
            # Cierra la sesión del usuario
            logout(request)
            
            return Response({"message": "Sesión cerrada exitosamente"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No se encontró ninguna sesión activa"}, status=status.HTTP_400_BAD_REQUEST)