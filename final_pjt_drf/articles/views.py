from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import ArticleListSerializer, ArticleSerializer, CommentListSerializer, CommentSerializer, ArticleDetailSerializer
from .models import Article, Comment
from movies.models import Movie
from .pagination import ArticlePagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet
from django.http import HttpResponse, HttpResponseForbidden
# Create your views here.
class ArticleListViewSet(ReadOnlyModelViewSet):
    queryset = Article.objects.order_by('-created_at')
    serializer_class = ArticleDetailSerializer
    pagination_class = ArticlePagination

# @api_view(['GET'])
# def article_list(request):
#     articles = Article.objects.all()
#     serializer = ArticleListSerializer(articles, many=True)
#     # for i in range(len(articles)):
#     #     comments = list(Comment.objects.filter(article_id=articles[i].id))
#     #     serializer(id=i).save(comments=comments)
#     # print(serializer)
#     return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def article_create(request):
    serializer = ArticleSerializer(data=request.POST)
    if serializer.is_valid(raise_exception=True):
        if request.POST.get('movieId'):
            movie = get_object_or_404(Movie, pk=int(request.POST.get('movieId')))
            serializer.save(user=request.user, movie=movie)
        else:
            serializer.save(user=request.user)
        return Response(serializer.data)

@api_view(['PUT', 'GET'])
@permission_classes([IsAuthenticated])
def article_update(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if request.user == article.user:
        if request.method == 'GET':
            serializer = ArticleSerializer(article)
            return Response(serializer.data)
        else:
            data = {
            'title': request.POST.get('title', article.title),
            'content': request.POST.get('content', article.content),
            }
            serializer = ArticleSerializer(article, data=data)
            if serializer.is_valid(raise_exception=True):
                if request.POST.get('movieId'):
                    movie = get_object_or_404(Movie, pk=int(request.POST.get('movieId')))
                    serializer.save(movie=movie)
                else:
                    serializer.save(movie=None)
                return Response(serializer.data)
    else:
        return HttpResponseForbidden

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def article_detail(request, article_pk):
#     article = get_object_or_404(Article, pk=article_pk)
#     serializer = ArticleDetailSerializer(article)
#     return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def article_delete(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if request.user == article.user:
        article.delete()
        return HttpResponse(status=200)
    else:
        return HttpResponseForbidden()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def comment_create(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    comment_serializer = CommentSerializer(data=request.POST)
    if comment_serializer.is_valid(raise_exception=True):
        comment_serializer.save(user=request.user, article=article)
        article_serializer = ArticleDetailSerializer(article)
        return Response(article_serializer.data)


@api_view(['PUT', 'GET'])
@permission_classes([IsAuthenticated])
def comment_update(request, article_pk, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)
    if request.user == comment.user:
        if request.method == 'GET':
            serializer = CommentSerializer(comment)
            return Response(serializer.data)
        else:
            data = {
                'content': request.POST.get('content', comment.content)
            }
            serializer = CommentSerializer(comment, data=data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
    else:
        return HttpResponseForbidden()

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def comment_delete(request, article_pk, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)
    if request.user == comment.user:
        comment.delete()
        article = get_object_or_404(Article, pk=article_pk)
        serializer = ArticleDetailSerializer(article)
        return Response(serializer.data)
    else:
        return HttpResponseForbidden