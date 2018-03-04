from .. import *  # Noqa
from ..urls import urlpatterns


def test_sum():
    assert 1 + 1 == 2


def test_mult():
    assert 2 * 3 == 6


def test_urls():
    assert len(urlpatterns) > 0
