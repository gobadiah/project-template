"""Test Core apps."""

from core.apps import CoreConfig


def test_core_config():
    """Test CoreConfig's name."""
    assert CoreConfig.name == 'core'
