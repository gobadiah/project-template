"""Test core auth module provided by jasonpi."""

import json

import pytest

from ..models import User
from ..users.tests.factories import UserFactory, default_password


@pytest.mark.django_db
def test_user_registration_common_password(client):
    """Test user registration.

    This one check that you can't register with a common password.
    """
    email = 'jean-francois@dupont.fr'
    password = 'password'  # Noqa B105 # hardcoded password
    response = client.post(
        '/auth/register',
        json.dumps({
            'data': {
                'type': 'users',
                'attributes': {
                    'email': email,
                    'password': password,
                },
            },
        }),
        content_type='application/vnd.api+json',
    )
    assert response.status_code == 400  # Bad request


@pytest.mark.django_db
def test_user_registration_password_too_short(client):
    """Test user registration.

    This one check that you can't register with a password
    less than 8 characters long.
    """
    email = 'jean-francois@dupont.fr'
    password = 'eloise'  # Noqa B105 # hardcoded password
    response = client.post(
        '/auth/register',
        json.dumps({
            'data': {
                'type': 'users',
                'attributes': {
                    'email': email,
                    'password': password,
                },
            },
        }),
        content_type='application/vnd.api+json',
    )
    assert response.status_code == 400  # Bad request


@pytest.mark.django_db
def test_user_registration_password_only_numeric(client):
    """Test user registration.

    This one check that you can't register with a password
    with only numeric.
    """
    email = 'jean-francois@dupont.fr'
    password = '1252343543'  # Noqa B105 # hardcoded password
    response = client.post(
        '/auth/register',
        json.dumps({
            'data': {
                'type': 'users',
                'attributes': {
                    'email': email,
                    'password': password,
                },
            },
        }),
        content_type='application/vnd.api+json',
    )
    assert response.status_code == 400  # Bad request


@pytest.mark.django_db
def test_user_registration_password_similar_to_email(client):
    """Test user registration.

    This one check that you can't register with a password
    similar to email address.
    """
    email = 'jean-francois@dupont.fr'
    password = 'jean-francois'  # Noqa B105 # hardcoded password
    response = client.post(
        '/auth/register',
        json.dumps({
            'data': {
                'type': 'users',
                'attributes': {
                    'email': email,
                    'password': password,
                },
            },
        }),
        content_type='application/vnd.api+json',
    )
    assert response.status_code == 400  # Bad request


@pytest.mark.django_db
def test_user_registration_successful(client):
    """Test user registration.

    Verify a successful registration.
    """
    email = 'jean-francois@dupont.fr'
    password = 'some-valid-password'  # Noqa B105 # hardcoded password
    # TODO(michael)
    # Improve constraints on password, i.e. at least one digit,
    # one special characters, etc..
    response = client.post(
        '/auth/register',
        json.dumps({
            'data': {
                'type': 'users',
                'attributes': {
                    'first_name': 'Nicolas',
                    'last_name': 'Smith',
                    'birthday': '1970-01-01',
                    'email': email,
                    'password': password,
                },
            },
        }),
        content_type='application/vnd.api+json',
    )
    assert response.status_code == 201  # Created
    assert User.objects.filter(email=email).count() == 1
    user = User.objects.get(email=email)
    assert user.check_password(password)


@pytest.mark.django_db
def test_user_signin_error(client):
    """Test server response with 400 for bad credentials."""
    user = UserFactory()
    response = client.post(
        '/auth/signin',
        json.dumps({
            'email': user.email,
            'password': 'wrong-password',
        }),
        content_type='application/json',
    )
    assert response.status_code == 400


@pytest.mark.django_db
def test_user_signin_successful(client):
    """Test successful signin.

    Server should response with 200 and have an access_token sent
    via cookie and body.
    """
    user = UserFactory()
    response = client.post(
        '/auth/signin',
        json.dumps({
            'email': user.email,
            'password': default_password,
        }),
        content_type='application/json',
    )
    assert response.status_code == 200
