"""Test utils.tests."""

import os
import sys

import pytest

from .. import clear_modules, reload, restore_environment


def test_reload_with_module_already_loaded(mocker):
    """Test reload module already loaded."""
    mock_reload = mocker.patch('importlib.reload')
    name = list(sys.modules.keys())[0]
    reload(name)
    mock_reload.assert_called_once_with(sys.modules[name])


def test_reload_with_module_not_loaded(mocker):
    """Test that nothing happened when reloading module not already loaded."""
    mock_reload = mocker.patch('importlib.reload')
    name = 'lzfjlrgjfelkgjer'
    reload(name)
    mock_reload.assert_not_called()


def test_clear_modules(monkeypatch):
    """Test clear_modules decorator."""
    module_name = list(sys.modules.keys())[-1]

    @clear_modules(module_name)
    def foo(bar):
        raise Exception('Error')

    with pytest.raises(Exception):
        foo('u')

    assert module_name not in sys.modules

    module_name = list(sys.modules.keys())[-1]

    @clear_modules([module_name])
    def bzz(arr):
        return 3

    assert bzz('r') == 3
    assert module_name not in sys.modules


def test_restore_environment():
    """Test restore_environment function."""
    e = 'azerty'
    f = 'qwerty'
    os.environ[e] = e

    @restore_environment(e, f)
    def foo():
        assert e not in os.environ
        assert f not in os.environ
        os.environ[f] = 'nice'

    foo()

    assert os.environ[e] == e
    assert f not in os.environ

    @restore_environment(e, f)
    def bar():
        os.environ[e] = 'oh-hear'
        os.environ[f] = 'nicer'
        raise Exception('ok')

    with pytest.raises(Exception):
        bar()

    assert os.environ[e] == e
    assert f not in os.environ

    del os.environ[e]
