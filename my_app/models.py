import uuid
from django.db import models
from django.contrib.auth.models import User
from django.core import validators


class UserProfile(models.Model):
    first_name = models.CharField(max_length=70, default='')
    last_name = models.CharField(max_length=70, default='')
    gender = models.CharField(max_length=200, blank=True, null=True, default='')
    birthday = models.CharField(max_length=200, blank=True, null=True, default='')
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    urlImage = models.CharField(max_length=200, blank=True, null=True,
                                default='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541')
    isAdministrator = models.BooleanField(default=False)


class Museum(models.Model):
    name = models.CharField(max_length=70, default='')
    type = models.CharField(max_length=70, default='')
    location = models.CharField(max_length=200, blank=True, null=True, default='')
    country = models.CharField(max_length=200, blank=True, null=True, default='')
    city = models.CharField(max_length=200, blank=True, null=True, default='')
    description = models.CharField(max_length=400, blank=True, null=True, default='')
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, null=True)
    urlImage = models.CharField(max_length=200, blank=True, null=True, default='')


class PostMuseum(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=True)
    name = models.CharField(max_length=70, default='')
    author = models.CharField(max_length=70, default='')
    description = models.CharField(max_length=400, blank=True, null=True, default='')
    museum = models.ForeignKey(Museum, on_delete=models.CASCADE, null=True)
    urlImage = models.CharField(max_length=200, blank=True, null=True, default='')
    isUploaded = models.BooleanField(default=False)

class Comment(models.Model):
    details = models.CharField(max_length=400, blank=True, null=True, default='')
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, null=True)
    post = models.ForeignKey(PostMuseum, on_delete=models.CASCADE, null=True)
    date = models.CharField(max_length=200, default='')


class Request(models.Model):
    details = models.CharField(max_length=400, blank=True, null=True, default='')
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, null=True)
