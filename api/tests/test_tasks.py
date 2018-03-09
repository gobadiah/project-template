"""Test tasks.py."""

import importlib
import types

from invoke.context import Context
from invoke.tasks import Task

from mock import MagicMock

from tasks import args, clean
from tasks import coverage_args
from tasks import run_test_normal
from tasks import run_test_watch


def test_clean():
    """Test clean task."""
    ctx = Context()
    ctx.run = MagicMock()
    assert type(clean) == Task
    clean(ctx)
    ctx.run.assert_called_once()


def test_coverage_args():
    """Test coverage_args."""
    assert coverage_args() == (
        '--cov=. '
        '--cov-report=term-missing '
        '--cov-report=html:reports/coverage '
        '--cov-report=xml:reports/coverage/coverage.xml '
        '--junitxml=reports/junit/api-tests-results.xml '
    )


def test_args():
    """Test args."""
    val = args()
    assert '--flake8' in val
    assert '--ignore="*neomake*.py"' in val
    assert coverage_args() in val


def test_watch():
    """Test test_watch."""
    ctx = Context()
    ctx.run = MagicMock()
    assert isinstance(run_test_watch, types.FunctionType)
    run_test_watch(ctx)
    ctx.run.assert_called_once()


def test_normal():
    """Test test_watch."""
    ctx = Context()
    ctx.run = MagicMock()
    assert isinstance(run_test_normal, types.FunctionType)
    run_test_normal(ctx)
    ctx.run.assert_called_once()


def run_simple_test(ctx):
    """Provide a fake implementation of a test run."""
    ctx.run('ok')


def test_test(mocker):
    """Test test task."""
    mocker.patch('tasks.run_test_normal', side_effect=run_simple_test)
    tasks = importlib.import_module('tasks')
    ctx = Context()
    ctx.run = MagicMock()
    assert type(tasks.test) == Task
    tasks.test(ctx)
    ctx.run.assert_called_once_with('ok')
    tasks.run_test_normal.assert_called_once_with(ctx)


def test_test_with_watch(mocker):
    """Test test task with --watch option."""
    mocker.patch('tasks.run_test_watch', side_effect=run_simple_test)
    tasks = importlib.import_module('tasks')
    ctx = Context()
    ctx.run = MagicMock()
    assert type(tasks.test) == Task
    tasks.test(ctx, watch=True)
    ctx.run.assert_called_once_with('ok')
    tasks.run_test_watch.assert_called_once_with(ctx)
