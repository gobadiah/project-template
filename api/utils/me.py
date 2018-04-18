"""Me utils."""

from django.contrib.auth import get_user_model

from rest_framework.exceptions import NotAuthenticated

User = get_user_model()


def get_user(request, kwargs):
    """Retrieve the correct user, using either the id or request.user if me."""
    if kwargs['user_pk'] == 'me':
        if not request.user or not request.user.is_authenticated:
            raise NotAuthenticated()
        return request.user
    else:
        return User.objects.get(pk=kwargs['user_pk'])
