"""Tests for assets models."""

from django.contrib.auth import get_user_model

import pytest

from .factories import AssetFactory

User = get_user_model()


@pytest.mark.django_db
def test_asset_model():
    """Test that we can create an asset."""
    user = User.objects.create(  # Noqa B106
        email='some-guy@example.com',
        password='with_some_password',
    )
    asset = AssetFactory(creator=user)
    assert asset.creator == user
    assert asset.url == 'https://some-url.com/path/to/asset.mp4'
    assert not asset.external
    assert asset.content_type == 'video/mp4'
    assert asset.meta == {
    }
