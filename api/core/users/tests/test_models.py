"""Test Core users models."""

import pytest

from .factories import UserFactory


@pytest.mark.django_db
def test_user_model():
    """Test User creation and saving to db."""
    UserFactory()
