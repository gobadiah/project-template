"""Test Core serializers."""

import importlib


def test_serializers():
    """Test that serializers are exported."""
    user_serializer_class = importlib.import_module('core.serializers') \
        .UserSerializer
    assert user_serializer_class is not None
