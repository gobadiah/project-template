"""Tests for tennis.views."""

import json
from collections import OrderedDict

from core.users.tests.factories import UserFactory

from django.urls import reverse

from jasonpi.auth import get_token

import pytest

from rest_framework.test import force_authenticate

from .factories import \
    ExchangeFactory, \
    ExchangePlayerFactory, \
    GameFactory, \
    GamePlayerFactory, \
    HitFactory, \
    MatchFactory, \
    MatchPlayerFactory, \
    PlayerFactory, \
    SetFactory, \
    SetPlayerFactory, \
    TrainingFactory
from ..views import \
    ExchangePlayerViewSet, \
    ExchangeViewSet, \
    GamePlayerViewSet, \
    GameViewSet, \
    HitViewSet, \
    MatchPlayerViewSet, \
    MatchViewSet, \
    PlayerViewSet, \
    SessionViewSet, \
    SetPlayerViewSet, \
    SetViewSet, \
    TrainingViewSet


@pytest.mark.django_db
def test_exchangeviewset_handle_request(rf):
    """Test ExchangeViewSet can handle a simple retrieve."""
    exchange = ExchangeFactory()
    request = rf.get('/')
    user = UserFactory()
    force_authenticate(request, user=user)
    view = ExchangeViewSet.as_view({'get': 'retrieve'})
    response = view(request, pk=exchange.id)
    data = response.data
    assert data == {}


@pytest.mark.django_db
def test_get_list_exchangeviewset(client):
    """Test integration for ExchangeViewSet endpoint with client."""
    exchange = ExchangeFactory()
    user = UserFactory()
    token = get_token(user=user)
    response = client.get(
        reverse('tennis:exchange-list'),
        HTTP_AUTHORIZATION='Bearer %s' % token,
    )
    assert response.status_code == 200
    result = json.loads(response.content)
    assert result['data'] == [
        {
            'attributes': {
            },
            'type': 'exchanges',
            'id': str(exchange.id),
        },
    ]
    assert result['meta'] == {
        'pagination': {'count': 1, 'page': 1, 'pages': 1},
    }
    assert result['links']['prev'] is None
    assert result['links']['next'] is None
    assert '/exchanges?page=1' in result['links']['first']
    assert '/exchanges?page=1' in result['links']['last']


@pytest.mark.django_db
def test_exchangeplayerviewset_handle_request(rf):
    """Test ExchangePlayerViewSet can handle a simple retrieve."""
    exchangeplayer = ExchangePlayerFactory()
    request = rf.get('/')
    user = UserFactory()
    force_authenticate(request, user=user)
    view = ExchangePlayerViewSet.as_view({'get': 'retrieve'})
    response = view(request, pk=exchangeplayer.id)
    data = response.data
    assert data == {}


@pytest.mark.django_db
def test_get_list_exchangeplayerviewset(client):
    """Test integration for ExchangePlayerViewSet endpoint with client."""
    exchangeplayer = ExchangePlayerFactory()
    user = UserFactory()
    token = get_token(user=user)
    response = client.get(
        reverse('tennis:exchangeplayer-list'),
        HTTP_AUTHORIZATION='Bearer %s' % token,
    )
    assert response.status_code == 200
    result = json.loads(response.content)
    assert {
        'attributes': {
        },
        'type': 'exchange-players',
        'id': str(exchangeplayer.id),
    } in result['data']
    assert result['meta'] == {
        'pagination': {'count': 2, 'page': 1, 'pages': 1},
    }
    assert result['links']['prev'] is None
    assert result['links']['next'] is None
    assert '/exchangeplayers?page=1' in result['links']['first']
    assert '/exchangeplayers?page=1' in result['links']['last']


@pytest.mark.django_db
def test_gameviewset_handle_request(rf):
    """Test GameViewSet can handle a simple retrieve."""
    game = GameFactory()
    request = rf.get('/')
    user = UserFactory()
    force_authenticate(request, user=user)
    view = GameViewSet.as_view({'get': 'retrieve'})
    response = view(request, pk=game.id)
    data = response.data
    assert data == {}


@pytest.mark.django_db
def test_get_list_gameviewset(client):
    """Test integration for GameViewSet endpoint with client."""
    game = GameFactory()
    user = UserFactory()
    token = get_token(user=user)
    response = client.get(
        reverse('tennis:game-list'),
        HTTP_AUTHORIZATION='Bearer %s' % token,
    )
    assert response.status_code == 200
    result = json.loads(response.content)
    assert result['data'] == [
        {
            'attributes': {
            },
            'type': 'games',
            'id': str(game.id),
        },
    ]
    assert result['meta'] == {
        'pagination': {'count': 1, 'page': 1, 'pages': 1},
    }
    assert result['links']['prev'] is None
    assert result['links']['next'] is None
    assert '/games?page=1' in result['links']['first']
    assert '/games?page=1' in result['links']['last']


