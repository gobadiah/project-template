"""Test core.users.views."""

import json

import pytest

from utils import reload

from .factories import UserFactory
from ..views import UserViewSet


@pytest.mark.django_db
def test_userviewset_handle_request(rf):
    """Test UserViewSet can handle a simple retrieve."""
    reload('api.urls')
    user = UserFactory()
    request = rf.get(r'^/users/%d' % user.id)
    view = UserViewSet.as_view({'get': 'retrieve'})
    response = view(request, pk=user.id)
    response.render()
    obj = json.loads(response.content.decode('utf-8'))
    assert obj['email'] == user.email
