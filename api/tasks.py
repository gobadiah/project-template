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


def args(n):
    """Return pytest args."""
    return (
        '-n %d '  # Number of process
        '--flake8 '  # flake8 tests
        '--ignore="*neomake*.py" '  # Neomake temp files
        '%s ' % (n, coverage_args())
    )


def run_test_watch(ctx, n):
    """Test api and watch for file changes."""
    ctx.run('ptw -- %s' % args(n), pty=True)


def run_test_normal(ctx, n):
    """Test api without watching."""
    ctx.run('pytest %s' % args(n), pty=True)


@task(
    clean,
    help={
        'n': 'Number of process',
        'watch': 'Watch for file changes',
    },
)
def test(ctx, watch=False, n=4):
    """Tests api project, generates test and coverage reports."""
    if watch:
        run_test_watch(ctx, n)
    else:
        run_test_normal(ctx, n)
