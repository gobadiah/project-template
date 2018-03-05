"""Test core.users.views."""

import pytest

from ..views import UserViewSet
from .factories import UserFactory


@pytest.mark.django_db
def test_userviewset_handle_request(rf):
    """Test UserViewSet can handle a simple retrieve."""
    user = UserFactory()
    request = rf.get('/users/%d' % user.id)
    view = UserViewSet.as_view({'get': 'retrieve'})
    response = view(request, pk=user.id)
    print(response)
    assert response == False
