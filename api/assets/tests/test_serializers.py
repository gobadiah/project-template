"""Tests assets serializers."""

import pytest

from .factories import AssetFactory
from ..serializers import AssetSerializer


def test_asset_serializer_fields():
    """Test that AssetSerializer.Meta.fields contains the right elements."""
    assert AssetSerializer.Meta.fields == [
        'url',
        'content_type',
    ]


@pytest.mark.django_db
def test_asset_serializer_can_serialize(rf):
    """Test AssetSerializer can serialize a simple Asset object."""
    asset = AssetFactory()
    serializer = AssetSerializer(asset)
    assert serializer.data == {
        'url': 'https://some-url.com/path/to/asset.mp4',
        'content_type': 'video/mp4',
    }


@pytest.mark.django_db
def test_asset_serializer_can_deserialize():
    """Test AssetSerializer can deserialize basic data."""
    url = 'https://aws.s3.amazon.com/test/video.mp4'
    content_type = 'video/mp4'
    data = {
        'url': url,
        'content_type': content_type,
    }
    serializer = AssetSerializer(data=data, partial=True)
    serializer.is_valid()
    assert serializer.validated_data['url'] == url
    assert serializer.validated_data['content_type'] == content_type
