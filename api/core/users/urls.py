"""Core users urls."""

from django.urls import include, path

from jasonpi.utils import one_to_one_relationship, resource_relationships

from rest_framework_nested import routers

import sports.views

import stats.views

import tennis.views

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
users_router.register(
    r'tennis_sessions',
    tennis.views.SessionViewSet,
    base_name='user-tennis_sessions',
)


urlpatterns = [
    path('', include(router.urls)),
    path('', include(users_router.urls)),
    resource_relationships('user', views.UserRelationshipView),
    one_to_one_relationship('user', 'current_stats', stats.views.StatsViewSet),
]
