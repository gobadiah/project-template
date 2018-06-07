"""Tests for stats.serializers."""

import pytest

from .factories import StatsFactory
from ..models import Stats
from ..serializers import StatsSerializer


def test_stats_serializer_fields():
    """Test StatsSerializer.Meta is good."""
    assert StatsSerializer.Meta.fields == ('data', )
    assert StatsSerializer.Meta.model == Stats


@pytest.mark.django_db
def test_stats_serializer_can_serialize(rf):
    """Test StatsSerializer can serialize a simple Stats."""
    request = rf.get('/')
    request.query_params = {}
    obj = StatsFactory()
    serializer = StatsSerializer(obj, context={'request': request})
    assert serializer.data == {
        'data': obj.data,
    }
