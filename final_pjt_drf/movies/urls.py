from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

app_name = "movies"

router = DefaultRouter()
router.register('', views.MovieListViewSet)

urlpatterns = [
    path('recommend_by_bestgenre/', views.movie_recommend_by_bestgenre),
    path('recommend_by_genre/', views.movie_recommend_by_genre),
    path('recommend_by_weather/', views.MovieRecommendByWeatherViewSet.as_view({'get': 'list'})),
    path('like/<int:movie_pk>/', views.movie_like, name="movie_like"),
    path('rating/<int:movie_pk>/', views.movie_user_rating),
    path('search/', views.movie_search, name='movie_search'),
    path('', include(router.urls)),
]