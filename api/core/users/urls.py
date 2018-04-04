"""Core users urls."""

from django.urls import include, path

from jasonpi.utils import resource_relationships

from rest_framework_nested import routers

import sports.views

from . import views
from ..views import ProviderViewSet

router = routers.DefaultRouter(trailing_slash=False)

router.register(
    'users',
    views.UserViewSet,
)

users_router = routers.NestedDefaultRouter(
    router,
    r'users',
    lookup='user',
    trailing_slash=False,
)
users_router.register(
    r'providers',
    ProviderViewSet,
    base_name='user-providers',
)
users_router.register(
    r'sessions',
    sports.views.SessionViewSet,
    base_name='user-sessions',
)


urlpatterns = [
    path('', include(router.urls)),
    path('', include(users_router.urls)),
    resource_relationships('user', views.UserRelationshipView),
]
