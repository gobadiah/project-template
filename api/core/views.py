"""Core views."""

from jasonpi.models import Provider
from jasonpi.serializers import ProviderSerializer

from rest_framework import mixins, viewsets

from .users.views import UserViewSet  # Noqa F401 # imported but unused


class ProviderViewSet(
        mixins.RetrieveModelMixin,
        mixins.ListModelMixin,
        viewsets.GenericViewSet,
):
    """ProviderViewSet for accessing providers."""

    serializer_class = ProviderSerializer
    queryset = Provider.objects.order_by('id')
