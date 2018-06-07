"""Tests assets serializers."""

import pytest

from .factories import AssetFactory
from ..models import Asset
from ..serializers import AssetSerializer


def test_asset_serializer_fields():
    """Test that AssetSerializer.Meta.fields contains the right elements."""
    assert AssetSerializer.Meta.fields == [
        'url',
        'info',
    ]
    assert AssetSerializer.Meta.model == Asset


@pytest.mark.django_db
def test_asset_serializer_can_serialize(rf):
    """Test AssetSerializer can serialize a simple Asset object."""
    asset = AssetFactory()
    serializer = AssetSerializer(asset)
    assert serializer.data == {
        'url': 'https://some-url.com/path/to/asset.mp4',
        'info': {
            'content-type': 'video/mp4',
            'content-length': 4557392,
            'e-tag': 'zlfij234jjzfzef34erlfgej',
            's3': {
                'bucket': 'some-bucket',
                'key': 'some-key',
            },
        },
    }


@pytest.mark.django_db
def test_asset_serializer_can_deserialize():
    """Test AssetSerializer can deserialize basic data."""
    url = 'https://aws.s3.amazon.com/test/video.mp4'
    info = {
        'content-type': 'video/mp4',
        'content-length': 4557392,
        'e-tag': 'zlfij234jjzfzef34erlfgej',
        's3': {
            'bucket': 'some-bucket',
            'key': 'some-key',
        },
    }
    data = {
        'url': url,
        'info': info,
    }
    serializer = AssetSerializer(data=data, partial=True)
    serializer.is_valid()
    assert serializer.validated_data['url'] == url
    assert serializer.validated_data['info'] == info
