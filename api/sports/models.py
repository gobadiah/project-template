"""Sports models."""

from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils.translation import ugettext_lazy as _

from stats.models import Stats

from utils.property import model_property

User = get_user_model()


class Session(models.Model):
    """A Sporting session."""

    owner = models.ForeignKey(
        User,
        related_name='sessions',
        on_delete=models.CASCADE,
        help_text=_('Owner of the sporting session'),
    )
    date = models.DateField(help_text=_('Date of the session'))
    place = models.CharField(
        max_length=1025,
        help_text=_('Place where the session took place'),
    )
    duration = models.DurationField(help_text=_('Session\'s duration'))
    data = JSONField(
        default=dict,
        help_text=_('Additionnal data regarding this session'),
    )

    @model_property(Stats)
    def current_stats(self):
        """Return the current statistics for this object."""
        return Stats.objects.filter(
            content_type=ContentType.objects.get_for_model(Session),
            object_id=self.id,
        ).order_by('-version', '-date').first()

    def serializable_value(self, field_name):
        """Serialize correctly model_properties.

        without it the serialization is str(field) which is not correct.
        """
        if field_name == 'current_stats':
            return self.current_stats.pk
        return super(User, self).serializable_value(field_name)


class Video(models.Model):
    """A continuous recording of part of a sporting session.

    It should be map to a unique file stored somewhere.
    """

    session = models.ForeignKey(
        Session,
        related_name='videos',
        on_delete=models.PROTECT,
        help_text=_('Session associated with this video'),
    )
    asset = models.ForeignKey(
        'assets.Asset',
        related_name='videos',
        on_delete=models.PROTECT,
        help_text=_('Video asset'),
    )
    start_date = models.DateTimeField(
        null=True,
        blank=True,
        help_text=('At what time of the day the recording started'),
    )
    index = models.IntegerField(
        default=0,
        help_text=('If there are multiple videos for one session, '
                   'index represents the time-related order. i.e. video with '
                   'index 0 was shot before video with index 1'),
    )


class VideoPoint(models.Model):
    """VideoPoint represents a specific moment in a video."""

    video = models.ForeignKey(
        Video,
        related_name='videos',
        on_delete=models.CASCADE,
        help_text=_('Video associated with this point'),
    )
    frame = models.IntegerField(help_text=_('Frame number for this point'))
    time = models.DurationField(help_text=_('Time of this point in the video'))

    def __lt__(self, other):
        """Less than method for ordering VideoPoint."""
        return self.video.index < other.video.index or (
            self.video.index == other.video.index and
            self.frame < other.frame
        )

    class Meta(object):
        """Meta class for VideoPoint."""

        unique_together = ('video', 'frame', 'time')
