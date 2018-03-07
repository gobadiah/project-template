"""Tests for assets.views."""

import json

from jasonpi.auth import get_token

import pytest

from rest_framework.test import force_authenticate

from .factories import AssetFactory
from ..views import AssetViewSet


@pytest.mark.django_db
def test_assetviewset_handle_request(rf):
    """Test AssetViewSet can handle a simple retrieve."""
    asset = AssetFactory()
    user = asset.owner
    request = rf.get('/assets')
    force_authenticate(request, user=user)
    view = AssetViewSet.as_view({'get': 'retrieve'})
    response = view(request, pk=asset.id)
    data = response.data
    assert data['url'] == asset.url
    assert data['content_type'] == asset.content_type
    response.render()
    content = json.loads(response.content)
    assert content == {
        'data': {
            'type': 'assets',
            'id': str(asset.id),
            'attributes': {
                'url': asset.url,
                'content-type': asset.content_type,
            },
        },
    }


@pytest.mark.django_db
def test_get_list_assetviewset(client):
    """Test integration for /assets endpoint."""
    asset = AssetFactory()
    user = asset.owner
    token = get_token(user=user)
    response = client.get(
        '/assets',
        HTTP_AUTHORIZATION='Bearer %s' % token,
    )
    assert response.status_code == 200
    result = json.loads(response.content)
    assert result['data'] == [
        {
            'attributes': {
                'url': asset.url,
                'content-type': asset.content_type,
            },
            'type': 'assets',
            'id': str(asset.id),
        },
    ]
    assert result['meta'] == {
        'pagination': {'count': 1, 'page': 1, 'pages': 1},
    }
    assert result['links']['prev'] is None
    assert result['links']['next'] is None
    assert '/assets?page=1' in result['links']['first']
    assert '/assets?page=1' in result['links']['last']
