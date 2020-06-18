from django.contrib import admin
from .models import Movie
# Register your models here.

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'subtitle', 'pub_date', 'director', 'actor', 'genre',]
