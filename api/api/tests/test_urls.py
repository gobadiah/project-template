"""Test urls."""

import importlib
import sys

import assets.urls

import core.urls

import jasonpi

import mock

import sports.urls

import tennis.urls

from utils import clear_modules


def fake_path(*args, **kwargs):
    """Return a fake path."""
    return 'path'


def fake_include(value, namespace=None):
    """Return a fake include."""
    return value


@clear_modules('api.urls')
def test_urlpatterns(mocker):
    """Test urlpatterns contains the right stuffs."""
    urls = mocker.patch(
        'django.contrib.admin.sites.AdminSite.urls',
        new_callable=mock.PropertyMock,
    )
    urls.return_value = 5
    path = mocker.patch('django.urls.path', side_effect=fake_path)
    path.return_value = 'path'
    include = mocker.patch('django.urls.include', side_effect=fake_include)

    importlib.reload(sys.modules['api.urls'])
    from api.urls import urlpatterns

    assert len(urlpatterns) == 8
    mocker.stopall()

    assert path.call_count == 8
    assert include.call_count == 7

    # Django admin
    urls.assert_called_once()
    path.assert_any_call('admin/', 5)

    # Drf authentication for browsable api
    include.assert_any_call('rest_framework.urls')
    path.assert_any_call('api-auth/', 'rest_framework.urls')

    # Core urls
    include.assert_any_call(core.urls)
    path.assert_any_call('', core.urls)

    # Jasonpi
    include.assert_any_call(jasonpi.urls)
    path.assert_any_call('', jasonpi.urls)

    # Assets
    include.assert_any_call(assets.urls)
    path.assert_any_call('', assets.urls)

    # Sports
    include.assert_any_call(sports.urls)
    path.assert_any_call('', sports.urls)

    # Tennis
    include.assert_any_call(tennis.urls, namespace='tennis')
    path.assert_any_call('tennis/', tennis.urls)

    # Django docs
    include.assert_any_call('django.contrib.admindocs.urls')
    path.assert_any_call('admin/doc/', 'django.contrib.admindocs.urls')

    assert urlpatterns == ['path'] * 8

    # api.settings will not be reloaded in other tests without this
    # and although django modules are unmocked after this test,
    # api.urls.urlpatterns has already a (wrong) value.
    # We delete this so that urlpatterns can be recomputed for the next guy.
    del sys.modules['api.urls']