@pytest.mark.django_db
def test_gameplayerviewset_handle_request(rf):
    """Test GamePlayerViewSet can handle a simple retrieve."""
    gameplayer = GamePlayerFactory()
    request = rf.get('/')
    user = UserFactory()
    force_authenticate(request, user=user)
    view = GamePlayerViewSet.as_view({'get': 'retrieve'})
    response = view(request, pk=gameplayer.id)
    data = response.data
    assert data == {}


@pytest.mark.django_db
def test_get_list_gameplayerviewset(client):
    """Test integration for GamePlayerViewSet endpoint with client."""
    gameplayer = GamePlayerFactory()
    user = UserFactory()
    token = get_token(user=user)
    response = client.get(
        reverse('tennis:gameplayer-list'),
        HTTP_AUTHORIZATION='Bearer %s' % token,
    )
    assert response.status_code == 200
    result = json.loads(response.content)
    assert {
        'attributes': {
        },
        'type': 'game-players',
        'id': str(gameplayer.id),
    } in result['data']
    assert result['meta'] == {
        'pagination': {'count': 2, 'page': 1, 'pages': 1},
    }
    assert result['links']['prev'] is None
    assert result['links']['next'] is None
    assert '/gameplayers?page=1' in result['links']['first']
    assert '/gameplayers?page=1' in result['links']['last']


@pytest.mark.django_db
def test_hitviewset_handle_request(rf):
    """Test HitViewSet can handle a simple retrieve."""
    hit = HitFactory()
    request = rf.get('/')
    user = UserFactory()
    force_authenticate(request, user=user)
    view = HitViewSet.as_view({'get': 'retrieve'})
    response = view(request, pk=hit.id)
    data = response.data
    assert data == {}


@pytest.mark.django_db
def test_get_list_hitviewset(client):
    """Test integration for HitViewSet endpoint with client."""
    hit = HitFactory()
    user = UserFactory()
    token = get_token(user=user)
    response = client.get(
        reverse('tennis:hit-list'),
        HTTP_AUTHORIZATION='Bearer %s' % token,
    )
    assert response.status_code == 200
    result = json.loads(response.content)
    assert result['data'] == [
        {
            'attributes': {
            },
            'type': 'hits',
            'id': str(hit.id),
        },
    ]
    assert result['meta'] == {
        'pagination': {'count': 1, 'page': 1, 'pages': 1},
    }
    assert result['links']['prev'] is None
    assert result['links']['next'] is None
    assert '/hits?page=1' in result['links']['first']
    assert '/hits?page=1' in result['links']['last']


@pytest.mark.django_db
def test_matchviewset_handle_request(rf):
    """Test MatchViewSet can handle a simple retrieve."""
    match = MatchFactory()
    request = rf.get('/')
    user = UserFactory()
    force_authenticate(request, user=user)
    view = MatchViewSet.as_view({'get': 'retrieve'})
    response = view(request, pk=match.id)
    data = response.data
    assert data == {}


@pytest.mark.django_db
def test_get_list_matchviewset(client):
    """Test integration for MatchViewSet endpoint with client."""
    match = MatchFactory()
    user = UserFactory()
    token = get_token(user=user)
    response = client.get(
        reverse('tennis:match-list'),
        HTTP_AUTHORIZATION='Bearer %s' % token,
    )
    assert response.status_code == 200
    result = json.loads(response.content)
    assert result['data'] == [
        {
            'attributes': {
            },
            'type': 'matches',
            'id': str(match.id),
        },
    ]
    assert result['meta'] == {
        'pagination': {'count': 1, 'page': 1, 'pages': 1},
    }
    assert result['links']['prev'] is None
    assert result['links']['next'] is None
    assert '/matches?page=1' in result['links']['first']
    assert '/matches?page=1' in result['links']['last']


@pytest.mark.django_db
def test_matchplayerviewset_handle_request(rf):
    """Test MatchPlayerViewSet can handle a simple retrieve."""
    matchplayer = MatchPlayerFactory()
    request = rf.get('/')
    user = UserFactory()
    force_authenticate(request, user=user)
    view = MatchPlayerViewSet.as_view({'get': 'retrieve'})
    response = view(request, pk=matchplayer.id)
    data = response.data
    assert data == {}


