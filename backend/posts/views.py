from email import message
from django.shortcuts import render
# from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import UserSerializer
from .models import User


@api_view(['POST'])
def signup(request):
    object = UserSerializer(data=request.data)    
    email = request.data['email']    
    username = request.data['username']
    print(email)
    print(username)
    users = User.objects.filter(email=email)
    if len(users):
        print('++++++++++++++++++')
        return Response({'msg':"user already signed up"}, status=409)
    users = User.objects.filter(username=username)
    if len(users):
        print('-----------------------')
        return Response({'msg':"username already exists"}, status=409)
    if object.is_valid():
        print
        object.save()    
        return Response("successfully created user", status=200)
    return Response("invalid request format", status=400)