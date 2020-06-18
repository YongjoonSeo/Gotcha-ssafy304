from django.db import models
from django.conf import settings
# Create your models here.
class Movie(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    link = models.URLField()
    thumbnail_url = models.URLField()
    poster_url = models.URLField()
    subtitle = models.CharField(max_length=100)
    pub_date = models.CharField(max_length=100)
    director = models.CharField(max_length=500)
    actor = models.CharField(max_length=500)
    fetched_user_rating = models.FloatField()
    user_rating = models.FloatField()
    # user_counting = models.IntegerField(default=0, null=True, blank=True)
    genre = models.CharField(max_length=100)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="like_movies")
    rating_users = models.ManyToManyField(settings.AUTH_USER_MODEL, through="MovieRatingUser", related_name="rated_movie")

class MovieRatingUser(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    rating = models.FloatField()


