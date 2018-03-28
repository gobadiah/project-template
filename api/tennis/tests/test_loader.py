"""Tests for loader functions."""

import datetime
import json

from core.users.tests.factories import UserFactory

import pytest

from ..loader import \
    create_session


@pytest.fixture(scope='function')
def data():
    """Return the example database_json provided for the tests."""
    with open('tennis/tests/fixtures/database_match.json') as f:
        return json.load(f)


@pytest.mark.django_db
def test_create_session(data, mocker):
    """Test create_session method."""
    mocker.patch(
        'builtins.input',
        side_effect=[
            '05/11/2017',
            'Grenoble',
            '05:23:11',
            'carpet',
        ],
    )
    user = UserFactory()
    session = create_session(user, data)
    assert session.owner == user
    assert session.surface == 'carpet'
    assert session.place == 'Grenoble'
    assert session.date == datetime.date(2017, 11, 5)
    assert session.duration == datetime.timedelta(seconds=19391)
