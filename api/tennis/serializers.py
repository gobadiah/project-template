"""Tennis serializers."""

from jasonpi.utils import resource_related_field

from rest_framework_json_api import serializers

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
        fields = 


class ExchangePlayerSerializer(serializers.HyperlinkedModelSerializer):
    """ExchangePlayerSerializer."""

    

    class Meta(object):
        """ExchangePlayerSerializer Meta class."""

        model = ExchangePlayer
        fields = 


class GameSerializer(serializers.HyperlinkedModelSerializer):
    """GameSerializer."""

    

    class Meta(object):
        """GameSerializer Meta class."""

        model = Game
        fields = 


class GamePlayerSerializer(serializers.HyperlinkedModelSerializer):
    """GamePlayerSerializer."""

    

    class Meta(object):
        """GamePlayerSerializer Meta class."""

        model = GamePlayer
        fields = 


class HitSerializer(serializers.HyperlinkedModelSerializer):
    """HitSerializer."""

    

    class Meta(object):
        """HitSerializer Meta class."""

        model = Hit
        fields = 


class MatchSerializer(serializers.HyperlinkedModelSerializer):
    """MatchSerializer."""

    

    class Meta(object):
        """MatchSerializer Meta class."""

        model = Match
        fields = 


class MatchPlayerSerializer(serializers.HyperlinkedModelSerializer):
    """MatchPlayerSerializer."""

    

    class Meta(object):
        """MatchPlayerSerializer Meta class."""

        model = MatchPlayer
        fields = 


class PlayerSerializer(serializers.HyperlinkedModelSerializer):
    """PlayerSerializer."""

    

    class Meta(object):
        """PlayerSerializer Meta class."""

        model = Player
        fields = 


class SetSerializer(serializers.HyperlinkedModelSerializer):
    """SetSerializer."""

    

    class Meta(object):
        """SetSerializer Meta class."""

        model = Set
        fields = 


class SetPlayerSerializer(serializers.HyperlinkedModelSerializer):
    """SetPlayerSerializer."""

    

    class Meta(object):
        """SetPlayerSerializer Meta class."""

        model = SetPlayer
        fields = 


class TrainingSerializer(serializers.HyperlinkedModelSerializer):
    """TrainingSerializer."""

    

    class Meta(object):
        """TrainingSerializer Meta class."""

        model = Training
        fields = 
