"""users factories."""

import factory


class UserFactory(factory.django.DjangoModelFactory):
    """Default User factory."""

    class Meta(object):
        """UserFactory Meta class."""

        model = 'core.User'

    email = 'jean-claude@example.com'
