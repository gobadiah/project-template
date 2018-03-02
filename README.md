# Project template

This is a template for monorepo project with web, api, devops components, in their respective folder.

## Environment variables

Add a `.env` file at the root of this project, it will be loaded using [direnv](https://direnv.net/) with the following variables : 

* `PROJECT`: project name.

## Getting started

## Components

* `web`: This is a nextjs web app with all the good stuff. See `web/README.md`.

* `kb`: Knowledge base where we store every piece of information 

## Directory structure

* `.envrc` executed by [direnv](https://direnv.net/)

* `.circle` contains the [CircleCI](https://circleci.com/) configuration file. See knowledge base in `kb` component.
