from django.db import models
from rest_framework.authentication import get_user_model
from datetime import date
from django.utils import timezone



class stores(models.Model):
    name=models.CharField(max_length=255,unique=True)
    description=models.CharField(max_length=255,default="",null=True,blank=True)
    location=models.CharField(max_length=255,default="",null=True,blank=True)
    center=models.CharField(max_length=255,default="",null=True,blank=True)
    image=models.TextField(default="",null=True,blank=True)
    time=models.TextField(default={},null=True,blank=True)
    range=models.TextField(default=[],null=True,blank=True)
    created_date=models.DateTimeField(default=timezone.now)
    # creator = models.CharField(max_length=255,default="",null=True,blank=True)
    creator=models.ForeignKey(get_user_model(),on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name) +"_"+str(self.id)

class galleries(models.Model):
    gallery_store = models.ForeignKey(stores,on_delete=models.CASCADE)
    picture = models.TextField(default="",null=True,blank=True)
    created_date=models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.gallery_store) +"_"+str(self.id)