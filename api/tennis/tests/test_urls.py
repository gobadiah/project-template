"""Tests for tennis.urls."""

from ..urls import app_name, urlpatterns


def test_urls_app_name():
    """Test that app_name is correctly set."""
    assert app_name == 'tennis'


def test_tennis_urlpatterns():
    """Tests tennis urlpatterns."""
    assert len(urlpatterns) == 25
