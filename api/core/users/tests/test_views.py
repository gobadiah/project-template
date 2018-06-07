"""Test core.users.views."""

import json
import re

from jasonpi.auth import get_token

import pytest

from rest_framework.test import force_authenticate

from .factories import UserFactory
from .utils import response_for_user
from ..views import UserRelationshipView, UserViewSet


@pytest.mark.django_db
def test_userviewset_handle_request(rf):
    """Test UserViewSet can handle a simple retrieve."""
    user = UserFactory()
    request = rf.get(r'^/users/%d' % user.id)
    force_authenticate(request, user=user)
    view = UserViewSet.as_view({'get': 'retrieve'})
    response = view(request, pk=user.id)
    data = response.data
    assert data['email'] == user.email
    assert re.search(r'users/%d$' % user.id, data['url'])


@pytest.mark.django_db
def test_user_relationship_view(rf):
    """Test the user relationship view.

    TODO(michael)
    Each time a relationship is created add a test.
    Make this test more specific (add a relationship in the db
    and validate we find it here).
    """
    user = UserFactory()
    request = rf.get('users/%d/relationships' % user.id)
    force_authenticate(request, user=user)
    view = UserRelationshipView.as_view()
    response = view(request, pk=user.id, related_field='providers')
    assert response.status_code == 200


@pytest.mark.django_db
def test_integration_users_endpoint(client):
    """Test integration for GET /users endpoint."""
    user = UserFactory()
    token = get_token(user)
    client.force_login(user=user)
    response = client.get(
        '/users',
        HTTP_AUTHORIZATION='Bearer %s' % token,
    )
    assert response.status_code == 200
    result = json.loads(response.content.decode('utf-8'))
    assert 'meta' in result
    assert result['meta'] == {
        'pagination': {'count': 1, 'page': 1, 'pages': 1},
        'size': 1,
    }
    assert 'data' in result
    assert len(result['data']) == 1
    assert result['data'][0]['type'] == 'users'
    assert result['data'][0]['id'] == str(user.id)
    assert result['data'][0]['attributes'] == {
        'birthday': user.birthday.isoformat(),
        'club': user.club,
        'dominant-hand': user.dominant_hand,
        'email': user.email,
        'first-name': user.first_name,
        'gender': user.gender,
        'last-name': user.last_name,
        'ranking': user.ranking,
    }


@pytest.mark.django_db
def test_integration_users_me_endpoint(client):
    """Test integration for GET /users/me endpoint."""
    user = UserFactory()
    token = get_token(user)
    client.force_login(user=user)
    response = client.get(
        '/users/me',
        HTTP_AUTHORIZATION='Bearer %s' % token,
    )
    assert response.status_code == 200
    result = json.loads(response.content.decode('utf-8'))
    assert result == response_for_user(user, response.wsgi_request)
