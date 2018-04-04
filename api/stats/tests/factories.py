"""Factories for stats."""

from core.users.tests.factories import UserFactory

from django.contrib.contenttypes.models import ContentType
from django.utils import timezone

import factory

from ..models import Stats


class StatsFactory(factory.django.DjangoModelFactory):
    """Default Stats factory."""

    class Meta(object):
        """StatsFactory Meta class."""

        model = Stats

    data = {
        'some': 'stats',
    }
    date = factory.Faker('date_this_century', before_today=True)
    computed_at = timezone.now()
    object_id = factory.SelfAttribute('content_object.id')
    content_type = factory.LazyAttribute(
        lambda o: ContentType.objects.get_for_model(o.content_object),
    )
    content_object = factory.SubFactory(UserFactory)
