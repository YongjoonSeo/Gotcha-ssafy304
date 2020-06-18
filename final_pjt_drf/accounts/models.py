from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.
class User(AbstractUser):
    # def __init__(self, *args, **kwargs):
    #     super(User, self).__init__(*args, **kwargs)
    # def save(self, *args, **kwargs):    
    #     return super(User,self).save(*args, **kwargs)
    # GENDER_CHOICES = Choices('Male', 'Female', 'Not Specified')
    followers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="followings")
    nickname = models.CharField(max_length=15, blank=False, null=False)
    # gender = models.CharField(max_length=50, chocies=GENDER_CHOICES)
    # rating = models.FloatField(null=True, blank=True)
    REQUIRED_FIELDS = ['nickname', 'email']