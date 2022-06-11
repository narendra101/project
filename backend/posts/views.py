from email import message
from django.shortcuts import render
# from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response

# from .serializers import UserSerializer
# from .models import User


@api_view(['POST'])
def signup(request):
    object = UserSerializer(data=request.data)
    if object.is_valid():
        object.save()
    else:
        return Response("error creating user", status=400)
    print(request.data, '============================')
    return Response("successfully created user", status=200)