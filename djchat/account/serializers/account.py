from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from ..models import Account


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ("username",)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def get_token(cls, user):
        token = super().get_token(user)
        token["example"] = "example"  # Исправьте опечатку в "example"
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["user_id"] = self.user.id  # Установите 'user_id' в данных ответа
        return data
