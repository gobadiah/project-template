"""Api tasks to be run from the command line using invoke."""

from invoke import task


@task
def clean(ctx):
    """Clean api build and tests files."""
    # || true because the command find to delete fails
    ctx.run(
        'find . -name __pycache__ | xargs rm -rf && '
        'rm -rf htmlcov && rm -rf reports && rm -rf .coverage*',
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


def args():
    """Return pytest args."""
    return (
        '--flake8 '  # flake8 tests
        '--ignore="*neomake*.py" '  # Neomake temp files
        '%s ' % coverage_args()
    )


def run_test_watch(ctx):
    """Test api and watch for file changes."""
    ctx.run('ptw -- %s' % args(), pty=True)


def run_test_normal(ctx):
    """Test api without watching."""
    ctx.run('pytest %s' % args(), pty=True)


@task(clean)
def test(ctx, watch=False):
    """Tests api project, generates test and coverage reports."""
    if watch:
        run_test_watch(ctx)
    else:
        run_test_normal(ctx)
