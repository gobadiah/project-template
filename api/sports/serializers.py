"""Sports serializers."""

from assets.models import Asset

from jasonpi.utils import resource_related_field

from rest_framework_json_api import serializers

from stats.models import Stats
from stats.serializers import StatsSerializer

from .models import \
    Session, \
    Video, \
    VideoPoint


class SessionSerializer(serializers.HyperlinkedModelSerializer):
    """SessionSerializer."""

    videos = resource_related_field(
        Video,
        'session',
        'videos',
    )

    current_stats = resource_related_field(
        Stats,
        'session',
        'current_stats',
        many=False,
    )

    included_serializers = {
        'current_stats': StatsSerializer,
        'videos': 'sports.serializers.VideoSerializer',
    }

    class Meta(object):
        """SessionSerializer Meta class."""

        model = Session
        fields = (
            'videos',
            'current_stats',
        )


class VideoSerializer(serializers.HyperlinkedModelSerializer):
    """VideoSerializer."""

    asset = resource_related_field(
        Asset,
        'video',
        'asset',
        many=False,
    )

    session = resource_related_field(
        Session,
        'video',
        'session',
        many=False,
    )

    included_serializers = {
        'asset': 'assets.serializers.AssetSerializer',
        'session': SessionSerializer,
    }

    class Meta(object):
        """VideoSerializer Meta class."""

        model = Video
        fields = ('asset', 'session')


class VideoPointSerializer(serializers.HyperlinkedModelSerializer):
    """VideoPointSerializer."""

    class Meta(object):
        """VideoPointSerializer Meta class."""

        model = VideoPoint
        fields = ('frame', 'time')
