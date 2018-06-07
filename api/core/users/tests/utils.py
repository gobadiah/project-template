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
                'birthday': user.birthday.isoformat(),
                'club': user.club,
                'dominant-hand': user.dominant_hand,
                'first-name': user.first_name,
                'gender': user.gender,
                'last-name': user.last_name,
                'ranking': user.ranking,
            },
            'links': {
                'self': request.build_absolute_uri(
                    reverse('user-detail', args=[user.id]),
                ),
            },
            'relationships': {
                'current-stats': {
                    'data': None,
                    'links': {
                        'related': 'http://testserver/users' +
                        '/%d/current_stats' % user.id,
                    },
                },
                'picture': {
                    'data': None,
                    'links': {
                        'related': 'http://testserver/users/%d/picture' %
                        user.id,
                    },
                },
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
                'sessions': {
                    'data': [],
                    'links': {
                        'related': 'http://testserver/users/%d/sessions' %
                        user.id,
                    },
                    'meta': {
                        'count': 0,
                    },
                },
            },
        },
    }
