"""Test sports.apps."""

from ..apps import SportsConfig


def test_sports_config():
    """Test SportsConfig's name."""
    assert SportsConfig.name == 'sports'
