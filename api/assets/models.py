"""Models for assets."""

import boto3

from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils.translation import ugettext_lazy as _

User = get_user_model()


class Asset(models.Model):
    """Asset is a usually provided by a user stored somewhere."""

    owner = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='assets_created',
        help_text=_('Owner of this asset'),
    )
    url = models.URLField()
    external = models.BooleanField(
        help_text=_('Is this asset controlled by the company or outside'),
    )
    info = JSONField(
        default=dict,
        help_text=_('info associated with this asset,'
                    'including storage information when relevant'),
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @classmethod
    def get_info(cls, bucket, key):
        """Generate an info dict from a bucket and a key."""
        s3 = boto3.client('s3')
        response = s3.get_object(Bucket=bucket, Key=key)
        return {
            's3': {
                'bucket': bucket,
                'key': key,
            },
            'Content-Type': response['ContentType'],
            'Content-Length': response['ContentLength'],
            'ETag': response['ETag'],
        }
