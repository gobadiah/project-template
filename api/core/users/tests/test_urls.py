"""Test core.users.urls."""

from ..urls import urlpatterns


def test_users_urlpatterns():
    """Test users urlpatterns."""
    assert len(urlpatterns) == 5
