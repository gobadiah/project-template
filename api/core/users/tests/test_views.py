"""Test core.users.views."""

import re

import pytest

from .factories import UserFactory
from ..views import UserRelationshipView, UserViewSet


@pytest.mark.django_db
def test_userviewset_handle_request(rf):
    """Test UserViewSet can handle a simple retrieve."""
    user = UserFactory()
    request = rf.get(r'^/users/%d' % user.id)
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
    view = UserRelationshipView.as_view()
    response = view(request, pk=user.id, related_field='providers')
    assert response.status_code == 200
