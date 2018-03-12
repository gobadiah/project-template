"""utils module."""

import importlib
import os
import sys

import decorator


def reload(name):
    """Reload a module if has been loaded."""
    if name in sys.modules:
        importlib.reload(sys.modules[name])


def clear_modules(module_names):
    """Clear module_names from sys cache after function execution."""
    if type(module_names) == str:
        module_names = [module_names]

    def clear_module_names_decorator(func):
        def wrapper(func, *args, **kwargs):
            result = None
            try:
                result = func(*args, **kwargs)
            except:  # Noqa H201 # Bare except
                raise
            finally:
                for module_name in module_names:
                    if module_name in sys.modules:
                        del sys.modules[module_name]
            return result
        return decorator.decorator(wrapper, func)
    return clear_module_names_decorator


def restore_environment(*envs):
    """Restore given environment variables after function execution."""
    def restore_environment_decorator(func):
        def wrapper(func, *args, **kwargs):
            d = {}
            for e in envs:
                d[e] = os.environ.pop(e, None)
            result = None
            try:
                result = func(*args, **kwargs)
            except:  # Noqa H201 # Bare except
                raise
            finally:
                for e in envs:
                    if d[e]:
                        os.environ[e] = d[e]
                    elif e in os.environ:
                        del os.environ[e]
            return result
        return decorator.decorator(wrapper, func)
    return restore_environment_decorator
