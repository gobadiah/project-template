"""sports factories."""

import datetime

from assets.tests.factories import AssetFactory

from core.users.tests.factories import UserFactory

from django.utils.timezone import make_aware

import factory

from ..models import Session, Video, VideoPoint


class SessionFactory(factory.django.DjangoModelFactory):
    """Default Session factory."""

    class Meta(object):
        """SessionFactory Meta class."""

        model = Session

    owner = factory.SubFactory(UserFactory)
    date = datetime.date(2018, 3, 7)
    place = 'Paris'
    duration = datetime.timedelta(hours=6)
    data = {
        'surface': 'clay',
    }


class VideoFactory(factory.django.DjangoModelFactory):
    """Default Video factory."""

    class Meta(object):
        """VideoFactory Meta class."""

        model = Video

    class Params(object):
        """VideoFactory Params class.

        user is the shared user owning the asset and the session.
        """

        user = factory.SubFactory(UserFactory)

    session = factory.LazyAttribute(lambda o: SessionFactory(owner=o.user))
    asset = factory.LazyAttribute(lambda o: AssetFactory(owner=o.user))
    start_date = make_aware(datetime.datetime(2018, 3, 7, 11, 37))
    index = 0


class VideoPointFactory(factory.django.DjangoModelFactory):
    """Default VideoPoint factory."""

    class Meta(object):
        """VideoFactory Meta class."""

        model = VideoPoint

    video = factory.SubFactory(VideoFactory)
    frame = 3017
    time = datetime.timedelta(hours=1, minutes=46, seconds=26)
