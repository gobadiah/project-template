"""Models for assets."""

from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils.translation import ugettext_lazy as _

User = get_user_model()


class Asset(models.Model):
    """Asset is a usually provided by a user stored somewhere."""

    creator = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='assets_created',
        help_text=_('Creator of this asset'),
    )
    url = models.URLField()
    external = models.BooleanField(
        help_text=_('Is this asset stored inside the company or outside'),
    )
    content_type = models.CharField(
        max_length=255,
        help_text=_('Asset content-type'),
    )
    meta = JSONField(
        default=dict,
        help_text=_('Meta data associated with this asset'),
    )
