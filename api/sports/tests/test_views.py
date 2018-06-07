"""Tests for sports.views."""

import json
from collections import OrderedDict

from core.users.tests.factories import UserFactory

from django.urls import reverse

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
    assert data == {
        'current_stats': None,
        'data': {
            'surface': 'clay',
        },
        'videos': [],
    }


@pytest.mark.django_db
def test_get_list_sessionviewset(client):
    """Test integration for SessionViewSet endpoint with client."""
    session = SessionFactory()
    user = UserFactory()
    token = get_token(user=user)
    response = client.get(
        reverse('session-list'),
        HTTP_AUTHORIZATION='Bearer %s' % token,
    )
    request = response.wsgi_request
    assert response.status_code == 200
    result = json.loads(response.content)
    assert result['data'] == [
        {
            'attributes': {
                'data': {
                    'surface': 'clay',
                },
            },
            'relationships': {
                'current-stats': {
                    'data': None,
                    'links': {
                        'related': 'http://testserver/sessions' +
                        '/%d/current_stats' % session.id,
                    },
                },
                'videos': {
                    'data': [],
                    'links': {
                        'related': request.build_absolute_uri(
                            reverse('session-videos-list', args=[session.id]),
                        ),
                    },
                    'meta': {
                        'count': 0,
                    },
                },
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
    assert data == {
        'asset': OrderedDict([
            ('type', 'assets'),
            ('id', str(video.asset_id)),
        ]),
        'session': OrderedDict([
            ('type', 'sessions'),
            ('id', str(video.session_id)),
        ]),
    }


@pytest.mark.django_db
def test_get_list_videoviewset(client):
    """Test integration for VideoViewSet endpoint with client."""
    video = VideoFactory()
    user = UserFactory()
    token = get_token(user=user)
    response = client.get(
        reverse('video-list'),
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
            'relationships': {
                'asset': {
                    'data': {
                        'id': str(video.asset_id),
                        'type': 'assets',
                    },
                    'links': {
                        'related': 'http://testserver/videos/%d/asset' %
                        video.id,
                    },
                },
                'session': {
                    'data': {
                        'id': str(video.session_id),
                        'type': 'sessions',
                    },
                    'links': {
                        'related': 'http://testserver/videos/%d/session' %
                        video.id,
                    },
                },
            },
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
    assert data == {
        'frame': videopoint.frame,
        'time': '0' + str(videopoint.time),
    }


@pytest.mark.django_db
def test_get_list_videopointviewset(client):
    """Test integration for VideoPointViewSet endpoint with client."""
    videopoint = VideoPointFactory()
    user = UserFactory()
    token = get_token(user=user)
    response = client.get(
        reverse('videopoint-list'),
        HTTP_AUTHORIZATION='Bearer %s' % token,
    )
    assert response.status_code == 200
    result = json.loads(response.content)
    assert result['data'] == [
        {
            'attributes': {
                'frame': videopoint.frame,
                'time': '0' + str(videopoint.time),
            },
            'type': 'video-points',
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
