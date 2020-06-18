import sqlite3, requests, re, random
import pandas as pd
from django.shortcuts import render, get_object_or_404
from django.db.models import Max
from django.db.models import Count
from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Movie, MovieRatingUser
from .serializers import MovieListSerializer, MovieSerializer, MovieSimpleSerializer
from .pagination import PageNumberPaginationFirstLast
from accounts.models import User
from bs4 import BeautifulSoup
# from accounts.serializers import UserSimpleSerializer
# Create your views here.
class MovieListViewSet(ReadOnlyModelViewSet):
    queryset = Movie.objects.all().order_by("-fetched_user_rating", "-user_rating")
    serializer_class = MovieListSerializer
    pagination_class = PageNumberPaginationFirstLast

class MovieRecommendByWeatherViewSet(ReadOnlyModelViewSet):
    def weather():
        url = 'https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EC%84%9C%EC%9A%B8+%EB%82%A0%EC%94%A8&oquery=%EC%98%A4%EB%8A%98+%EB%82%A0%EC%94%A8'
        res = requests.get(url).text
        data = BeautifulSoup(res, 'html.parser')
        weather = data.select_one('ul.info_list  p.cast_txt').get_text()
        if re.search(r'[(비)(천둥)(번개)]', weather):
            genre_by_weather = ['범죄', '스릴러', '공포(호러)', '미스터리', '전쟁']
        elif re.search(r'맑', weather):
            genre_by_weather = ['드라마', '애니메이션', '뮤지컬', '멜로/로맨스', '코미디', '가족', '공연']
        else:
            genre_by_weather = ['판타지', '액션', 'SF', '어드벤처', '다큐멘터리', '사극', '기타', '서부극(웨스턴)']    
        return Movie.objects.filter(genre__in = genre_by_weather).order_by('-fetched_user_rating')
    
    queryset = weather()
    serializer_class = MovieListSerializer
    pagination_class = PageNumberPaginationFirstLast

@api_view(['POST'])
def movie_like(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    if movie.like_users.filter(pk=request.user.pk).exists():
        movie.like_users.remove(request.user)
    else:
        movie.like_users.add(request.user)
    serializer = MovieListSerializer(movie)
    return Response(serializer.data)

# @permission_classes([AllowAny])
@api_view(['GET'])
def movie_recommend_by_bestgenre(request):
    if request.user.is_authenticated:
        con = sqlite3.connect("db.sqlite3")
        cur = con.cursor()
        query = cur.execute("SELECT * FROM movies_movie")
        cols = [column[0] for column in query.description]
        movies = pd.DataFrame.from_records(data=query.fetchall(), columns=cols)
        con.close
        con = sqlite3.connect("db.sqlite3")
        cur = con.cursor()
        query = cur.execute("SELECT * FROM movies_movie_like_users")
        cols = [column[0] for column in query.description]
        movies_liked = pd.DataFrame.from_records(data=query.fetchall(), columns=cols)
        con.close
        if len(movies_liked[movies_liked['user_id']==request.user.id]) == 1:
            selected_id = movies_liked[movies_liked['user_id']==request.user.id].iloc[0,1]
            genre = movies[movies['id']==selected_id]['genre'][0]
            selected_movies = movies[movies['genre'] == genre]
            movies_for_sz = Movie.objects.filter(id__in = selected_movies['id']).order_by("?")[:12]
            serializer = MovieListSerializer(movies_for_sz, many=True)
        elif len(movies_liked[movies_liked['user_id']==request.user.id]) == 0:
            movies_for_sz = Movie.objects.all().order_by("?")[:12]
            serializer = MovieListSerializer(movies_for_sz, many=True)
        else:
            like_movies = movies_liked[movies_liked['user_id']==request.user.id]
            movies_filtered = movies[movies['id'].isin(like_movies['movie_id'])]
            genre1 = movies_filtered['genre'].value_counts().index[0]
            genre2 = movies_filtered['genre'].value_counts().index[1]
            selected_movies = movies[(movies['genre'] == genre1) | (movies['genre'] == genre2)]
            movies_for_sz = Movie.objects.filter(id__in = selected_movies['id']).order_by('?')[:12]
            serializer = MovieListSerializer(movies_for_sz, many=True)

        # like_movies = Movie.objects.filter(like_users=request.user)
        # selected_movies = like_movies.values('genre').annotate(num_genre=Count('genre')).order_by('-num_genre')
        # selected_movies_list = list(selected_movies)
        # genre = selected_movies_list[0]['genre']
        # movies_for_sz = Movie.objects.filter(genre=genre).order_by('-fetched_user_rating')

        return Response(serializer.data)

    movies_for_sz = Movie.objects.all().order_by("?")[:12]
    serializer = MovieListSerializer(movies_for_sz, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def movie_recommend_by_genre(request):
    movies_for_sz = Movie.objects.filter(genre=getgenre).order_by('-fetched_user_rating')
    serializer = MovieListSerializer(movies_for_sz, many=True)
    return Response(serializer.data)

@permission_classes([IsAuthenticated])
@api_view(['PUT'])
def movie_user_rating(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    if MovieRatingUser.objects.filter(user_id=request.user.id).exists():
        movierating = get_object_or_404(MovieRatingUser, user=request.user)
        movierating.rating = request.data.get('userRating')
        movierating.save()
    else:
        temp = MovieRatingUser(user=request.user, movie=movie, rating=request.data.get('userRating'))
        temp.save()
    con = sqlite3.connect("db.sqlite3")
    cur = con.cursor()
    query = cur.execute("SELECT * FROM movies_movieratinguser")
    cols = [column[0] for column in query.description]
    movieratinguser = pd.DataFrame.from_records(data=query.fetchall(), columns=cols)
    con.close
    rated_movie = movieratinguser[movieratinguser['movie_id']==movie_pk]
    total_user = len(rated_movie)
    total_rating = rated_movie['rating'].sum()
    movie.user_rating = round(float(total_rating)/float(total_user), 2)
    movie.save()
    serializer = MovieSimpleSerializer(movie)
    return Response(serializer.data)
    
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def movie_search(request):
    queries = request.GET.get('query').split()
    movies = Movie.objects.all()
    for query in queries:
        movies = movies.filter(title__icontains=query)
    movies = movies[:5]
    serializer = MovieSimpleSerializer(movies, many=True)
    return Response(serializer.data)

# @api_view(['GET'])
# def movie_recommend_by_weather(request):
#     global genre_by_weather
#     url = 'https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EC%84%9C%EC%9A%B8+%EB%82%A0%EC%94%A8&oquery=%EC%98%A4%EB%8A%98+%EB%82%A0%EC%94%A8'
#     res = requests.get(url).text
#     data = BeautifulSoup(res, 'html.parser')
#     weather = data.select_one('ul.info_list  p.cast_txt').get_text()
#     if re.search(r'[(비)(천둥)(번개)]', weather):
#         genre_by_weather = ['범죄', '스릴러', '공포(호러)', '미스터리', '전쟁']
#     elif re.search(r'맑', weather):
#         genre_by_weather = ['드라마', '애니메이션', '뮤지컬', '멜로/로맨스', '코미디', '가족', '공연']
#     else:
#         genre_by_weather = ['판타지', '액션', 'SF', '어드벤처', '다큐멘터리', '사극', '기타', '서부극(웨스턴)']
    
#     movies_recommend_by_weather = Movie.objects.filter(genre__in = genre_by_weather).order_by('-fetched_user_rating')[:12]
#     serializer = MovieListSerializer(movies_recommend_by_weather, many=True)
    
#     return Response(serializer.data)
    