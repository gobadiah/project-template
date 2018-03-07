# Project template

[![CircleCI](https://circleci.com/gh/gobadiah/project-template/tree/develop.svg?style=svg)](https://circleci.com/gh/gobadiah/project-template/tree/develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/60dd931afdd54b6d6742/maintainability)](https://codeclimate.com/github/gobadiah/project-template/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/60dd931afdd54b6d6742/test_coverage)](https://codeclimate.com/github/gobadiah/project-template/test_coverage)

_Update the flags above with your project name and delete this line_

This is a template for monorepo project with web, api, devops components, in their respective folder.

## Environment variables

Add a `.env` file at the root of this project, it will be loaded using [direnv](https://direnv.net/) with the following variables : 

* `PROJECT`: project name.
* `SENTRY_DSN`: for [Sentry](https://sentry.io), used only in production-like environment.

## Getting started

## Components

* `web`: This is a nextjs web app with all the good stuff. See `web/README.md`.

* `api`: As it is well named, the api provides a RESTful api, [json:api](http://jsonapi.org/) compliant, with a [PostgreSQL](https://www.postgresql.org/) database.

* `kb`: Knowledge base where we store every piece of information 

## Directory structure

* `.envrc` executed by [direnv](https://direnv.net/)

* `.circle` contains the [CircleCI](https://circleci.com/) configuration file. See knowledge base in `kb` component.

## Services

* [Sentry](https://sentry.io) for crash reporting.
