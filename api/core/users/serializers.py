"""Core users serializers."""

from core.models import User

from jasonpi.utils import resource_related_field
from jasonpi.serializers import UserSerializer as JPIUserSerializer

from sports.models import Session
from sports.serializers import SessionSerializer


class UserSerializer(JPIUserSerializer):
    """User serializer."""

    sessions = resource_related_field(
        Session,
        'user',
        'sessions',
    )

    included_serializers = {
        'sessions': SessionSerializer,
    }

    class Meta(object):
        """UserSerializer Meta class."""

        model = User
        fields = JPIUserSerializer.Meta.fields + (
            'first_name',
            'last_name',
            'birthday',
            'gender',
            'picture',
            'dominant_hand',
            'sessions',
            'club',
            'ranking',
        )
