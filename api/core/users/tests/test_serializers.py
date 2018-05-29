"""Test Core users serializers."""

import pytest

from ..models import User
from ..serializers import UserSerializer


def test_user_serializer_fields():
    """Test that UserSerializer.Meta.fields contains some elements."""
    assert 'providers' in UserSerializer.Meta.fields


@pytest.mark.django_db
def test_user_serializer_can_serialize(rf):
    """Test UserSerializer can serialize a simple User object."""
    request = rf.get('/')
    request.query_params = {}
    user = User()
    serializer = UserSerializer(user, context={'request': request})
    assert serializer.data == {
        'url': None,
        'email': '',
        'providers': [],
        'birthday': None,
        'club': None,
        'current_stats': None,
        'dominant_hand': 'right_handed',
        'first_name': '',
        'gender': None,
        'last_name': '',
        'picture': None,
        'ranking': None,
        'sessions': [],
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
