from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    active = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ("__all__")

    def get_active(self, usuario):
        try:
            profile = usuario.userprofile.active
        except:
            profile = False
        return profile
