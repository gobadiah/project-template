"""Core users views."""

from rest_framework import mixins
from rest_framework import viewsets

from .models import User
from .serializers import UserSerializer


class UserViewSet(
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.UpdateModelMixin,
        viewsets.GenericViewSet,
):
    """UserViewSet is the `/users` endpoint entry view."""

    queryset = User.objects
    serializer_class = UserSerializer
