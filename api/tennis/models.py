"""Tennis models."""

import collections

from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils.translation import ugettext_lazy as _

User = get_user_model()


class Exchange(models.Model):
    """A Tennis exchange."""

    training = models.ForeignKey(
        'tennis.Training',
        related_name='exchanges',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        help_text=_('Training associated with this exchange'),
    )
    game = models.ForeignKey(
        'tennis.Game',
        related_name='exchanges',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        help_text=_('Game associated with this exchange'),
    )
    players = models.ManyToManyField(
        'tennis.Player',
        through='ExchangePlayer',
        related_name='exchanges',
        help_text=_('Players involved in this exchange'),
    )
    start_at = models.ForeignKey(
        'sports.VideoPoint',
        related_name='start_point_for_exchanges',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        help_text=_('Starting point for this exchange'),
    )
    end_at = models.ForeignKey(
        'sports.VideoPoint',
        related_name='end_point_for_exchanges',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        help_text=_('Ending point for this exchange'),
    )
    data = JSONField(
        default=dict,
        help_text=_('Extra data associated with this exchange'),
    )

    @property
    def winner(self):
        """Winning player in this exchange."""
        return ExchangePlayer.objects.get(
            tennis_set=self,
            is_winner=True,
        ).player


class ExchangePlayer(models.Model):
    """Many-to-Many through model between Exchange and Player."""

    SIDES = (
        ('right', _('RIGHT')),
        ('left', _('LEFT')),
    )
    exchange = models.ForeignKey(
        'tennis.Exchange',
        on_delete=models.CASCADE,
        help_text=_('Corresponding exchange'),
    )
    player = models.ForeignKey(
        'tennis.Player',
        on_delete=models.CASCADE,
        help_text=_('Corresponding player'),
    )
    is_winner = models.BooleanField(
        help_text=_('Has the player won the exchange'),
    )
    side = models.CharField(
        choices=SIDES,
        max_length=6,
        help_text=_('Which side this player was on'),
    )


class Game(models.Model):
    """A Tennis game."""

    set = models.ForeignKey(
        'tennis.Set',
        related_name='games',
        on_delete=models.CASCADE,
        help_text=_('The set this game belongs to'),
    )
    start_at = models.ForeignKey(
        'sports.VideoPoint',
        related_name='start_point_for_games',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        help_text=_('Starting point for this game'),
    )
    end_at = models.ForeignKey(
        'sports.VideoPoint',
        related_name='end_point_for_games',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        help_text=_('Ending point for this game'),
    )
    index = models.IntegerField(
        help_text=_('Index of this game in the set'),
    )
    server = models.ForeignKey(
        'tennis.Player',
        on_delete=models.CASCADE,
        help_text=_('Player serving for this game'),
    )
    data = JSONField(
        default=dict,
        help_text=_('Extra data associated with this game'),
    )
    players = models.ManyToManyField(
        'tennis.Player',
        through='GamePlayer',
        related_name='games',
        help_text=_('Players involved in this game'),
    )

    @property
    def winner(self):
        """Winning player in this game."""
        return GamePlayer.objects.get(tennis_set=self, is_winner=True).player


class GamePlayer(models.Model):
    """Many-to-Many through model between Game and Player."""

    SIDES = (
        ('right', _('RIGHT')),
        ('left', _('LEFT')),
    )
    game = models.ForeignKey(
        'tennis.Game',
        on_delete=models.CASCADE,
        help_text=_('Corresponding game'),
    )
    player = models.ForeignKey(
        'tennis.Player',
        on_delete=models.CASCADE,
        help_text=_('Corresponding player'),
    )
    is_winner = models.BooleanField(
        help_text=_('Has the player won the game'),
    )
    side = models.CharField(
        choices=SIDES,
        max_length=6,
        help_text=_('?'),
    )
    exchanges_won = models.IntegerField(
        help_text=_('Number of exchanges won by this player in this game'),
    )


class Hit(models.Model):
    """A player hitting the ball."""

    exchange = models.ForeignKey(
        'tennis.Exchange',
        related_name='hits',
        on_delete=models.CASCADE,
        help_text=_('Exchange associated with this hit'),
    )
    video_point = models.ForeignKey(
        'sports.VideoPoint',
        on_delete=models.CASCADE,
        help_text=_('Point in time when the hit occurred'),
    )
    hitter = models.ForeignKey(
        'tennis.Player',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        help_text=_('Player hitting the ball'),
    )
    data = JSONField(
        default=dict,
        help_text=_('Extra data associated with this hit'),
    )


