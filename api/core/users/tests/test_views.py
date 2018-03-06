"""Test core.users.views."""

import re

import pytest

from .factories import UserFactory
from ..views import UserViewSet


@pytest.mark.django_db
def test_userviewset_handle_request(rf):
    """Test UserViewSet can handle a simple retrieve."""
    user = UserFactory()
    request = rf.get(r'^/users/%d' % user.id)
    view = UserViewSet.as_view({'get': 'retrieve'})
    response = view(request, pk=user.id)
    data = response.data
    assert data['email'] == user.email
    assert re.search(r'/users/%d$' % user.id, data['url'])
    assert data['groups'] == []
