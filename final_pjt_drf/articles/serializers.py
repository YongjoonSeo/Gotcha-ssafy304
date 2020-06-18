from rest_framework import serializers
from .models import Article, Comment
from accounts.serializers import UserSerializer
from movies.serializers import MovieSerializer, MovieSimpleSerializer

class ArticleSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    movie = MovieSimpleSerializer(required=False)
    class Meta:
        model = Article
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    article = ArticleSerializer(required=False)
    class Meta:
        model = Comment
        fields = '__all__'

class CommentListSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_at', 'updated_at', 'user']

class ArticleDetailSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    comments = serializers.SerializerMethodField()

    movie = MovieSimpleSerializer(required=False)
    class Meta:
        model = Article
        fields = '__all__'

    def get_comments(self, article):
        comments = Comment.objects.filter(article=article).order_by('-created_at')
        serializer = CommentListSerializer(instance=comments, many=True)
        return serializer.data

class ArticleListSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    movie = MovieSimpleSerializer(required=False)
    # comments = serializers.ListField(required=False)
    class Meta:
        model = Article
        fields = '__all__'