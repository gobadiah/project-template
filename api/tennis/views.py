"""Tennis views."""

from django.db.models import Q

from rest_framework import viewsets

from rest_framework_json_api.views import RelationshipView

from sports.models import \
    Session, \
    Video

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
from .serializers import \
    ExchangePlayerSerializer, \
    ExchangeSerializer, \
    GamePlayerSerializer, \
    GameSerializer, \
    HitSerializer, \
    MatchPlayerSerializer, \
    MatchSerializer, \
    PlayerSerializer, \
    SessionSerializer, \
    SetPlayerSerializer, \
    SetSerializer, \
    TrainingSerializer, \
    VideoSerializer


class ExchangeViewSet(viewsets.ModelViewSet):
    """ExchangeViewSet."""

    queryset = Exchange.objects.order_by('id')
    serializer_class = ExchangeSerializer


class ExchangeRelationshipView(RelationshipView):
    """Exchange relationship view."""

    queryset = Exchange.objects.order_by('id')


class ExchangePlayerViewSet(viewsets.ModelViewSet):
    """ExchangePlayerViewSet."""

    queryset = ExchangePlayer.objects.order_by('id')
    serializer_class = ExchangePlayerSerializer


class ExchangePlayerRelationshipView(RelationshipView):
    """ExchangePlayer relationship view."""

    queryset = ExchangePlayer.objects.order_by('id')


class GameViewSet(viewsets.ModelViewSet):
    """GameViewSet."""

    queryset = Game.objects.order_by('id')
    serializer_class = GameSerializer


class GameRelationshipView(RelationshipView):
    """Game relationship view."""

    queryset = Game.objects.order_by('id')


class GamePlayerViewSet(viewsets.ModelViewSet):
    """GamePlayerViewSet."""

    queryset = GamePlayer.objects.order_by('id')
    serializer_class = GamePlayerSerializer


class GamePlayerRelationshipView(RelationshipView):
    """GamePlayer relationship view."""

    queryset = GamePlayer.objects.order_by('id')


class HitViewSet(viewsets.ModelViewSet):
    """HitViewSet."""

    queryset = Hit.objects.order_by('id')
    serializer_class = HitSerializer


class HitRelationshipView(RelationshipView):
    """Hit relationship view."""

    queryset = Hit.objects.order_by('id')


class MatchViewSet(viewsets.ModelViewSet):
    """MatchViewSet."""

    queryset = Match.objects.order_by('id')
    serializer_class = MatchSerializer


class MatchRelationshipView(RelationshipView):
    """Match relationship view."""

    queryset = Match.objects.order_by('id')


class MatchPlayerViewSet(viewsets.ModelViewSet):
    """MatchPlayerViewSet."""

    queryset = MatchPlayer.objects.order_by('id')
    serializer_class = MatchPlayerSerializer


class MatchPlayerRelationshipView(RelationshipView):
    """MatchPlayer relationship view."""

    queryset = MatchPlayer.objects.order_by('id')


class PlayerViewSet(viewsets.ModelViewSet):
    """PlayerViewSet."""

    queryset = Player.objects.order_by('id')
    serializer_class = PlayerSerializer


class PlayerRelationshipView(RelationshipView):
    """Player relationship view."""

    queryset = Player.objects.order_by('id')


class SessionViewSet(viewsets.ModelViewSet):
    """SessionViewSet."""

    queryset = Session.objects.filter(
        Q(trainings__isnull=False) |
        Q(matches__isnull=False),
    ).order_by('date')
    serializer_class = SessionSerializer


class SessionRelationshipView(RelationshipView):
    """Session relationship view."""

    queryset = Session.objects.order_by('id')


class SetViewSet(viewsets.ModelViewSet):
    """SetViewSet."""

    queryset = Set.objects.order_by('id')
    serializer_class = SetSerializer


class SetRelationshipView(RelationshipView):
    """Set relationship view."""

    queryset = Set.objects.order_by('id')


class SetPlayerViewSet(viewsets.ModelViewSet):
    """SetPlayerViewSet."""

    queryset = SetPlayer.objects.order_by('id')
    serializer_class = SetPlayerSerializer


class SetPlayerRelationshipView(RelationshipView):
    """SetPlayer relationship view."""

    queryset = SetPlayer.objects.order_by('id')


class TrainingViewSet(viewsets.ModelViewSet):
    """TrainingViewSet."""

    queryset = Training.objects.order_by('id')
    serializer_class = TrainingSerializer


class TrainingRelationshipView(RelationshipView):
    """Training relationship view."""

    queryset = Training.objects.order_by('id')


class VideoViewSet(viewsets.ModelViewSet):
    """Tennis VideoViewSet."""

    queryset = Video.objects.filter(
        Q(session__trainings__isnull=False) |
        Q(session__matches__isnull=False),
    ).order_by('date')
    serializer_class = VideoSerializer


class VideoRelationshipView(RelationshipView):
    """Video relationship view."""

    queryset = Video.objects.order_by('id')
