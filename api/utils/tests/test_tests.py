"""Test utils.tests."""

import sys

from .. import reload


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
