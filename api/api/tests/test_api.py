from .. import *  # Noqa F403 # __init__.py in test coverage
from ..urls import urlpatterns


def test_urls():
    """Test urlpatterns is not empty."""
    assert len(urlpatterns) > 0
