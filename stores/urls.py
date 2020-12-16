
from django.urls import path
from django.conf.urls import url
from . import views


urlpatterns = [
    path('create/<slug:user>',views.create,name="create store"),
    path('getstores/<slug:user>',views.getstores,name="get user specific stores"),
    path('create_gallery/<slug:store_id>',views.create_gallery,name="create_gallery"),
    path('get_gallery/<slug:store_id>',views.get_gallery,name="get_gallery"),

    ]