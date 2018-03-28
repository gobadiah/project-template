"""Tests for sports.models."""

import datetime

from django.utils.timezone import make_aware

import pytest

from .factories import SessionFactory, VideoFactory, VideoPointFactory
from ..models import Session, Video, VideoPoint


@pytest.mark.django_db
def test_session_model():
    """Create a Session using a factory."""
    session = SessionFactory()
    assert session.owner is not None
    assert session.owner.id is not None
    assert session.date == datetime.date(2018, 3, 7)
    assert session.place == 'Paris'
    assert session.duration == datetime.timedelta(hours=6)
    assert session.data == {
        'surface': 'clay',
    }

    assert Session.objects.count() == 1


@pytest.mark.django_db
def test_video_model():
    """Create a Video using a factory."""
    video = VideoFactory()
    assert video.session is not None
    assert video.session.id is not None
    assert video.asset is not None
    assert video.asset.id is not None
    assert video.index == 0
    assert video.start_date == \
        make_aware(datetime.datetime(2018, 3, 7, 11, 37))
    assert Video.objects.count() == 1


@pytest.mark.django_db
def test_video_point_model():
    """Create a VideoPoint using a factory."""
    point = VideoPointFactory()
    assert point.video is not None
    assert point.video.id is not None
    assert point.frame == 3017
    assert point.time == datetime.timedelta(hours=1, minutes=46, seconds=26)
    assert VideoPoint.objects.count() == 1

    assert ('video', 'frame', 'time') in VideoPoint._meta.unique_together


@pytest.mark.django_db
def test_video_point_order():
    """Test that VideoPoint comparison is working."""
    video1 = VideoFactory()
    video2 = VideoFactory(index=1, user=video1.session.owner)
    vp1 = VideoPointFactory(video=video1)
    vp2 = VideoPointFactory(video=video2)
    assert not vp1 < vp1
    assert vp1 < vp2

    vp3 = VideoPointFactory(frame=4657)
    assert vp1 < vp3
