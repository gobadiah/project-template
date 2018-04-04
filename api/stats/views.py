"""Stats views."""


from rest_framework import viewsets

from rest_framework_json_api.views import RelationshipView


from .models import Stats
from .serializers import StatsSerializer


class StatsViewSet(viewsets.ModelViewSet):
    """StatsViewSet."""

    queryset = Stats.objects.order_by('id')
    serializer_class = StatsSerializer


class StatsRelationshipView(RelationshipView):
    """Stats relationship view."""

    queryset = Stats.objects.order_by('id')
