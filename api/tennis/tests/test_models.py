"""Tests for for tennis.models."""

import pytest

from .factories import \
    ExchangeFactory, \
    GameFactory, \
    HitFactory, \
    MatchFactory, \
    PlayerFactory, \
    SetFactory, \
    TrainingFactory
from ..models import \
    Player, \
    SetPlayer


@pytest.mark.django_db
def test_exchange_model():
    """Test that we can create and save a exchange using a factory."""
    exchange = ExchangeFactory()
    assert exchange.start_at_id is not None
    assert exchange.end_at_id is not None
    assert exchange.game_id is not None
    assert exchange.players.count() == 2
    assert Player.objects.count() == 2
    assert exchange.game.players.count() == 2
    assert exchange.game.set.players.count() == 2
    assert exchange.game.set.match.players.count() == 2
    assert exchange.winner is not None  # Assert winner exists


@pytest.mark.django_db
def test_game_model():
    """Test that we can create and save a game using a factory."""
    game = GameFactory()
    assert game.set_id is not None
    assert game.winner is not None


@pytest.mark.django_db
def test_hit_model():
    """Test that we can create and save a hit using a factory."""
    hit = HitFactory()
    assert hit.exchange_id is not None
    assert hit.hitter_id is not None
    assert hit.video_point_id is not None


@pytest.mark.django_db
def test_match_model():
    """Test that we can create and save a match using a factory."""
    match = MatchFactory()
    assert match.session_id is not None
    assert match.players.count() == 2

    player1 = match.players.order_by('id').first()
    player2 = match.players.order_by('id').last()

    SetFactory(
        match=match,
        player1=player1,
        player2=player2,
    )
    expected = [{}]
    for player in [player1, player2]:
        setplayer = SetPlayer.objects.get(
            set=match.sets.first(),
            player=player,
        )
        expected[0][player.id] = {
            'games_won': setplayer.games_won,
            'is_winner': setplayer.is_winner,
        }
    assert match.score == expected


@pytest.mark.django_db
def test_player_model():
    """Test that we can create and save a  using a factory."""
    player = PlayerFactory()
    assert player.user_id is not None
    assert player.name == player.user.first_name
    assert player.email == player.user.email


@pytest.mark.django_db
def test_set_model():
    """Test that we can create and save a  using a factory."""
    set_ = SetFactory()
    assert set_.match_id is not None
    assert set_.index == 0
    assert set_.players.count() == 2
    assert set_.winner is not None


@pytest.mark.django_db
def test_training_model():
    """Test that we can create and save a  using a factory."""
    training = TrainingFactory()
    assert training.session_id is not None
