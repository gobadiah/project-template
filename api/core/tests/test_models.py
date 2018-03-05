"""Test Core models."""

import importlib


def test_user_model():
    """Test User model is available in core.models."""
    user = importlib.import_module('core.models').User
    assert user is not None
