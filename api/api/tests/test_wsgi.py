"""Test WSGI.py."""

import django
import imp
import os


def test_wsgi_dependencies(mocker):
    """Test the wsgi module calls the right dependencies."""
    mocker.patch('django.core.wsgi.get_wsgi_application')
    mocker.patch('os.environ.setdefault')
    imp.load_source('', 'api/wsgi.py')
    os.environ.setdefault.assert_called_once_with(
        'DJANGO_SETTINGS_MODULE',
        'api.settings',
    )
    django.core.wsgi.get_wsgi_application. \
        assert_called_once()
