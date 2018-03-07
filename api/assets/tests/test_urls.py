"""Tests assets.urls."""

from ..urls import urlpatterns


def test_assets_urlpatterns():
    """Test assets urlpatterns."""
    assert len(urlpatterns) == 1
