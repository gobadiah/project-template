"""Core users serializers."""

from core.models import User

from jasonpi.serializers import UserSerializer as JPIUserSerializer
from jasonpi.utils import resource_related_field

from rest_framework import serializers

from sports.models import Session
from sports.serializers import SessionSerializer

from stats.models import Stats
from stats.serializers import StatsSerializer


class UserSerializer(JPIUserSerializer):
    """User serializer."""

    sessions = resource_related_field(
        Session,
        'user',
        'sessions',
    )

    current_stats = resource_related_field(
        Stats,
        'user',
        'current_stats',
        many=False,
    )

    included_serializers = {
        'sessions': SessionSerializer,
        'current_stats': StatsSerializer,
    }

    picture = serializers.SerializerMethodField()

    def get_picture(self, obj):
        """Return the user picture url if available."""
        if obj.picture:
            return obj.picture.url
        else:
            return None

    class Meta(object):
        """UserSerializer Meta class."""

        model = User
        fields = JPIUserSerializer.Meta.fields + (
            'first_name',
            'last_name',
            'birthday',
            'current_stats',
            'gender',
            'picture',
            'dominant_hand',
            'sessions',
            'club',
            'ranking',
        )
