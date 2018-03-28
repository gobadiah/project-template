"""Sports urls."""

from django.urls import include, path

from jasonpi.utils import resource_relationships

from rest_framework_nested import routers

from . import views

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'sessions', views.SessionViewSet)
router.register(r'videos', views.VideoViewSet)
router.register(r'videopoints', views.VideoPointViewSet)

sessions_router = routers.NestedDefaultRouter(
    router,
    r'sessions',
    lookup='session',
    trailing_slash=False,
)
sessions_router.register(
    r'videos',
    views.VideoViewSet,
    base_name='session-videos',
)

videos_router = routers.NestedDefaultRouter(
    router,
    r'videos',
    lookup='video',
    trailing_slash=False,
)

videopoints_router = routers.NestedDefaultRouter(
    router,
    r'videopoints',
    lookup='videopoint',
    trailing_slash=False,
)

urlpatterns = [
    path('', include(router.urls)),

    # sessions
    path('', include(sessions_router.urls)),
    resource_relationships('session', views.SessionRelationshipView),

    # videos
    path('', include(videos_router.urls)),
    resource_relationships('video', views.VideoRelationshipView),

    # videopoints
    path('', include(videopoints_router.urls)),
    resource_relationships('videopoint', views.VideoPointRelationshipView),
]
