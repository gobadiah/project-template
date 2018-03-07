"""
Django settings for api project.

Generated by 'django-admin startproject' using Django 2.0.1.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""

import os
from urllib.parse import urlparse

from corsheaders.defaults import default_headers as cors_default_headers

import dj_database_url

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = 'ENV' not in os.environ

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ['SECRET_KEY'] if not DEBUG else \
    'z9k=cw5ycxs&-^c4oal1w7ivi(=_@!4tmncx0%5#g_=8_w$z(a'


def host(url):
    """Extract host from url."""
    return urlparse(url).netloc.split(':')[0]


ALLOWED_HOSTS = [] if 'API_URL' not in os.environ else [
    host(os.environ['API_URL']),
    'api.project-template.com',
]

# Application definition

INSTALLED_APPS = [
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.admindocs',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions',
    'jasonpi',
    'core',
    'rest_framework',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'api.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

DATABASES = {
    'default': dj_database_url.config(
        default='postgres://localhost/%s_development' %
        os.environ.get('PROJECT'),
    ),
}


# Password validation
# https://docs.djangoproject.com/en/2.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.'
                'UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.'
                'MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.'
                'CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.'
                'NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/

STATIC_URL = '/static/'

########
# Custom
########
# Django
AUTH_USER_MODEL = 'core.User'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
APPEND_SLASH = False  # Play well with javascript sdk

# Jasonpi
USER_SERIALIZER = 'core.serializers.UserSerializer'

# Cors
CORS_ALLOW_HEADERS = cors_default_headers + (
    'cookies',
)

CORS_ORIGIN_ALLOW_ALL = DEBUG

CORS_ALLOW_CREDENTIALS = True

CORS_ORIGIN_WHITELIST = (
    host(os.environ['WEB_URL']),
) if 'WEB_URL' in os.environ else ()

# DRF
REST_FRAMEWORK = {
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

# DRF Json api
# http://django-rest-framework-json-api.readthedocs.io/en/stable/usage.html#configuration
JSON_API_PLURALIZE_TYPES = True
JSON_API_FORMAT_KEYS = 'dasherize'
JSON_API_FORMAT_TYPES = 'dasherize'

# i18n
LOCALE_PATHS = (
    os.path.join(BASE_DIR, 'locales'),
)