@pytest.mark.django_db
def test_get_list_matchplayerviewset(client):
    """Test integration for MatchPlayerViewSet endpoint with client."""
    matchplayer = MatchPlayerFactory()
    user = UserFactory()
    token = get_token(user=user)
    response = client.get(
        reverse('tennis:matchplayer-list'),
        HTTP_AUTHORIZATION='Bearer %s' % token,
    )
    assert response.status_code == 200
    result = json.loads(response.content)
    assert {
        'attributes': {
        },
        'type': 'match-players',
        'id': str(matchplayer.id),
    } in result['data']
    assert result['meta'] == {
        'pagination': {'count': 2, 'page': 1, 'pages': 1},
    }
    assert result['links']['prev'] is None
    assert result['links']['next'] is None
    assert '/matchplayers?page=1' in result['links']['first']
    assert '/matchplayers?page=1' in result['links']['last']


@pytest.mark.django_db
def test_playerviewset_handle_request(rf):
    """Test PlayerViewSet can handle a simple retrieve."""
    player = PlayerFactory()
    request = rf.get('/')
    user = UserFactory()
    force_authenticate(request, user=user)
    view = PlayerViewSet.as_view({'get': 'retrieve'})
    response = view(request, pk=player.id)
    data = response.data
    assert data == {}


@pytest.mark.django_db
def test_get_list_playerviewset(client):
    """Test integration for PlayerViewSet endpoint with client."""
    player = PlayerFactory()
    user = UserFactory()
    token = get_token(user=user)
    response = client.get(
        reverse('tennis:player-list'),
        HTTP_AUTHORIZATION='Bearer %s' % token,
    )
    assert response.status_code == 200
    result = json.loads(response.content)
    assert result['data'] == [
        {
            'attributes': {
            },
            'type': 'players',
            'id': str(player.id),
        },
    ]
    assert result['meta'] == {
        'pagination': {'count': 1, 'page': 1, 'pages': 1},
    }
    assert result['links']['prev'] is None
    assert result['links']['next'] is None
    assert '/players?page=1' in result['links']['first']
    assert '/players?page=1' in result['links']['last']


@pytest.mark.django_db
def test_sessionviewset_handle_request(rf):
    """Test SessionViewSet can handle a simple retrieve."""
    match = MatchFactory()
    session = match.session
    request = rf.get('/')
    user = UserFactory()
    force_authenticate(request, user=user)
    view = SessionViewSet.as_view({'get': 'retrieve'})
    response = view(request, pk=session.id)
    data = response.data
    assert data == {
        'date': session.date.strftime('%Y-%m-%d'),
        'exchanges': [],
        'id': session.id,
        'duration': '06:00:00',
        'label': 'Session',
        'place': session.place,
        'players': [],
        'trainings': [],
        'videos': [OrderedDict([
            ('type', 'videos'),
            ('id', '%d' % session.videos.first().id),
        ])],
        'matches': [OrderedDict([
            ('type', 'matches'),
            ('id', '%d' % match.id),
        ])],
    }


