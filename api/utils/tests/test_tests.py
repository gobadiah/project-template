"""Test utils.tests."""

import sys

import pytest

from .. import clear_modules, reload


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
