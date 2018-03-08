"""Assets serializers."""

from rest_framework_json_api import serializers

from .models import Asset


class AssetSerializer(serializers.HyperlinkedModelSerializer):
    """AssetSerializer."""

    class Meta(object):
        """AssertSerializer Meta class."""

        model = Asset
        fields = [
            'url',
            'info',
        ]
