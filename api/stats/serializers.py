"""Stats serializers."""

from rest_framework_json_api import serializers

from .models import Stats


class StatsSerializer(serializers.HyperlinkedModelSerializer):
    """StatsSerializer."""

    class Meta(object):
        """StatsSerializer Meta class."""

        model = Stats
        fields = (
            'data',
        )
