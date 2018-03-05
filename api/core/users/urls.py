"""Core users urls."""

from django.urls import include, path

from rest_framework_nested import routers

from . import views

users_router = routers.DefaultRouter(trailing_slash=False)

users_router.register(
    r'users',
    views.UserViewSet,
)

urlpatterns = [
    path('/', include(users_router.urls)),
]
