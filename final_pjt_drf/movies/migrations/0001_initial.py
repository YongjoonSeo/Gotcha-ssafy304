# Generated by Django 2.1.15 on 2020-06-17 00:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('link', models.URLField()),
                ('thumbnail_url', models.URLField()),
                ('poster_url', models.URLField()),
                ('subtitle', models.CharField(max_length=100)),
                ('pub_date', models.CharField(max_length=100)),
                ('director', models.CharField(max_length=100)),
                ('actor', models.CharField(max_length=100)),
                ('fetched_user_rating', models.FloatField()),
                ('user_rating', models.FloatField()),
                ('genre', models.CharField(max_length=100)),
                ('like_users', models.ManyToManyField(related_name='like_movies', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MovieRatingUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.FloatField()),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movies.Movie')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='movie',
            name='rating_users',
            field=models.ManyToManyField(related_name='rated_movie', through='movies.MovieRatingUser', to=settings.AUTH_USER_MODEL),
        ),
    ]