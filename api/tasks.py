"""Api tasks to be run from the command line using invoke."""

from invoke import task


@task
def clean(ctx):
    """Clean api build and tests files."""
    ctx.run(
        'find . -name __pycache__ -delete && '
        'rm -rf htmlcov && rm -rf reports',
    )


def coverage_args():
    """Return pytest coverage args."""
    return (
        '--cov=. '
        '--cov-report=term-missing '
        '--cov-report=html:reports/coverage '
        '--cov-report=xml:reports/coverage/coverage.xml '
        '--junitxml=reports/junit/api-tests-results.xml '
    )


def run_test_watch(ctx):
    """Test api and watch for file changes."""
    ctx.run('ptw -- --flake8 %s' % coverage_args(), pty=True)


def run_test_normal(ctx):
    """Test api without watching."""
    ctx.run('pytest --flake8 %s' % coverage_args(), pty=True)


@task(clean)
def test(ctx, watch=False):
    """Tests api project, generates test and coverage reports."""
    if watch:
        run_test_watch(ctx)
    else:
        run_test_normal(ctx)