class Match(models.Model):
    """A Tennis match."""

    session = models.ForeignKey(
        'sports.Session',
        related_name='matches',
        on_delete=models.CASCADE,
        help_text=_('The sport session where the match took place'),
    )
    start_at = models.ForeignKey(
        'sports.VideoPoint',
        related_name='start_point_for_matches',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        help_text=_('Starting point for this match'),
    )
    end_at = models.ForeignKey(
        'sports.VideoPoint',
        related_name='end_point_for_matches',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        help_text=_('Ending point for this match'),
    )
    players = models.ManyToManyField(
        'tennis.Player',
        through='MatchPlayer',
        related_name='matches',
        help_text=_('Players involved in this match'),
    )

    @property
    def score(self):
        """Score for this match."""
        return list(map(
            lambda tennis_set: collections.OrderedDict(map(
                lambda setplayer: (setplayer.player_id, {
                    'games_won': setplayer.games_won,
                    'is_winner': setplayer.is_winner,
                }),
                tennis_set.setplayer_set.order_by('player_id'),
            )),
            self.sets.order_by('index'),
        ))


class MatchPlayer(models.Model):
    """Many-to-Many through model between Match and Player."""

    match = models.ForeignKey(
        'tennis.Match',
        on_delete=models.CASCADE,
        help_text=_('Corresponding match'),
    )
    player = models.ForeignKey(
        'tennis.Player',
        on_delete=models.CASCADE,
        help_text=_('Corresponding player'),
    )
    is_winner = models.BooleanField(
        help_text=_('Has the player won the match'),
    )
    sets_won = models.IntegerField(
        help_text=_('Number of sets won by this player in this match'),
    )


class Player(models.Model):
    """Player in a tennis session."""

    user = models.ForeignKey(
        User,
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        help_text=_('User associated with this player if registered'),
    )
    name = models.CharField(
        max_length=1025,
        help_text=_('Name of the player'),
    )
    email = models.EmailField(
        unique=True,
        blank=True,
        null=True,
        help_text=_('Email of the player'),
    )
    data = JSONField(
        default=dict,
        help_text=_('Extra data associated with this player'),
    )


class Set(models.Model):  # Noqa N801 (Capwords convention)
    """A Tennis set."""

    match = models.ForeignKey(
        'tennis.Match',
        related_name='sets',
        on_delete=models.CASCADE,
        help_text=_('Match associated with this set'),
    )
    start_at = models.ForeignKey(
        'sports.VideoPoint',
        related_name='start_point_for_sets',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        help_text=_('Starting point for this set'),
    )
    end_at = models.ForeignKey(
        'sports.VideoPoint',
        related_name='end_point_for_sets',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        help_text=_('Ending point for this set'),
    )
    index = models.IntegerField(
        help_text=_('Index of this set in the match'),
    )
    data = JSONField(
        default=dict,
        help_text=_('Extra data associated with this set'),
    )
    players = models.ManyToManyField(
        'tennis.Player',
        through='SetPlayer',
        related_name='sets',
        help_text=_('Players involved in this set'),
    )

    @property
    def winner(self):
        """Winning player in this set."""
        return SetPlayer.objects.get(tennis_set=self, is_winner=True).player


class SetPlayer(models.Model):
    """Many-to-Many through model between Match and Player."""

    tennis_set = models.ForeignKey(
        'tennis.Set',
        on_delete=models.CASCADE,
        help_text=_('Corresponding set'),
    )
    player = models.ForeignKey(
        'tennis.Player',
        on_delete=models.CASCADE,
        help_text=_('Corresponding player'),
    )
    is_winner = models.BooleanField(
        help_text=_('Has the player won the set'),
    )
    games_won = models.IntegerField(
        help_text=_('Number of games won by this player in this set'),
    )


class Training(models.Model):
    """A Tennis training session."""

    session = models.ForeignKey(
        'sports.Session',
        related_name='trainings',
        on_delete=models.CASCADE,
        help_text=_('The sport session where the training took place'),
    )
    start_at = models.ForeignKey(
        'sports.VideoPoint',
        related_name='start_point_for_trainings',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        help_text=_('Starting point for this training session'),
    )
    end_at = models.ForeignKey(
        'sports.VideoPoint',
        related_name='end_point_for_trainings',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        help_text=_('Ending point for this training session'),
    )
