"""Assets urls."""

from django.urls import include, path

from rest_framework_nested import routers

from .views import AssetViewSet

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'assets', AssetViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
