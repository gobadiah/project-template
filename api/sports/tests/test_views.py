"""Tests for sports.views."""

import json

from core.users.tests.factories import UserFactory

from jasonpi.auth import get_token

import pytest

from rest_framework.test import force_authenticate

from .factories import \
    SessionFactory, \
    VideoFactory, \
    VideoPointFactory
from ..views import \
    SessionViewSet, \
    VideoPointViewSet, \
    VideoViewSet


@pytest.mark.django_db
def test_sessionviewset_handle_request(rf):
    """Test SessionViewSet can handle a simple retrieve."""
    session = SessionFactory()
    request = rf.get('/')
    user = UserFactory()
    force_authenticate(request, user=user)
    view = SessionViewSet.as_view({'get': 'retrieve'})
    response = view(request, pk=session.id)
    data = response.data
    assert data == {}


@pytest.mark.django_db
def test_get_list_sessionviewset(client):
    """Test integration for SessionViewSet endpoint with client."""
    session = SessionFactory()
    user = UserFactory()
    token = get_token(user=user)
    response = client.get(
        '/sessions',
        HTTP_AUTHORIZATION='Bearer %s' % token,
    )
    assert response.status_code == 200
    result = json.loads(response.content)
    assert result['data'] == [
        {
            'attributes': {
            },
            'type': 'sessions',
            'id': str(session.id),
        },
    ]
    assert result['meta'] == {
        'pagination': {'count': 1, 'page': 1, 'pages': 1},
    }
    assert result['links']['prev'] is None
    assert result['links']['next'] is None
    assert '/sessions?page=1' in result['links']['first']
    assert '/sessions?page=1' in result['links']['last']


@pytest.mark.django_db
def test_videoviewset_handle_request(rf):
    """Test VideoViewSet can handle a simple retrieve."""
    video = VideoFactory()
    request = rf.get('/')
    user = UserFactory()
    force_authenticate(request, user=user)
    view = VideoViewSet.as_view({'get': 'retrieve'})
    response = view(request, pk=video.id)
    data = response.data
    assert data == {}


@pytest.mark.django_db
def test_get_list_videoviewset(client):
    """Test integration for VideoViewSet endpoint with client."""
    video = VideoFactory()
    user = UserFactory()
    token = get_token(user=user)
    response = client.get(
        '/videos',
        HTTP_AUTHORIZATION='Bearer %s' % token,
    )
    assert response.status_code == 200
    result = json.loads(response.content)
    assert result['data'] == [
        {
            'attributes': {
            },
            'type': 'videos',
            'id': str(video.id),
        },
    ]
    assert result['meta'] == {
        'pagination': {'count': 1, 'page': 1, 'pages': 1},
    }
    assert result['links']['prev'] is None
    assert result['links']['next'] is None
    assert '/videos?page=1' in result['links']['first']
    assert '/videos?page=1' in result['links']['last']


@pytest.mark.django_db
def test_videopointviewset_handle_request(rf):
    """Test VideoPointViewSet can handle a simple retrieve."""
    videopoint = VideoPointFactory()
    request = rf.get('/')
    user = UserFactory()
    force_authenticate(request, user=user)
    view = VideoPointViewSet.as_view({'get': 'retrieve'})
    response = view(request, pk=videopoint.id)
    data = response.data
    assert data == {}


@pytest.mark.django_db
def test_get_list_videopointviewset(client):
    """Test integration for VideoPointViewSet endpoint with client."""
    videopoint = VideoPointFactory()
    user = UserFactory()
    token = get_token(user=user)
    response = client.get(
        '/videopoints',
        HTTP_AUTHORIZATION='Bearer %s' % token,
    )
    assert response.status_code == 200
    result = json.loads(response.content)
    assert result['data'] == [
        {
            'attributes': {
            },
            'type': 'videopoints',
            'id': str(videopoint.id),
        },
    ]
    assert result['meta'] == {
        'pagination': {'count': 1, 'page': 1, 'pages': 1},
    }
    assert result['links']['prev'] is None
    assert result['links']['next'] is None
    assert '/videopoints?page=1' in result['links']['first']
    assert '/videopoints?page=1' in result['links']['last']
