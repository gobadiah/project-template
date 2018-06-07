"""Core User model."""

from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.utils.translation import ugettext_lazy as _

from jasonpi.base import BaseUser

from stats.models import Stats

from utils.property import model_property


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

    @model_property(Stats)
    def current_stats(self):
        """Return the current statistics for this object."""
        return Stats.objects.filter(
            content_type=ContentType.objects.get_for_model(User),
            object_id=self.id,
        ).order_by('-version', '-date').first()

    def serializable_value(self, field_name):
        """Serialize correctly model_properties.

        without it the serialization is str(field) which is not correct.
        """
        if field_name == 'current_stats':
            return self.current_stats.pk
        return super(User, self).serializable_value(field_name)
