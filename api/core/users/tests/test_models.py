"""Test Core users models."""

import pytest

from ..models import User


@pytest.mark.django_db
def test_user_model():
    """Test User creation and saving to db."""
    User.objects.create()
