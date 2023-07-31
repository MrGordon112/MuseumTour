from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.schemas import get_schema_view
from django.views.generic import TemplateView
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('api_schema/', get_schema_view(
        title='API Schema',
        description='Guide for the REST API'
    ), name='api_schema'),
    path('docs/', TemplateView.as_view(
        template_name='docs.html',
        extra_context={'schema_url': 'api_schema'}
    ), name='swagger-ui'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.register_user, name="register_user"),

    path('profile/<int:id>', views.profile_detail),

    path('list_my_museums/<int:id>', views.my_museums_list),
    path('list_museums/', views.museums_list),
    path('list_museums/<int:id>', views.museum_detail),

    path('museums_posts/<int:id>', views.museums_posts),
    path('post_detail/<uuid:id>', views.museum_post_detail),

    path('comments/<uuid:id>', views.comments_post),

    path('comment/<int:id>', views.comment_post),

    path('requests/', views.request_administrator),
]
