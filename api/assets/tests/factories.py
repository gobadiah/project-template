"""Factories for assets."""

import factory

from ..models import Asset


class AssetFactory(factory.django.DjangoModelFactory):
    """Default factory for Asset."""

    class Meta(object):
        """AssetFactory Meta class."""

        model = Asset

    owner = factory.SubFactory('core.users.tests.factories.UserFactory')
    url = 'https://some-url.com/path/to/asset.mp4'
    external = False
    info = {
        'content-type': 'video/mp4',
        'content-length': 4557392,
        'e-tag': 'zlfij234jjzfzef34erlfgej',
        's3': {
            'bucket': 'some-bucket',
            'key': 'some-key',
        },
    }
