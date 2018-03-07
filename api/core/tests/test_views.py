"""Test Core views."""

import importlib


def test_views():
    """Test that views are exported."""
    users_view = importlib.import_module('core.views').UserViewSet
    assert users_view is not None
