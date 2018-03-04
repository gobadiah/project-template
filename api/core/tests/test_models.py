"""Test Core models."""

from core.models import User
import pytest


@pytest.mark.django_db
def test_user_model():
    """Test User creation and saving to db."""
    User.objects.create(
    )
