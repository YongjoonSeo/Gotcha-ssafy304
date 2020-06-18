from django.urls import path
from . import views

app_name="accounts"

urlpatterns=[
    path('mypage/', views.mypage, name="mypage"),
    path('<int:user_pk>/', views.user_detail, name="user_detail"),
    path('delete/', views.user_delete, name="user_delete"),
    path('<int:user_pk>/follow/', views.follow, name="follow"),
]