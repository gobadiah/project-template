"""Tests for stats.views."""

import json

from core.users.tests.factories import UserFactory

from django.urls import reverse

from jasonpi.auth import get_token

import pytest

from rest_framework.test import force_authenticate

from .factories import StatsFactory
from ..views import StatsViewSet


@pytest.mark.django_db
def test_statsviewset_handle_request(rf):
    """Test StatsViewSet can handle a simple retrieve."""
    stats = StatsFactory()
    request = rf.get('/')
    user = UserFactory()
    force_authenticate(request, user=user)
    view = StatsViewSet.as_view({'get': 'retrieve'})
    response = view(request, pk=stats.id)
    data = response.data
    assert data == {
        'data': stats.data,
    }


@pytest.mark.django_db
def test_get_list_statsviewset(client):
    """Test integration for StatsViewSet endpoint with client."""
    stats = StatsFactory()
    user = UserFactory()
    token = get_token(user=user)
    response = client.get(
        reverse('stats:stats-list'),
        HTTP_AUTHORIZATION='Bearer %s' % token,
    )
    assert response.status_code == 200
    result = json.loads(response.content)
    assert result['data'] == [
        {
            'attributes': {
                'data': stats.data,
            },
            'type': 'stats',
            'id': str(stats.id),
        },
    ]
    assert result['meta'] == {
        'pagination': {'count': 1, 'page': 1, 'pages': 1},
    }
    assert result['links']['prev'] is None
    assert result['links']['next'] is None
    assert '/stat?page=1' in result['links']['first']
    assert '/stat?page=1' in result['links']['last']
