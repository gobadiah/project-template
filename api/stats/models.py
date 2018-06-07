"""Stats models."""

from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils.translation import ugettext_lazy as _


class Stats(models.Model):
    """Stats model."""

    VERSION = 1
    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE,
        help_text=_('Type of the generic object corresponding to these stats'),
    )
    object_id = models.PositiveIntegerField(
        help_text=_('Id of the generic object corresponding to these stats'),
    )
    content_object = GenericForeignKey('content_type', 'object_id')
    computed_at = models.DateTimeField(
        help_text=_('When were these stats computed'),
    )
    date = models.DateField(
        help_text=_('At what point in time these stats are valid'),
    )
    data = JSONField(
        default=dict,
        help_text=_('The actual stats'),
    )
    version = models.PositiveIntegerField(default=VERSION)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta(object):
        """Stats Meta class."""

        unique_together = (
            ('content_type', 'object_id', 'version', 'date'),
        )
