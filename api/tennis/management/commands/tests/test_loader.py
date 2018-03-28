"""Tests for loader management command."""


def test_loader_command(mocker):
    """Test that loader command calls loader function."""
    mock_loader = mocker.patch('tennis.loader.loader')
    from ..loader import Command
    c = Command()
    c.handle()
    mock_loader.assert_called_once()
