from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

app_name="articles"

router = DefaultRouter()
router.register('', views.ArticleListViewSet)

urlpatterns=[
    # path('', views.article_list, name="article_list"),
    path('create/', views.article_create, name="article_create"),
    path('update/<int:article_pk>/', views.article_update, name="article_update"),
    # path('<int:article_pk>/', views.article_detail, name="article_detail"),
    path('delete/<int:article_pk>/', views.article_delete, name="article_delete"),
    path('create/<int:article_pk>/', views.comment_create, name="comment_create"),
    path('update/<int:article_pk>/<int:comment_pk>/', views.comment_update, name="comment_update"),
    path('delete/<int:article_pk>/<int:comment_pk>/', views.comment_delete, name="comment_delete"),
    path('', include(router.urls)),
]