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

    def get_object(self):
        """Return the user object corresponding to the given primary key.

        We override this method to allow for calls to /users/me.
        """
        pk = self.kwargs.get('pk')

        if pk == 'me' and \
                self.request.user and \
                self.request.user.is_authenticated:
            return self.request.user

        return super(UserViewSet, self).get_object()


class UserRelationshipView(RelationshipView):
    """User relationship view."""

    queryset = User.objects.order_by('id')
