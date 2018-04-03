"""Test utils for core.users."""

from django.urls import reverse


def response_for_user(user, request):
    """Generate a json response for the user-detail endpoint."""
    return {
        'data': {
            'type': 'users',
            'id': str(user.id),
            'attributes': {
                'email': user.email,
            },
            'links': {
                'self': request.build_absolute_uri(
                    reverse('user-detail', args=[user.id]),
                ),
            },
            'relationships': {
                'providers': {
                    'data': [],
                    'links': {
                        'related': request.build_absolute_uri(
                            reverse('user-providers-list', args=[user.id]),
                        ),
                    },
                    'meta': {
                        'count': 0,
                    },
                },
            },
        },
    }
