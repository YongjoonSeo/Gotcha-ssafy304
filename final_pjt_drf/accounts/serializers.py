from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    nickname = serializers.CharField(max_length=15, required=True)
    class Meta:
        model = User
        fields = '__all__'

# class UserSimpleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         exclude = ('nickname',)


class CustomRegisterSerializer(RegisterSerializer):
    username = serializers.CharField(required=True, write_only=True)
    password1 = serializers.CharField(required=True, write_only=True)
    password2 = serializers.CharField(required=True, write_only=True)
    email = serializers.CharField(required=True)
    nickname = serializers.CharField(required=True)

    def get_cleaned_data(self):
        super(CustomRegisterSerializer, self).get_cleaned_data()
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
            'nickname': self.validated_data.get('nickname', ''),
        }

    def save(self, request):
        user = super(CustomRegisterSerializer, self).save(request)
        return user

class UserIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id']