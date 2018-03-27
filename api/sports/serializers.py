"""Sports serializers."""

from rest_framework_json_api import serializers

from .models import \
    Session, \
    Video, \
    VideoPoint


class SessionSerializer(serializers.HyperlinkedModelSerializer):
    """SessionSerializer."""

    class Meta(object):
        """SessionSerializer Meta class."""

        model = Session
        fields = ()


class VideoSerializer(serializers.HyperlinkedModelSerializer):
    """VideoSerializer."""

    class Meta(object):
        """VideoSerializer Meta class."""

        model = Video
        fields = ()


class VideoPointSerializer(serializers.HyperlinkedModelSerializer):
    """VideoPointSerializer."""

    class Meta(object):
        """VideoPointSerializer Meta class."""

        model = VideoPoint
        fields = ()
