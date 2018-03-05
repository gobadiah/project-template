"""users factories."""

import factory
import pytest


class UserFactory(factory.django.DjangoModelFactory):
    """Default User factory."""

    email = 'jean-claude@example.com'


@pytest.mark.django_db
def test_userfactory():
    """Test that user factory is ok."""
    user = UserFactory()
    assert user.id is not None
