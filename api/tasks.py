from invoke import task


@task
def clean(ctx):
    ctx.run(
        'find . -name __pycache__ -delete && '
        'rm -rf htmlcov && rm -rf reports'
    )


@task(clean)
def test(ctx):
    ctx.run(
        'mkdir -p reports/junit && mkdir -p reports/coverage && '
        'pytest '
        '--cov=. '
        '--cov-report=term-missing '
        '--cov-report=html:reports/coverage '
        '--cov-report=xml:reports/coverage/coverage.xml '
        '--junitxml=reports/junit/api-tests-results.xml '
        '--flake8 '
    )
