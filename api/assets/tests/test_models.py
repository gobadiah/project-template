"""Tests for assets models."""

from django.contrib.auth import get_user_model

import pytest

from .factories import AssetFactory

User = get_user_model()


@pytest.mark.django_db
def test_asset_model():
    """Test that we can create an asset."""
    asset = AssetFactory()
    assert asset.owner is not None
    assert asset.owner.id is not None
    assert asset.url == 'https://some-url.com/path/to/asset.mp4'
    assert not asset.external
    assert asset.content_type == 'video/mp4'
    assert asset.meta == {
        'etag': 'Hello',
    }
