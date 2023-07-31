from django.db.models import Avg
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.generics import RetrieveUpdateDestroyAPIView, RetrieveAPIView, CreateAPIView

from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, permissions
import datetime
from django.contrib.auth.models import User
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def register_user(request, format=None):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=200)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def profile_detail(request, id, format=None):
    try:
        profile = UserProfile.objects.filter(user__id=id).first()
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PATCH':
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        user = profile.user
        user.delete()
        # Now delete the profile
        profile.delete()

        profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def my_museums_list(request, id, format=None):
    try:
        museums = Museum.objects.filter(profile__id=id)
    except Museum.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MuseumSerializer(museums, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def museums_list(request, format=None):
    if request.method == 'GET':
        museums = Museum.objects.all()
        serializer = MuseumSerializer(museums, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = MuseumSerializerPost(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def museum_detail(request, id, format=None):
    try:
        museum = Museum.objects.get(pk=id)
    except Museum.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MuseumSerializer(museum)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = MuseumSerializer(museum, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        museum.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def museums_posts(request, id, format=None):
    try:
        posts = PostMuseum.objects.filter(museum__id=id)
    except Museum.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PostMuseumSerializer(posts, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = PostMuseumSerializerPost(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'POST'])
def comments_post(request, id, format=None):
    try:
        comments = Comment.objects.filter(post__id=id)
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = CommentSerializerPost(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def comment_post(request, id, format=None):
    try:
        comment = Comment.objects.get(pk=id)
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CommentSerializerPost(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def request_administrator(request, format=None):
    if request.method == 'GET':
        requests = Request.objects.all()
        serializer = RequestSerializerPost(requests, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = RequestSerializerPost(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def museum_post_detail(request, id, format=None):
    try:
        post = PostMuseum.objects.get(pk=id)
    except PostMuseum.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PostMuseumSerializer(post)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = PostMuseumSerializerPost(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
