"""Tests the me utils."""

from core.users.tests.factories import UserFactory

from mock import MagicMock

import pytest

from ..me import get_user


@pytest.mark.django_db
def test_get_user_without_me():
    """Test that get_user uses pk as is if it's not me."""
    user = UserFactory()
    assert get_user(None, {'user_pk': user.pk}) == user


@pytest.mark.django_db
def test_get_user_with_me():
    """Test that get_user uses current_user if pk is me."""
    user = MagicMock()
    user.is_authenticated = True
    kwargs = {'user_pk': 'me'}
    request = MagicMock()
    request.user = user
    assert get_user(request, kwargs) == user

