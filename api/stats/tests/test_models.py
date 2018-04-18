"""Tests for for stats.models."""

from core.models import User

import pytest

from .factories import StatsFactory


@pytest.mark.django_db
def test_stats_model():
    """Test that we can create and save a stats using a factory."""
    stats = StatsFactory()
    assert stats.data == {
        'some': 'stats',
    }
    assert type(stats.content_object) == User
