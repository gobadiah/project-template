"""Test urls."""

import importlib
import mock
import sys


def fake_path(*args, **kwargs):
    """Return a fake path."""
    return 'path'


def fake_url(*args, **kwargs):
    """Return a fake url."""
    return 'url'


def fake_include(*args, **kwargs):
    """Return a fake include."""
    return 'include'


def test_urlpatterns(mocker, monkeypatch):
    """Test urlpatterns contains the right stuffs."""
    urls = mocker.patch(
        'django.contrib.admin.sites.AdminSite.urls',
        new_callable=mock.PropertyMock,
    )
    urls.return_value = 5
    path = mocker.patch('django.urls.path', side_effect=fake_path)
    path.return_value = 'path'
    url = mocker.patch('django.conf.urls.url', side_effect=fake_url)
    include = mocker.patch('django.urls.include', side_effect=fake_include)

    importlib.reload(sys.modules['api.urls'])
    from api.urls import urlpatterns

    assert len(urlpatterns) == 2

    # Django admin
    urls.assert_called_once()
    path.assert_called_once_with('admin/', 5)

    # Drf authentication for browsable api
    include.assert_called_once_with('rest_framework.urls')
    url.assert_called_once_with(r'^api-auth/', 'include')

    assert urlpatterns == ['path', 'url']
