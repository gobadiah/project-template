"""Assets serializers."""

import re

from django.conf import settings

from rest_framework_json_api import serializers

from .models import Asset


class AssetSerializer(serializers.HyperlinkedModelSerializer):
    """AssetSerializer."""

    def create(self, validated_data):
        """Create an asset from  a url."""
        bucket = settings.BUCKET
        regex = re.compile(r'https://%s.s3.amazonaws.com/([^?]+)$' % bucket)
        match = regex.match(validated_data['url'])
        external = True
        if match:
            key = match[1]
            info = Asset.get_info(bucket=bucket, key=key)
            external = False
            validated_data['info'] = info
        owner = self.context['request'].user
        validated_data['external'] = external
        validated_data['owner'] = owner
        return super(AssetSerializer, self).create(validated_data)

    class Meta(object):
        """AssertSerializer Meta class."""

        model = Asset
        fields = [
            'url',
            'info',
        ]
