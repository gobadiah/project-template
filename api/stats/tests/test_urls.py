"""Tests for stats.urls."""

from ..urls import app_name, urlpatterns


def test_urls_app_name():
    """Test that app_name is correctly set."""
    assert app_name == 'stats'


def test_stats_urlpatterns():
    """Tests stats urlpatterns."""
    assert len(urlpatterns) == 3
