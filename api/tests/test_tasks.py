"""Test tasks.py."""

from invoke.context import Context
from invoke.tasks import Task
from mock import MagicMock
from tasks import clean
from tasks import coverage_args
from tasks import run_test_normal
from tasks import run_test_watch
from tasks import test
import types


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


def test_test(mocker):
    """Test test task."""
    ctx = Context()
    ctx.run = MagicMock()
    assert type(test) == Task
    test(ctx)


def test_test_with_watch(mocker):
    """Test test task."""
    ctx = Context()
    ctx.run = MagicMock()
    assert type(test) == Task
    test(ctx, watch=True)
