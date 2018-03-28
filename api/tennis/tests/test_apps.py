"""Test tennis.apps."""

from ..apps import TennisConfig


def test_tennis_config():
    """Test TennisConfig's name."""
    assert TennisConfig.name == 'tennis'
