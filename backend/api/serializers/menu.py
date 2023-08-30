from rest_framework import serializers
from api.models import MenuModel
from rest_framework import serializers

class MenuSerializer(serializers.ModelSerializer):

    class Meta:
        model = MenuModel
        fields = "__all__"
