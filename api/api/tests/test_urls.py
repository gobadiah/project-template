"""Test urls."""

import importlib
import sys

import mock


def fake_path(*args, **kwargs):
    """Return a fake path."""
    return 'path'


def fake_url(*args, **kwargs):
    """Return a fake url."""
    return 'url'


def fake_include(*args, **kwargs):
    """Return a fake include."""
    return 'include'


def test_urlpatterns(mocker):
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

    assert len(urlpatterns) == 3
    mocker.stopall()

    # Django admin
    urls.assert_called_once()
    path.assert_any_call('admin/', 5)
    path.assert_any_call('/', 'include')
    assert path.call_count == 2

    # Drf authentication for browsable api
    include.assert_any_call('rest_framework.urls')
    import core.urls
    include.assert_any_call(core.urls)
    url.assert_called_once_with(r'^api-auth/', 'include')

    assert urlpatterns == ['path', 'path', 'url']

    # api.settings will not be reloaded in other tests without this
    # and although django modules are unmocked after this test,
    # api.urls.urlpatterns has already a (wrong) value.
    # We delete this so that urlpatterns can be recomputed.
    del sys.modules['api.urls']
