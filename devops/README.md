# Devops

This component is a set of tools to ease setting up a new environment, which is a production-like set of resources, used to stage changes before deploying to production. It can also be used to spin up production, altough you would need to restore the database, and this is not handled at this time.

It also provides other commands that can be used during continuous integration runs, or for
onboarding new users.

## Commands

If you have [direnv](direnv.net), you can use the following commands anywhere inside the project.
If not you need to use relative path, e.g. `../../devops/deploy`.


* `setup`: Creates a new set of resources for a production like environment, using the following providers :
	* [Heroku](https://dashboard.heroku.com/login) for hosting the apps, the Postgres database and
providing some pluggins.

## Install

We'll need [heroku cli]().

### Macos

```
brew update && brew install heroku
```

### Linux

```
```
