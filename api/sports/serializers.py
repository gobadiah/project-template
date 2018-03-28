"""Sports serializers."""

from jasonpi.utils import resource_related_field

from rest_framework_json_api import serializers

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

    included_serializers = {
        'videos': 'sports.serializers.VideoSerializer',
    }

    class Meta(object):
        """SessionSerializer Meta class."""

        model = Session
        fields = ['videos']


class VideoSerializer(serializers.HyperlinkedModelSerializer):
    """VideoSerializer."""

    class Meta(object):
        """VideoSerializer Meta class."""

        model = Video
        fields = []


class VideoPointSerializer(serializers.HyperlinkedModelSerializer):
    """VideoPointSerializer."""

    class Meta(object):
        """VideoPointSerializer Meta class."""

        model = VideoPoint
        fields = []
