"""Core users serializers."""

from core.models import User

from jasonpi.serializers import UserSerializer as JPIUserSerializer


class UserSerializer(JPIUserSerializer):
    """User serializer."""

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
            'club',
            'ranking',
        )
