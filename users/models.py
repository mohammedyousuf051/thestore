from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.


class UserProfile(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    email = models.CharField(max_length=255,default="",blank=True,null=True)


    def __str__(self):
        return self.user.username