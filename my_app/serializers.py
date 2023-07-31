from datetime import timedelta, datetime

from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import *
from django.contrib.auth.models import User


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    is_staff = True

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match!"})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.is_active = True
        user.is_superuser = True
        user.is_staff = True
        user.save()

        user_profile = UserProfile.objects.create(
            user=user
        )
        user_profile.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_active']


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = ['id', 'first_name', 'last_name', 'gender', 'birthday', 'user', 'urlImage', 'isAdministrator']


class MuseumSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = Museum
        fields = ['id', 'name', 'type', 'location', 'country', 'city', 'description', 'profile', 'urlImage']


class MuseumSerializerPost(serializers.ModelSerializer):
    class Meta:
        model = Museum
        fields = ['id', 'name', 'type', 'location', 'country', 'city', 'description', 'profile', 'urlImage']


class PostMuseumSerializer(serializers.ModelSerializer):
    museum = MuseumSerializer(read_only=True)

    class Meta:
        model = PostMuseum
        fields = ['id', 'name', 'author', 'description', 'museum', 'urlImage', 'isUploaded']


class PostMuseumSerializerPost(serializers.ModelSerializer):
    class Meta:
        model = PostMuseum
        fields = ['id', 'name', 'author', 'description', 'museum', 'urlImage', 'isUploaded']


class CommentSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    post = PostMuseumSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'details', 'profile', 'post', 'date']


class CommentSerializerPost(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'details', 'profile', 'post', 'date']

class RequestSerializerPost(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ['id', 'details', 'profile']
