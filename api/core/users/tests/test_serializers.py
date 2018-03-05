"""Test Core users serializers."""

import pytest

from ..models import User
from ..serializers import UserSerializer


def test_user_serializer_can_serializer(rf):
    """Test UserSerializer can serialize a simple User object."""
    request = rf.get('/')
    request.query_params = {}
    user = User()
    serializer = UserSerializer(user, context={'request': request})
    assert serializer.data == {
        'url': None,
        'email': '',
        'groups': [],
    }


@pytest.mark.django_db
def test_user_serializer_can_deserialize():
    """Test UserSerializer can deserialize basic data."""
    data = {
        'email': 'alfred@dupuis.fr',
    }
    serializer = UserSerializer(data=data, partial=True)
    serializer.is_valid()
    assert serializer.validated_data['email'] == data['email']
