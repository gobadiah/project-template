"""Tests for sports.serializers."""

import pytest

from .factories import \
    SessionFactory, \
    VideoFactory, \
    VideoPointFactory
from ..models import \
    Session, \
    Video, \
    VideoPoint
from ..serializers import \
    SessionSerializer, \
    VideoPointSerializer, \
    VideoSerializer


def test_session_serializer_fields():
    """Test SessionSerializer.Meta is good."""
    assert SessionSerializer.Meta.fields == []
    assert SessionSerializer.Meta.model == Session


@pytest.mark.django_db
def test_session_serializer_can_serialize(rf):
    """Test SessionSerializer can serialize a simple Session."""
    request = rf.get('/')
    request.query_params = {}
    obj = SessionFactory()
    serializer = SessionSerializer(obj, context={'request': request})
    assert serializer.data == {}


def test_video_serializer_fields():
    """Test VideoSerializer.Meta is good."""
    assert VideoSerializer.Meta.fields == []
    assert VideoSerializer.Meta.model == Video


@pytest.mark.django_db
def test_video_serializer_can_serialize(rf):
    """Test VideoSerializer can serialize a simple Video."""
    request = rf.get('/')
    request.query_params = {}
    obj = VideoFactory()
    serializer = VideoSerializer(obj, context={'request': request})
    assert serializer.data == {}


def test_videopoint_serializer_fields():
    """Test VideoPointSerializer.Meta is good."""
    assert VideoPointSerializer.Meta.fields == []
    assert VideoPointSerializer.Meta.model == VideoPoint


@pytest.mark.django_db
def test_videopoint_serializer_can_serialize(rf):
    """Test VideoPointSerializer can serialize a simple VideoPoint."""
    request = rf.get('/')
    request.query_params = {}
    obj = VideoPointFactory()
    serializer = VideoPointSerializer(obj, context={'request': request})
    assert serializer.data == {}
