"""users factories."""

import factory

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
