"""Tests for sports.urls."""

from ..urls import urlpatterns


def test_sports_urlpatterns():
    """Tests sports urlpatterns."""
    assert len(urlpatterns) == 10
