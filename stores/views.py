
from .models import *
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.decorators import api_view
from rest_framework.authentication import get_user_model
from rest_framework.response import Response
from users.models import UserProfile
import os
from rest_framework.status import (
     HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
import json
# Create your views here.

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def create(request,user):
    data = request.data
    try:
        User=get_user_model()
        user = User.objects.get(username=user)
        store_profile = stores()
        store_profile.name = data["name"]
        store_profile.description = data["description"]
        store_profile.location = data["location"]
        store_profile.center = data["center"]
        store_profile.image = data["image"]
        store_profile.time = json.dumps(data["time"])
        store_profile.range = json.dumps(data["range"])
        store_profile.creator = user
        store_profile.save()
    except Exception as e:
        print("Exception is ",e)
        return Response({"status": str(e)})

    return Response({"status": "success"},status=HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getstores(request,user):
    l = user
    User = get_user_model()
    user = User.objects.get(username=user)
    store = stores.objects.filter(creator = user)
    resp = {}
    for i in store:
        # try:
        resp[i.id] = {}
        # except Exception as e:
        #     print(e)
        temp = {}
        temp["name"] = i.name
        temp["description"] = i.description
        temp["location"] = i.location
        temp["center"] = i.center
        temp["image"] = i.image
        temp["time"] = json.loads(i.time)
        temp["range"] = json.loads(i.range)
        temp["creator"] = l
        temp["date"] = str(i.created_date)
        resp[i.id] = temp
    return Response(resp)



@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def create_gallery(request, store_id):
    data = request.data
    storedata = stores.objects.get(id=store_id)
    storedata = storedata.name
    gal_data = galleries()
    gal_data.gallery_store = stores.objects.get(name = storedata)
    gal_data.picture= data["pic"]
    gal_data.save()
    return Response({"status":"success"})




@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_gallery(request, store_id):
    data = request.data
    storedata = stores.objects.get(id=store_id)
    storedata = storedata.name
    st = stores.objects.get(name = storedata)
    get_gall = galleries.objects.filter(gallery_store = st)
    resp = {}

    for i in get_gall:
        resp[i.id] = {}
        # except Exception as e:
        #     print(e)
        temp = {}
        temp["picture"] = i.picture
        temp["date"] = str(i.created_date)
        resp[i.id] = temp
    return Response(resp)

