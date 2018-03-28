"""Sports views."""


from rest_framework import viewsets

from rest_framework_json_api.views import RelationshipView


from .models import \
    Session, \
    Video, \
    VideoPoint
from .serializers import \
    SessionSerializer, \
    VideoPointSerializer, \
    VideoSerializer


class SessionViewSet(viewsets.ModelViewSet):
    """SessionViewSet."""

    queryset = Session.objects.order_by('id')
    serializer_class = SessionSerializer


class SessionRelationshipView(RelationshipView):
    """Session relationship view."""

    queryset = Session.objects.order_by('id')


class VideoViewSet(viewsets.ModelViewSet):
    """VideoViewSet."""

    queryset = Video.objects.order_by('id')
    serializer_class = VideoSerializer


class VideoRelationshipView(RelationshipView):
    """Video relationship view."""

    queryset = Video.objects.order_by('id')


class VideoPointViewSet(viewsets.ModelViewSet):
    """VideoPointViewSet."""

    queryset = VideoPoint.objects.order_by('id')
    serializer_class = VideoPointSerializer


class VideoPointRelationshipView(RelationshipView):
    """VideoPoint relationship view."""

    queryset = VideoPoint.objects.order_by('id')
