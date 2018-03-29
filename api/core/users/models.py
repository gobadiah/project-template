"""Core User model."""

from django.db import models
from django.utils.translation import ugettext_lazy as _

from jasonpi.base import BaseUser


class User(BaseUser):
    """Main User class."""

    LEFT_HANDED = 'left_handed'
    RIGHT_HANDED = 'right_handed'
    DOMINANT_HAND_CHOICES = (
        (LEFT_HANDED, _('left-handed')),
        (RIGHT_HANDED, _('right-handed')),
    )
    first_name = models.CharField(_('First name'), max_length=30)
    last_name = models.CharField(_('Last name'), max_length=150)
    birthday = models.DateField(_('Birthday'))
    gender = models.CharField(
        _('Gender'),
        max_length=255,
        null=True,
        blank=True,
    )
    ranking = models.CharField(
        _('Ranking'),
        max_length=255,
        null=True,
        blank=True,
    )
    club = models.CharField(
        _('Tennis club'),
        max_length=255,
        null=True,
        blank=True,
    )
    dominant_hand = models.CharField(
        _('Dominant hand'),
        choices=DOMINANT_HAND_CHOICES,
        default=RIGHT_HANDED,
        max_length=255,
        null=True,
        blank=True,
    )
    picture = models.ForeignKey(
        'assets.Asset',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
