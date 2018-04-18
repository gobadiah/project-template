"""Stats urls."""

from django.urls import include, path

from jasonpi.utils import resource_relationships

from rest_framework_nested import routers

from . import views

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'stat', views.StatsViewSet)

stat_router = routers.NestedDefaultRouter(
    router,
    r'stat',
    lookup='stats',
    trailing_slash=False,
)

app_name = 'stats'
urlpatterns = [
    path('', include(router.urls)),

    # stat
    path('', include(stat_router.urls)),
    resource_relationships('stats', views.StatsRelationshipView),
]
