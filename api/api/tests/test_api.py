from api import urls


def test_sum():
    assert 1 + 1 == 2


def test_urls():
    assert len(urls.urlpatterns) > 0
