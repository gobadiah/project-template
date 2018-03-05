"""utils module."""

import importlib
import sys


def reload(name):
    """Reload a module if has been loaded."""
    if name in sys.modules:
        importlib.reload(sys.modules[name])
