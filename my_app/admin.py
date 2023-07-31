from django.contrib import admin
#from .models import Car, CarType, Mechanic, Repaired, UserProfile
from .models import UserProfile, Museum, PostMuseum, Request, Comment
# Register your models here.

admin.site.register(UserProfile)
admin.site.register(Museum)
admin.site.register(PostMuseum)
admin.site.register(Comment)
admin.site.register(Request)

