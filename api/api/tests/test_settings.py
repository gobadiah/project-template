"""Test settings.py."""

import importlib
import os
import sys

from api import settings

import dj_database_url


def test_installed_apps():
    """Verify that required apps are installed."""
    assert 'django_extensions' in settings.INSTALLED_APPS
    assert 'jasonpi' in settings.INSTALLED_APPS
    assert 'core' in settings.INSTALLED_APPS
    assert 'rest_framework' in settings.INSTALLED_APPS


def test_dj_database_url_called(mocker):
    """Verify that dj_database_url.config is called."""
    mocker.patch('dj_database_url.config')
    importlib.reload(sys.modules['api.settings'])
    dj_database_url.config.assert_called_once_with(
        default='postgres://localhost/%s_development' %
        os.environ.get('PROJECT'),
    )
