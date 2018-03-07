"""Factories for assets."""

import factory

from ..models import Asset


class AssetFactory(factory.django.DjangoModelFactory):
    """Default factory for Asset."""

    class Meta(object):
        """AssetFactory Meta class."""

        model = Asset

    url = 'https://some-url.com/path/to/asset.mp4'
    external = False
    content_type = 'video/mp4'
    meta = {
    }
