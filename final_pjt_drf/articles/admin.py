from django.contrib import admin
from .models import Article, Comment
# Register your models here.

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'content', 'created_at', 'updated_at',]

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['id', 'content', 'created_at', 'updated_at']
    
