"""Test assets apps."""

from ..apps import AssetsConfig


def test_assets_config():
    """Test AssetsConfig's name."""
    assert AssetsConfig.name == 'assets'
