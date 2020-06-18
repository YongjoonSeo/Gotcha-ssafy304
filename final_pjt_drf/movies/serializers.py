from rest_framework import serializers
from .models import Movie
from django.conf import settings
from accounts.serializers import UserSerializer, UserIdSerializer

class MovieSerializer(serializers.ModelSerializer):
    like_users = UserIdSerializer(many=True, required=False)
    class Meta:
        model = Movie
        fields = '__all__'

class MovieListSerializer(serializers.ModelSerializer):
    like_users = UserSerializer(many=True)
    class Meta:
        model = Movie
        fields = '__all__'

class MovieSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        exclude = ['like_users', 'rating_users']