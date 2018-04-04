"""users factories."""

import datetime

import factory
import factory.fuzzy

default_password = 'this-is-a-password'


class UserFactory(factory.django.DjangoModelFactory):
    """Default User factory."""

    class Meta(object):
        """UserFactory Meta class."""

        model = 'core.User'

    email = factory.Faker('email')
    password = factory.PostGenerationMethodCall(
        'set_password',
        default_password,
    )
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    birthday = datetime.date(1980, 5, 13)
    gender = factory.fuzzy.FuzzyChoice(['female', 'male'])
    ranking = factory.fuzzy.FuzzyChoice(['40', '30', '15/3', '0', '-15'])
    club = factory.Faker('city')
    dominant_hand = factory.fuzzy.FuzzyChoice(['left_handed', 'right_handed'])
