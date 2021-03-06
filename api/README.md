# Api template

[![Dependencies](https://david-dm.org/gobadiah/project-template.svg?path=api)]()

This is a [Django REST Framework](http://www.django-rest-framework.org/) project.

Current python version: `3.6.4`.

## Database

This project currently relies on [PostgreSQL](https://www.postgresql.org/) version 10.3. This dependency is also writtin in `.circleci/config.yml` and `docker-compose.yml`.

## Install

First install [pyenv](https://github.com/pyenv/pyenv) or some virtualenv manager, then create a virtualenv named _project_-api and install dependencies.

For example with `pyenv`:

```
pyenv install 3.6.4
pyenv virtualenv 3.6.4 project-template-api
pyenv local project-template-api
pip install -r requirements.txt
```

## Getting started

```
python manage.py runserver
```
