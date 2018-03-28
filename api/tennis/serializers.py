"""Tennis serializers."""

from django.db.models import Q

from jasonpi.utils import resource_related_field

from rest_framework_json_api import serializers

from sports.models import Session
from sports.serializers import SessionSerializer as BaseSessionSerializer

from utils.property import model_property

from .models import \
    Exchange, \
    ExchangePlayer, \
    Game, \
    GamePlayer, \
    Hit, \
    Match, \
    MatchPlayer, \
    Player, \
    Set, \
    SetPlayer, \
    Training


class ExchangeSerializer(serializers.HyperlinkedModelSerializer):
    """ExchangeSerializer."""

    class Meta(object):
        """ExchangeSerializer Meta class."""

        model = Exchange
        fields = []


class ExchangePlayerSerializer(serializers.HyperlinkedModelSerializer):
    """ExchangePlayerSerializer."""

    class Meta(object):
        """ExchangePlayerSerializer Meta class."""

        model = ExchangePlayer
        fields = []


class GameSerializer(serializers.HyperlinkedModelSerializer):
    """GameSerializer."""

    class Meta(object):
        """GameSerializer Meta class."""

        model = Game
        fields = []


class GamePlayerSerializer(serializers.HyperlinkedModelSerializer):
    """GamePlayerSerializer."""

    class Meta(object):
        """GamePlayerSerializer Meta class."""

        model = GamePlayer
        fields = []


class HitSerializer(serializers.HyperlinkedModelSerializer):
    """HitSerializer."""

    class Meta(object):
        """HitSerializer Meta class."""

        model = Hit
        fields = []


class MatchSerializer(serializers.HyperlinkedModelSerializer):
    """MatchSerializer."""

    class Meta(object):
        """MatchSerializer Meta class."""

        model = Match
        fields = []


class MatchPlayerSerializer(serializers.HyperlinkedModelSerializer):
    """MatchPlayerSerializer."""

    class Meta(object):
        """MatchPlayerSerializer Meta class."""

        model = MatchPlayer
        fields = []


class PlayerSerializer(serializers.HyperlinkedModelSerializer):
    """PlayerSerializer."""

    class Meta(object):
        """PlayerSerializer Meta class."""

        model = Player
        fields = []


# Extra Session methods
@model_property(Exchange)
def session_exchanges(self):
    """Extra property added on Session to easily request exchanges.

    Maybe this is should be moved somewhere else, but it's needed in the
    serializer.
    """
    return Exchange.objects.filter(
        Q(training__session=self) |
        Q(game__set__match__session=self),
    )


Session.exchanges = session_exchanges


class SessionSerializer(BaseSessionSerializer):
    """Tennis session serializer."""

    trainings = resource_related_field(
        Training,
        'session',
        'trainings',
        namespace='tennis',
    )

    players = resource_related_field(
        Player,
        'session',
        'players',
        namespace='tennis',
    )

    matches = resource_related_field(
        Match,
        'session',
        'matches',
        namespace='tennis',
    )

    exchanges = resource_related_field(
        Exchange,
        'session',
        'exchanges',
        namespace='tennis',
    )

    included_serializers = {
        'trainings': 'tennis.serializers.TrainingSerializer',
        'players': 'tennis.serializers.PlayerSerializer',
        'matches': 'tennis.serializers.MatchSerializer',
        'exchanges': 'tennis.serializers.ExchangeSerializer',
        **BaseSessionSerializer.included_serializers,
    }

    label = serializers.SerializerMethodField()

    def get_label(self, obj):
        """Serialize session label."""
        return 'Session'

    class Meta(object):
        """SessionSerializer Meta class."""

        model = Session
        fields = (
            'id',
            'date',
            'place',
            'duration',
            'videos',
            'trainings',
            'matches',
            'players',
            'label',
            'exchanges',
        )


class SetSerializer(serializers.HyperlinkedModelSerializer):
    """SetSerializer."""

    class Meta(object):
        """SetSerializer Meta class."""

        model = Set
        fields = []


class SetPlayerSerializer(serializers.HyperlinkedModelSerializer):
    """SetPlayerSerializer."""

    class Meta(object):
        """SetPlayerSerializer Meta class."""

        model = SetPlayer
        fields = []


class TrainingSerializer(serializers.HyperlinkedModelSerializer):
    """TrainingSerializer."""

    class Meta(object):
        """TrainingSerializer Meta class."""

        model = Training
        fields = []
