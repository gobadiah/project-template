"""Core users views."""

from rest_framework import mixins
from rest_framework import viewsets

from rest_framework_json_api.views import RelationshipView

from .models import User
from .serializers import UserSerializer


class UserViewSet(
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.UpdateModelMixin,
        viewsets.GenericViewSet,
):
    """UserViewSet is the `/users` endpoint entry view."""

    queryset = User.objects.order_by('id')
    serializer_class = UserSerializer


class UserRelationshipView(RelationshipView):
    """User relationship view."""

    queryset = User.objects.order_by('id')
