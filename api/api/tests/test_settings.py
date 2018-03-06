"""Test settings.py."""

import os

from api import settings

from corsheaders.defaults import default_headers as cors_default_headers

import dj_database_url

import pytest

from utils import reload, restore_environment


def test_installed_apps():
    """Verify that required apps are installed."""
    assert 'django_extensions' in settings.INSTALLED_APPS
    assert 'jasonpi' in settings.INSTALLED_APPS
    assert 'core' in settings.INSTALLED_APPS
    assert 'rest_framework' in settings.INSTALLED_APPS


def test_dj_database_url_called(mocker):
    """Verify that dj_database_url.config is called."""
    mocker.patch('dj_database_url.config')
    reload('api.settings')
    dj_database_url.config.assert_called_once_with(
        default='postgres://localhost/%s_development' %
        os.environ.get('PROJECT'),
    )


def test_drf_json_api_settings():
    """Test DRF Json api configuration in settings."""
    assert settings.JSON_API_FORMAT_KEYS == 'dasherize'
    assert settings.JSON_API_FORMAT_TYPES == 'dasherize'
    assert settings.JSON_API_PLURALIZE_TYPES


@restore_environment('ENV')
def test_debug_settings_true():
    """Test DEBUG value in settings.

    Test that DEBUG is set to True if 'ENV' is not is os.environ,
    and False if not.
    """
    reload('api.settings')
    from api import settings
    assert settings.DEBUG
    os.environ['ENV'] = 'test'
    os.environ['SECRET_KEY'] = 'secret'  # Will throw without it
    reload('api.settings')
    from api import settings
    assert not settings.DEBUG


@restore_environment('ENV', 'SECRET_KEY')
def test_secret_key_settings():
    """Test SECRET_KEY is set from os.environ or default."""
    # DEBUG is True
    reload('api.settings')
    from api import settings
    assert settings.SECRET_KEY == \
        'z9k=cw5ycxs&-^c4oal1w7ivi(=_@!4tmncx0%5#g_=8_w$z(a'

    # DEBUG is False and SECRET_KEY is set
    val = 'some-secret-key'
    os.environ['SECRET_KEY'] = val
    os.environ['ENV'] = 'test'
    reload('api.settings')
    from api import settings
    assert settings.SECRET_KEY == val

    # DEBUG is False and SECRET_KEY is not set
    del os.environ['SECRET_KEY']
    with pytest.raises(KeyError):
        reload('api.settings')


@restore_environment('API_URL')
def test_allowd_hosts_settings():
    """Test ALLOWED_HOSTS based on API_URL."""
    reload('api.settings')
    from api import settings
    assert settings.ALLOWED_HOSTS == []

    val = 'some-url.com'
    os.environ['API_URL'] = 'https://%s/' % val
    reload('api.settings')
    from api import settings
    assert settings.ALLOWED_HOSTS[0] == val
    # ALLOWED HOSTS should contain the host from API_URL
    # And the official host just in case (api.my-project.com for example).
    assert len(settings.ALLOWED_HOSTS) == 2


def test_host():
    """Test host function in api.settings."""
    url = 'https://this-is-my-domain.com/'
    assert settings.host(url) == 'this-is-my-domain.com'


def test_static_root_settings():
    """Test presence and value of STATIC_ROOT settings."""
    assert settings.STATIC_ROOT == os.path.join(settings.BASE_DIR, 'static')


def test_drf_config():
    """Verify Django REST Framework settings."""
    assert settings.REST_FRAMEWORK == {
        'PAGE_SIZE': 10,
        'DEFAULT_PAGINATION_CLASS':
            'rest_framework_json_api.pagination.PageNumberPagination',
        'DEFAULT_PARSER_CLASSES': (
            'rest_framework_json_api.parsers.JSONParser',
            'rest_framework.parsers.JSONParser',
            'rest_framework.parsers.FormParser',
            'rest_framework.parsers.MultiPartParser',
        ),
        'DEFAULT_RENDERER_CLASSES': (
            'rest_framework_json_api.renderers.JSONRenderer',
            'rest_framework.renderers.JSONRenderer',
            'rest_framework.renderers.BrowsableAPIRenderer',
        ),
        'DEFAULT_METADATA_CLASS': 'rest_framework_json_api.'
                                  'metadata.JSONAPIMetadata',
        'DEFAULT_AUTHENTICATION_CLASSES': (
            'jasonpi.auth.JWTAuthentication',
        ),
        'DEFAULT_PERMISSION_CLASSES': (
            'rest_framework.permissions.IsAuthenticated',
        ),
        'EXCEPTION_HANDLER': 'jasonpi.auth.custom_exception_handler',
    }


def test_cors_settings():
    """Check cors settings."""
    assert 'corsheaders' in settings.INSTALLED_APPS
    assert 'corsheaders.middleware.CorsMiddleware' in settings.MIDDLEWARE
    assert settings.CORS_ALLOW_HEADERS == cors_default_headers + (
        'cookies',
    )
    # TODO(michael)
    # Do one test with DEBUG True and one test with DEBUG False.
    assert settings.CORS_ORIGIN_ALLOW_ALL == settings.DEBUG
    assert settings.CORS_ALLOW_CREDENTIALS
    # Same as above, this is depends on WEB_URL and should be tested for it.
    assert settings.CORS_ORIGIN_WHITELIST == ()
