"""Assets views."""

from rest_framework import viewsets

from .models import Asset
from .serializers import AssetSerializer


class AssetViewSet(viewsets.ModelViewSet):
    """AssetViewSet."""

    serializer_class = AssetSerializer
    queryset = Asset.objects.order_by('id')
