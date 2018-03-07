"""Test manage.py."""

import builtins
import os
import sys
from importlib.machinery import SourceFileLoader

import django

import pytest

real_import = builtins.__import__


def test_manage(mocker):
    """Test manage.py dependencies."""
    mocker.patch('os.environ.setdefault')
    mocker.patch('django.core.management.execute_from_command_line')
    SourceFileLoader('__main__', './manage.py').load_module()
    os.environ.setdefault.assert_called_once_with(
        'DJANGO_SETTINGS_MODULE',
        'api.settings',
    )
    django.core.management.execute_from_command_line. \
        assert_called_once_with(sys.argv)


def create_fake_import(module_name):
    """Create a fake import function.

    It raises ImportErorr for a given module name.
    """
    def fake_import(name, *args, **kwargs):
        """Fake module import."""
        if name == module_name:
            raise ImportError('mocked import Error for module %s' % name)
        return real_import(name, *args, **kwargs)
    return fake_import


def test_manage_raises(mocker):
    """Test manage.py re-raises ImportError."""
    mocker.patch('os.environ.setdefault')
    mocker.patch('django.core.management.execute_from_command_line')
    builtins.__import__ = create_fake_import('django.core.management')
    with pytest.raises(ImportError) as exc_info:
        SourceFileLoader('__main__', './manage.py').load_module()
    assert "Couldn't import Django." in str(exc_info.value)
    os.environ.setdefault.assert_called_once_with(
        'DJANGO_SETTINGS_MODULE',
        'api.settings',
    )
    builtins.__import__ = real_import
    django.core.management.execute_from_command_line. \
        assert_not_called()