@pytest.mark.django_db
def test_get_list_sessionviewset(client):
    """Test integration for SessionViewSet endpoint with client."""
    match = MatchFactory()
    session = match.session
    user = UserFactory()
    token = get_token(user=user)
    response = client.get(
        reverse('tennis:session-list'),
        HTTP_AUTHORIZATION='Bearer %s' % token,
    )
    request = response.wsgi_request
    assert response.status_code == 200
    result = json.loads(response.content)
    assert result['data'] == [
        {
            'attributes': {
                'date': session.date.strftime('%Y-%m-%d'),
                'place': session.place,
                'label': 'Session',
                'duration': '06:00:00',
            },
            'type': 'sessions',
            'id': str(session.id),
            'relationships': {
                'exchanges': {
                    'data': [],
                    'links': {
                        'related': request.build_absolute_uri(
                            reverse(
                                'tennis:session-exchanges-list',
                                args=[session.id],
                            ),
                        ),
                    },
                    'meta': {'count': 0},
                },
                'matches': {
                    'data': [{'type': 'matches', 'id': '%d' % match.id}],
                    'links': {
                        'related': request.build_absolute_uri(
                            reverse(
                                'tennis:session-matches-list',
                                args=[session.id],
                            ),
                        ),
                    },
                    'meta': {'count': 1},
                },
                'players': {
                    'data': [],
                    'links': {
                        'related': request.build_absolute_uri(
                            reverse(
                                'tennis:session-players-list',
                                args=[session.id],
                            ),
                        ),
                    },
                    'meta': {'count': 0},
                },
                'trainings': {
                    'data': [],
                    'links': {
                        'related': request.build_absolute_uri(
                            reverse(
                                'tennis:session-trainings-list',
                                args=[session.id],
                            ),
                        ),
                    },
                    'meta': {'count': 0},
                },
                'videos': {
                    'data': [{
                        'type': 'videos',
                        'id': '%d' % session.videos.first().id,
                    }],
                    'links': {
                        'related': request.build_absolute_uri(
                            reverse(
                                'session-videos-list',
                                args=[session.id],
                            ),
                        ),
                    },
                    'meta': {'count': 1},
                },
            },
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
def test_setviewset_handle_request(rf):
    """Test SetViewSet can handle a simple retrieve."""
    set_ = SetFactory()
    request = rf.get('/')
    user = UserFactory()
    force_authenticate(request, user=user)
    view = SetViewSet.as_view({'get': 'retrieve'})
    response = view(request, pk=set_.id)
    data = response.data
    assert data == {}


@pytest.mark.django_db
def test_get_list_setviewset(client):
    """Test integration for SetViewSet endpoint with client."""
    set = SetFactory()
    user = UserFactory()
    token = get_token(user=user)
    response = client.get(
        reverse('tennis:set-list'),
        HTTP_AUTHORIZATION='Bearer %s' % token,
    )
    assert response.status_code == 200
    result = json.loads(response.content)
    assert result['data'] == [
        {
            'attributes': {
            },
            'type': 'sets',
            'id': str(set.id),
        },
    ]
    assert result['meta'] == {
        'pagination': {'count': 1, 'page': 1, 'pages': 1},
    }
    assert result['links']['prev'] is None
    assert result['links']['next'] is None
    assert '/sets?page=1' in result['links']['first']
    assert '/sets?page=1' in result['links']['last']


@pytest.mark.django_db
def test_setplayerviewset_handle_request(rf):
    """Test SetPlayerViewSet can handle a simple retrieve."""
    setplayer = SetPlayerFactory()
    request = rf.get('/')
    user = UserFactory()
    force_authenticate(request, user=user)
    view = SetPlayerViewSet.as_view({'get': 'retrieve'})
    response = view(request, pk=setplayer.id)
    data = response.data
    assert data == {}


@pytest.mark.django_db
def test_get_list_setplayerviewset(client):
    """Test integration for SetPlayerViewSet endpoint with client."""
    setplayer = SetPlayerFactory()
    user = UserFactory()
    token = get_token(user=user)
    response = client.get(
        reverse('tennis:setplayer-list'),
        HTTP_AUTHORIZATION='Bearer %s' % token,
    )
    assert response.status_code == 200
    result = json.loads(response.content)
    assert {
        'attributes': {
        },
        'type': 'set-players',
        'id': str(setplayer.id),
    } in result['data']
    assert result['meta'] == {
        'pagination': {'count': 2, 'page': 1, 'pages': 1},
    }
    assert result['links']['prev'] is None
    assert result['links']['next'] is None
    assert '/setplayers?page=1' in result['links']['first']
    assert '/setplayers?page=1' in result['links']['last']


@pytest.mark.django_db
def test_trainingviewset_handle_request(rf):
    """Test TrainingViewSet can handle a simple retrieve."""
    training = TrainingFactory()
    request = rf.get('/')
    user = UserFactory()
    force_authenticate(request, user=user)
    view = TrainingViewSet.as_view({'get': 'retrieve'})
    response = view(request, pk=training.id)
    data = response.data
    assert data == {}


@pytest.mark.django_db
def test_get_list_trainingviewset(client):
    """Test integration for TrainingViewSet endpoint with client."""
    training = TrainingFactory()
    user = UserFactory()
    token = get_token(user=user)
    response = client.get(
        reverse('tennis:training-list'),
        HTTP_AUTHORIZATION='Bearer %s' % token,
    )
    assert response.status_code == 200
    result = json.loads(response.content)
    assert result['data'] == [
        {
            'attributes': {
            },
            'type': 'trainings',
            'id': str(training.id),
        },
    ]
    assert result['meta'] == {
        'pagination': {'count': 1, 'page': 1, 'pages': 1},
    }
    assert result['links']['prev'] is None
    assert result['links']['next'] is None
    assert '/trainings?page=1' in result['links']['first']
    assert '/trainings?page=1' in result['links']['last']
